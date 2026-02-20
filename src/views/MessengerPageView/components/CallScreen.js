import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';

const CallScreen = ({
  selectedUser,
  callType,
  onEndCall,
  muted = false,
  setMuted = () => {},
  cameraOn = true,
  setCameraOn = () => {},
  onShareScreen = () => {},
  myVideoRef,
  userVideoRef,
}) => {
  const isVideoCall = callType === 'video';
  console.log("myVideoRef: ", myVideoRef)
  console.log("userVideoRef: ", userVideoRef)

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#1a1a1a',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {isVideoCall ? '🎥 Video Call' : '🔊 Audio Call'} with {selectedUser?.username}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <video
          ref={myVideoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '280px',
            height: '210px',
            backgroundColor: '#000',
            border: '2px solid #555',
            borderRadius: 8,
          }}
        />
        <video
          ref={userVideoRef}
          autoPlay
          playsInline
          style={{
            width: '280px',
            height: '210px',
            backgroundColor: '#000',
            border: '2px solid #555',
            borderRadius: 8,
          }}
        />
      </Box>

      <audio id="ringtone" loop>
        <source src="/assets/ringtone.mp3" type="audio/mpeg" />
      </audio>

      <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
        <Tooltip title={muted ? 'Unmute' : 'Mute'}>
          <IconButton onClick={() => setMuted(prev => !prev)} sx={{ color: 'white' }}>
            {muted ? <MicOffIcon /> : <MicIcon />}
          </IconButton>
        </Tooltip>

        {isVideoCall && (
          <Tooltip title={cameraOn ? 'Turn Off Camera' : 'Turn On Camera'}>
            <IconButton onClick={() => setCameraOn(prev => !prev)} sx={{ color: 'white' }}>
              {cameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Share Screen">
          <IconButton onClick={onShareScreen} sx={{ color: 'white' }}>
            <ScreenShareIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="End Call">
          <IconButton onClick={onEndCall} sx={{ color: 'red' }}>
            <CallEndIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CallScreen;
