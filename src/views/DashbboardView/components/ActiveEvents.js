import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const events = [
  { label: 'Pending', value: 9910, color: '#FFC107' },
  { label: 'Canceled', value: 1950, color: '#F44336' },
  { label: 'Sold', value: 9120, color: '#4CAF50' },
];

const ActiveEvents = () => {
  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        borderRadius: '16px',
        p: 3,
        height: '100%',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Active Events
      </Typography>

      {events.map((event, index) => (
        <Box key={index} mb={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle2">{event.label.toUpperCase()}</Typography>
            <Typography variant="subtitle2">{(event.value / 1000).toFixed(1)}k</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={event.label === 'Pending' ? 35 : event.label === 'Canceled' ? 15 : 90}
            sx={{
              height: 8,
              borderRadius: 5,
              mt: 1,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: event.color,
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ActiveEvents;
