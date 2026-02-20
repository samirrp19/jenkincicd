import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import MessengerPageViewHeader from './components/MessengerPageViewHeader';
import SidebarComponent from './components/SidebarComponent';
import ChatMainContent from './components/ChatMainContent';
import ChatInputBox from './components/ChatInputBox';
import MessengerRightSidebar from './components/MessengerRightSidebar';
import CallScreen from './components/CallScreen';
import IncomingCallModal from './components/IncomingCallModal';
import useAuth from 'hooks/useAuth';
import useChatSocket from './hooks/useChatSocket';
import useKinesisWebRTC from './hooks/useKinesisWebRTC';
import { toast } from 'react-toastify';

const MessengerPageView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [callState, setCallState] = useState({ active: false, type: null });
  const [cameraOn, setCameraOn] = useState(true);
  const [isCaller, setIsCaller] = useState(false);

  const ringtoneRef = useRef(null);
  const myVideoRef = useRef(null);
  const userVideoRef = useRef(null);

  const { token, user } = useAuth();
  const username = user?.username || '';
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const {
    chatMessages,
    sendMessage,
    socketRef,
    incomingCallPayload,
    setIncomingCallPayload,
  } = useChatSocket(token, username);

  const selectedUserKey = selectedUser?.username || null;
  const messages = selectedUserKey ? chatMessages[selectedUserKey] || [] : [];

  const channelName = 'lt-codex-webrtc';
  const isMaster = isCaller;

  const awsCredentials = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    sessionToken: process.env.REACT_APP_AWS_SESSION_TOKEN,
  };

  // Only establish WebRTC connection during an active call
  useKinesisWebRTC({
    role: callState.active ? (isMaster ? 'MASTER' : 'VIEWER') : null,
    channelName,
    credentials: callState.active ? awsCredentials : null,
    localVideoRef: myVideoRef,
    remoteVideoRef: userVideoRef,
  });

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleInitiateCall = (user, type) => {
    setSelectedUser(user);
    setIsCaller(true);
    setCallState({ active: true, type });

    socketRef.current.emit('callUser', {
      to: user.username,
      from: username,
      callType: type,
      avatar: user.avatar,
    });
  };

  const handleEndCall = () => {
    if (socketRef?.current && selectedUser?.username) {
      socketRef.current.emit('endCall', { to: selectedUser.username });
    }
    setCallState({ active: false, type: null });
    setIsCaller(false);
  };

  useEffect(() => {
    if (!username) setSelectedUser(null);
  }, [username]);

  useEffect(() => {
    const socket = socketRef?.current;
    if (!socket) return;

    const handleCallEnded = () => {
      setCallState({ active: false, type: null });
      setIncomingCallPayload(null);
      setIsCaller(false);
      ringtoneRef.current?.pause();
      ringtoneRef.current = null;
      toast.info('📴 Call ended');
    };

    socket.on('callEnded', handleCallEnded);

    return () => {
      socket.off('callEnded', handleCallEnded);
    };
  }, [socketRef]);

  useEffect(() => {
    if (incomingCallPayload && !callState.active && !isCaller) {
      const audio = document.createElement('audio');
      audio.src = '/assets/ringtone.mp3';
      audio.loop = true;
      audio.play().catch(() => toast.warning('🔕 Ringtone blocked — enable audio.'));
      ringtoneRef.current = audio;
    }
  }, [incomingCallPayload]);

  const acceptCall = () => {
    if (!incomingCallPayload || !socketRef?.current) return;
    setSelectedUser({
      username: incomingCallPayload.from,
      avatar: incomingCallPayload.avatar,
    });
    setIsCaller(false);
    setCallState({ active: true, type: incomingCallPayload.callType });
    setIncomingCallPayload(null);
    ringtoneRef.current?.pause();
    ringtoneRef.current = null;
  };

  const declineCall = () => {
    if (!incomingCallPayload || !socketRef?.current) return;
    socketRef.current.emit('endCall', { to: incomingCallPayload.from });
    setIncomingCallPayload(null);
    ringtoneRef.current?.pause();
    ringtoneRef.current = null;
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MessengerPageViewHeader isSidebarOpen={isSidebarOpen} />

      <IncomingCallModal
        open={!!incomingCallPayload && !callState.active}
        caller={incomingCallPayload}
        onAccept={acceptCall}
        onDecline={declineCall}
      />

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: isSidebarOpen ? '320px' : '80px',
            minWidth: isSidebarOpen ? '320px' : '80px',
            transition: 'width 0.3s ease',
            backgroundColor: '#f4f4f4',
            borderRight: '1px solid #ddd',
            overflow: 'hidden',
            height: 'calc(100vh - 64px)',
          }}
        >
          <SidebarComponent
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            user={user}
            username={username}
            token={token}
            setSelectedUser={setSelectedUser}
            onInitiateCall={handleInitiateCall}
          />
        </Box>

        {/* Main Chat/Call Area */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: '#fafafa',
            height: 'calc(100vh - 64px)',
          }}
        >
          {selectedUser ? (
            callState.active ? (
              <CallScreen
                selectedUser={selectedUser}
                callType={callState.type}
                onEndCall={handleEndCall}
                cameraOn={cameraOn}
                setCameraOn={setCameraOn}
                myVideoRef={myVideoRef}
                userVideoRef={userVideoRef}
              />
            ) : (
              <>
                <ChatMainContent
                  selectedUser={selectedUser}
                  currentUser={username}
                  messages={messages}
                />
                <ChatInputBox
                  selectedUser={selectedUser}
                  sendMessage={sendMessage}
                />
              </>
            )
          ) : (
            <Box sx={{ p: 4, textAlign: 'center', flex: 1 }}>
              <Typography variant="h6" color="textSecondary">
                Select a user to start chatting or calling.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Right Sidebar */}
        {!isSmallScreen && (
          <Box
            sx={{
              width: '320px',
              backgroundColor: '#fafafa',
              padding: '16px',
              borderLeft: '1px solid #ddd',
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
            }}
          >
            <MessengerRightSidebar selectedUser={selectedUser} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MessengerPageView;
