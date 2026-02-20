import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GitHub, ErrorOutline, Notifications, Cloud, Wifi } from '@mui/icons-material';

const AIFooter = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px 15px', // Reduced padding for a slimmer footer
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        height: '28px', // Set the height to be less than the default
      }}
    >
      {/* Left Side: Git Branch and Other Details */}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body2" sx={{ color: '#d4d4d4', fontSize: '0.75rem' }}> {/* Smaller font size */}
          main*
        </Typography>
        <IconButton size="small" sx={{ color: '#d4d4d4', padding: '3px' }}>
          <GitHub fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ color: '#d4d4d4', fontSize: '0.75rem' }}>
          0
        </Typography>
        <Typography variant="body2" sx={{ color: '#d4d4d4', fontSize: '0.75rem' }}>
          Δ 0
        </Typography>
        <IconButton size="small" sx={{ color: '#d4d4d4', padding: '3px' }}>
          <ErrorOutline fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ color: '#d4d4d4', fontSize: '0.75rem' }}>
          Ln 218, Col 1
        </Typography>
      </Box>

      {/* Right Side: Notifications, Connection, Language */}
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton size="small" sx={{ color: '#d4d4d4', padding: '3px' }}>
          <Notifications fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ color: '#d4d4d4', fontSize: '0.75rem' }}>
          Spaces: 2
        </Typography>
        <Typography variant="body2" sx={{ color: '#d4d4d4', fontSize: '0.75rem' }}>
          UTF-8
        </Typography>
        <Typography variant="body2" sx={{ color: '#d4d4d4', fontSize: '0.75rem' }}>
          LF
        </Typography>
        <Typography variant="body2" sx={{ color: '#d4d4d4', fontSize: '0.75rem' }}>
          {}
        </Typography>
        <IconButton size="small" sx={{ color: '#d4d4d4', padding: '3px' }}>
          <Cloud fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#d4d4d4', padding: '3px' }}>
          <Wifi fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AIFooter;
