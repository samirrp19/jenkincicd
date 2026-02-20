import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import useAuth from 'hooks/useAuth';

const RightSidebar = () => {
  const { user } = useAuth();
  const username = user?.username || "Admin";

  return (
    <Box p={2}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#ffffff',
        }}
      >
        <Avatar src="/user-avatar.jpg" sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h6">{user?.name || "Admin User"}</Typography>
        <Typography variant="caption" color="text.secondary">
          @{username}
        </Typography>
      </Paper>
    </Box>
  );
};

export default RightSidebar;
