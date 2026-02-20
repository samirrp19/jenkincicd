import React from 'react';
import { IconButton } from '@mui/material';
import { Minimize, CropSquare, Close } from '@mui/icons-material';

const WindowControls = () => {
  const handleMinimize = () => {
    console.log('Minimize window');
  };

  const handleMaximize = () => {
    console.log('Maximize window');
  };

  const handleClose = () => {
    console.log('Close window');
  };

  return (
    <>
      <IconButton size="small" sx={{ color: '#d4d4d4' }} onClick={handleMinimize}>
        <Minimize fontSize="small" />
      </IconButton>
      <IconButton size="small" sx={{ color: '#d4d4d4' }} onClick={handleMaximize}>
        <CropSquare fontSize="small" />
      </IconButton>
      <IconButton size="small" sx={{ color: '#d4d4d4' }} onClick={handleClose}>
        <Close fontSize="small" />
      </IconButton>
    </>
  );
};

export default WindowControls;
