import React from 'react';
import { Box, Typography } from '@mui/material';

const LogoComponent = ({ isSidebarOpen }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/icon.svg" // Replace with your logo source
        alt="Logo"
        style={{ width: isSidebarOpen ? '40px' : '30px', height: isSidebarOpen ? '40px' : '30px' }}
      />
      {isSidebarOpen && (
        <Typography variant="h6" sx={{ marginLeft: '8px' }}>
          Learntute
        </Typography>
      )}
    </Box>
  );
};

export default LogoComponent;
