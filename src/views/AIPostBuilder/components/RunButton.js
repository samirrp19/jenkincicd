import React from 'react';
import { Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

const RunButton = () => {
  const handleRun = () => {
    console.log('Run action'); // Placeholder for actual run logic
  };

  return (
    <Button
      startIcon={<PlayArrow />}
      onClick={handleRun}
      sx={{ color: '#d4d4d4', textTransform: 'none', padding: '2px 8px' }}
    >
      Run
    </Button>
  );
};

export default RunButton;
