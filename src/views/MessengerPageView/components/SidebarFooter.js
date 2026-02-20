import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SidebarFooter = ({ isSidebarOpen, user }) => {
  return (
    <Box sx={{ padding: '8px', borderTop: '1px solid #e0e0e0' }}>
      {/* Settings */}
      {/* <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <SettingsIcon fontSize="small" />
        {isSidebarOpen && <Typography sx={{ marginLeft: '8px' }}>Settings</Typography>}
      </Box> */}

      {/* Avatar and User Name in one row */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={user.name} src={user.avatar} sx={{ width: 24, height: 24 }} />
        {isSidebarOpen && <Typography sx={{ marginLeft: '8px' }}>{user.name}</Typography>}
      </Box>
    </Box>
  );
};

export default SidebarFooter;
