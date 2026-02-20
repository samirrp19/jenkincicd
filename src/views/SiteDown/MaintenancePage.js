// src/pages/MaintenancePage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const MaintenancePage = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      textAlign="center"
      padding={4}
    >
      <Typography variant="h2" gutterBottom>
        We'll be back soon!
      </Typography>
      <Typography variant="h5">
        Our website is currently undergoing scheduled maintenance.<br/>
        Thank you for your patience. Coming Soon!
      </Typography>
    </Box>
  );
};

export default MaintenancePage;
