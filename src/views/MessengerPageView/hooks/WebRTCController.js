import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer/simplepeer.min.js';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';

const WebRTCController = ({
  socket,
  currentUser,
  selectedUser,
  callType,
  isCaller,
  onEndCall,
  myVideoRef,
  userVideoRef,
}) => {
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);

  const peerRef = useRef(null);
  const signalHandled = useRef(false);

  useEffect(() => {
    if (!socket || !selectedUser || !callType) return;

    navigator.mediaDevices.getUserMedia({
      video: callType === 'video',
      audio: true,
    }).then((mediaStream) => {
      setStream(mediaStream);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = mediaStream;
      }

      const peer = new Peer({
        initiator: isCaller,
        trickle: false,
        stream: mediaStream,
      });

      peer.on('signal', (signalData) => {
        const payload = {
          to: selectedUser.username,
          from: currentUser,
          signalData,
          callType,
        };
        socket.emit(isCaller ? 'callUser' : 'answerCall', payload);
      });

      peer.on('stream', (remoteStream) => {
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = remoteStream;
        }
        setCallAccepted(true);
      });

      peer.on('error', (err) => {
        console.warn('Peer error:', err);
        toast.error('⚠️ Call connection failed.');
        cleanupCall();
      });

      peer.on('close', () => {
        cleanupCall();
      });

      peerRef.current = peer;

      if (isCaller) {
        socket.on('callAnswered', ({ signalData }) => {
          if (!signalHandled.current) {
            try {
              peer.signal(signalData);
              signalHandled.current = true;
            } catch (err) {
              console.warn('Signal error (caller):', err);
            }
          }
        });
      }

      socket.on('callEnded', () => {
        toast.info('📴 Call ended');
        cleanupCall();
      });

    }).catch(() => {
      toast.error('🎤 Please allow microphone/camera access.');
      onEndCall();
    });

    return () => {
      peerRef.current?.destroy();
      peerRef.current = null;
      signalHandled.current = false;
      socket.off('callAnswered');
      socket.off('callEnded');
    };
  }, [socket, selectedUser, callType, isCaller]);

  const cleanupCall = () => {
    peerRef.current?.destroy();
    stream?.getTracks().forEach(track => track.stop());
    setCallAccepted(false);
    onEndCall();
  };

  return (
    <>
      {!callAccepted && isCaller && (
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            padding: '10px 20px',
            borderRadius: '12px',
            boxShadow: 3,
            zIndex: 99,
          }}
        >
          <Typography variant="body2">📞 Calling {selectedUser?.username}...</Typography>
        </Box>
      )}
    </>
  );
};

export default WebRTCController;
