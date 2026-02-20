import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import MessengerPageViewHeader from './components/MessengerPageViewHeader';
import SidebarComponent from './components/SidebarComponent';
import ChatMainContent from './components/ChatMainContent';
import ChatInputBox from './components/ChatInputBox';
import MessengerRightSidebar from './components/MessengerRightSidebar';
import WebRTCController from './hooks/WebRTCController';
import CallScreen from './components/CallScreen';
import IncomingCallModal from './components/IncomingCallModal';
import useAuth from 'hooks/useAuth';
import useChatSocket from './hooks/useChatSocket';
import { toast } from 'react-toastify';

const MessengerPageView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [callState, setCallState] = useState({ active: false, type: null });
  const [incomingCall, setIncomingCall] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [isCaller, setIsCaller] = useState(false);

  const ringtoneRef = useRef(null);
  const myVideoRef = useRef(null);
  const userVideoRef = useRef(null);

  const { token, user } = useAuth();
  const username = user?.username || '';
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const { chatMessages, sendMessage, socketRef } = useChatSocket(token, username);
  const selectedUserKey = selectedUser?.username || null;
  const messages = selectedUserKey ? chatMessages[selectedUserKey] || [] : [];

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleInitiateCall = (user, type) => {
    setSelectedUser(user);
    setCallState({ active: true, type });
    setIsCaller(true);
  };

  const handleEndCall = () => {
    if (socketRef?.current && selectedUser?.username) {
      socketRef.current.emit('endCall', { to: selectedUser.username });
    }
    setCallState({ active: false, type: null });
    setIsCaller(false);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => stream.getTracks().forEach(track => track.stop()))
      .catch(() => {
        toast.warn('🎤 Please allow microphone and camera access.');
      });
  }, []);

  useEffect(() => {
    if (!username) setSelectedUser(null);
  }, [username]);

  useEffect(() => {
    const socket = socketRef?.current;
    if (!socket) return;

    const handleIncomingCall = ({ from, signalData, callType, avatar }) => {
      if (isCaller) return; // Prevent loop on caller
      setIncomingCall({ from, signalData, callType, avatar });

      const audio = document.createElement('audio');
      audio.src = '/assets/ringtone.mp3';
      audio.loop = true;
      audio.play().catch(() => {
        toast.warning('🔕 Ringtone blocked — enable audio.');
      });
      ringtoneRef.current = audio;
    };

    const handleCallEnded = () => {
      setCallState({ active: false, type: null });
      setIncomingCall(null);
      setIsCaller(false);
      ringtoneRef.current?.pause();
      ringtoneRef.current = null;
      toast.info("📴 Call ended");
    };

    socket.on('incomingCall', handleIncomingCall);
    socket.on('callEnded', handleCallEnded);

    return () => {
      socket.off('incomingCall', handleIncomingCall);
      socket.off('callEnded', handleCallEnded);
    };
  }, [socketRef, isCaller]);

  const acceptCall = () => {
    if (!incomingCall || !socketRef?.current) return;

    // Don’t emit here. Let WebRTCController handle it.
    setSelectedUser({ username: incomingCall.from, avatar: incomingCall.avatar });
    setCallState({ active: true, type: incomingCall.callType });
    setIsCaller(false);
    setIncomingCall(null);

    ringtoneRef.current?.pause();
    ringtoneRef.current = null;
  };

  const declineCall = () => {
    if (!incomingCall || !socketRef?.current) return;

    socketRef.current.emit('endCall', { to: incomingCall.from });
    setIncomingCall(null);
    ringtoneRef.current?.pause();
    ringtoneRef.current = null;
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f2f5' }}>
      <MessengerPageViewHeader isSidebarOpen={isSidebarOpen} />

      <IncomingCallModal
        open={!!incomingCall && !callState.active}
        caller={incomingCall}
        onAccept={acceptCall}
        onDecline={declineCall}
      />

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: isSidebarOpen ? '240px' : '72px',
            transition: 'width 0.3s ease',
            backgroundColor: '#fff',
            borderRight: '1px solid #ddd',
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
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

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: '#fafafa',
            position: 'relative',
          }}
        >
          {selectedUser ? (
            callState.active ? (
              <>
                <CallScreen
                  selectedUser={selectedUser}
                  callType={callState.type}
                  onEndCall={handleEndCall}
                  cameraOn={cameraOn}
                  setCameraOn={setCameraOn}
                  myVideoRef={myVideoRef}
                  userVideoRef={userVideoRef}
                />
                <WebRTCController
                  socket={socketRef.current}
                  currentUser={username}
                  selectedUser={selectedUser}
                  callType={callState.type}
                  isCaller={isCaller}
                  onEndCall={handleEndCall}
                  myVideoRef={myVideoRef}
                  userVideoRef={userVideoRef}
                />
              </>
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
