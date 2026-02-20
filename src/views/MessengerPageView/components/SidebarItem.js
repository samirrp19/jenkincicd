import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';

const SidebarItem = ({ icon, label, isSidebarOpen, onClick }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }} onClick={onClick}>
      <IconButton>{icon}</IconButton>
      {isSidebarOpen && <Typography sx={{ marginLeft: '8px' }}>{label}</Typography>}
    </Box>
  );
};

export default SidebarItem;
