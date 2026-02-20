import { useEffect, useRef } from 'react';
import AWS from 'aws-sdk';
import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';

const useKinesisWebRTC = ({
  role = 'VIEWER', // 'MASTER' or 'VIEWER'
  channelName,
  region = 'ap-south-1',
  credentials,
  onRemoteStream,
  localVideoRef,
  remoteVideoRef,
}) => {
  const signalingClientRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    if (!credentials || !channelName) return;

    const setupConnection = async () => {
      try {
        const awsCredentials = new AWS.Credentials(credentials);
        const channelARN = process.env.REACT_APP_KVS_CHANNEL_ARN;

        const kinesisVideoClient = new AWS.KinesisVideo({
          region,
          credentials: awsCredentials,
        });

        const { ResourceEndpointList } = await kinesisVideoClient
          .getSignalingChannelEndpoint({
            ChannelARN: channelARN,
            SingleMasterChannelEndpointConfiguration: {
              Protocols: ['WSS', 'HTTPS'],
              Role: role,
            },
          })
          .promise();

        const endpoints = Object.fromEntries(
          ResourceEndpointList.map((e) => [e.Protocol, e.ResourceEndpoint])
        );

        const signalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
          region,
          endpoint: endpoints.HTTPS,
          credentials: awsCredentials,
        });

        const iceServers = await signalingChannelsClient
          .getIceServerConfig({ ChannelARN: channelARN })
          .promise()
          .then((res) =>
            res.IceServerList.map((s) => ({
              urls: s.Uris,
              username: s.Username,
              credential: s.Password,
            }))
          );

        const peerConnection = new RTCPeerConnection({ iceServers });
        peerConnectionRef.current = peerConnection;

        // 📶 Handle remote stream
        peerConnection.ontrack = (event) => {
          const [remoteStream] = event.streams;
          console.log("🔥 Received remote track", event.track);
          console.log("📡 Received remote track(s):", event.streams);
          if (remoteVideoRef?.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
          if (onRemoteStream) onRemoteStream(remoteStream);
        };

        // 🔄 ICE candidate
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            signalingClientRef.current?.sendIceCandidate(event.candidate);
          }
        };

        const signalingClient = new SignalingClient({
          channelARN,
          channelEndpoint: endpoints.WSS,
          role,
          region,
          credentials: awsCredentials,
          systemClockOffset: kinesisVideoClient.config.systemClockOffset,
          ...(role === 'VIEWER' && { clientId: 'viewer-' + Math.random().toString(36).substring(2, 10) }),
        });

        signalingClientRef.current = signalingClient;

        signalingClient.on('sdpOffer', async (offer) => {
          await peerConnection.setRemoteDescription(offer);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          signalingClient.sendSdpAnswer(answer);
        });

        signalingClient.on('sdpAnswer', async (answer) => {
          await peerConnection.setRemoteDescription(answer);
        });

        signalingClient.on('iceCandidate', (candidate) => {
          peerConnection.addIceCandidate(candidate)
          .catch(err => console.warn("⚠️ Failed to add ICE candidate:", err));
        });

        signalingClient.on('open', async () => {
          // ✅ Get local stream once signaling is open
          const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
        
          if (localVideoRef?.current) {
            localVideoRef.current.srcObject = localStream;
          }
        
          localStreamRef.current = localStream;

          console.log("🎥 Adding local tracks to peer connection:", localStream.getTracks());
        
          localStream.getTracks().forEach((track) =>
            peerConnection.addTrack(track, localStream)
          );
        
          // Only MASTER sends offer
          if (role === 'MASTER') {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            signalingClient.sendSdpOffer(offer);
          }
        });

        signalingClient.open();
      } catch (error) {
        console.error('❌ Kinesis WebRTC Setup Error:', error);
      }
    };

    setupConnection();

    return () => {
      try {
        signalingClientRef.current?.close();
        peerConnectionRef.current?.getSenders()?.forEach(sender => {
          sender.track?.stop();
        });
        peerConnectionRef.current?.close();
        localStreamRef.current?.getTracks().forEach(track => track.stop());
      } catch (e) {
        console.warn('⚠️ Cleanup error:', e);
      }

      signalingClientRef.current = null;
      peerConnectionRef.current = null;
      localStreamRef.current = null;
    };
  }, [credentials, channelName, role]);

  setTimeout(() => {
    console.log("🎥 remoteVideoRef.srcObject", remoteVideoRef.current?.srcObject);
  }, 5000);

  return {
    endCall: () => {
      signalingClientRef.current?.close();
      peerConnectionRef.current?.close();
    },
  };
};

export default useKinesisWebRTC;
