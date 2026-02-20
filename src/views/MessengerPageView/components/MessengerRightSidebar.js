import React from 'react';
import { Box, Avatar, Typography, Divider, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import SearchIcon from '@mui/icons-material/Search';

const MessengerRightSidebar = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <Box
        sx={{
          width: '320px',
          marginTop: '12px',
          height: 'calc(100vh - 64px - 12px)',
          borderLeft: '1px solid #ddd',
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontStyle: 'italic',
          color: '#888',
        }}
      >
        Select a user to view profile
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '320px',
        backgroundColor: '#fafafa',
        padding: '16px',
        borderLeft: '1px solid #ddd',
        marginTop: '12px',
        height: 'calc(100vh - 64px - 12px)',
        overflowY: 'auto',
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={selectedUser.profilePic || `https://via.placeholder.com/100?text=${selectedUser.username?.[0]}`}
          sx={{ width: 80, height: 80, mb: 1 }}
        />
        <Typography variant="h6" align="center">
          {selectedUser.name || selectedUser.username}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
        <IconButton><PersonIcon /></IconButton>
        <IconButton><NotificationsOffIcon /></IconButton>
        <IconButton><SearchIcon /></IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Media, files and links
      </Typography>
      <Divider sx={{ my: 1 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Privacy & support
      </Typography>
      <Divider sx={{ my: 1 }} />
    </Box>
  );
};

export default MessengerRightSidebar;
