import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', usage: 400 },
  { name: 'Feb', usage: 300 },
  { name: 'Mar', usage: 500 },
  { name: 'Apr', usage: 600 },
];

const TokenUsageChart = () => {
  return (
    <Box
      sx={{
        bgcolor: '#003A2B',
        borderRadius: '16px',
        p: 3,
        color: '#fff',
        height: '100%',
        position: 'relative',
      }}
    >
      <Typography variant="subtitle2" mb={1}>
        Total tokens used
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        18,765
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.7 }}>
        +2.6% last month
      </Typography>

      {/* Line Chart */}
      <Box sx={{ width: '100%', height: 100, mt: 3 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line type="monotone" dataKey="usage" stroke="#00C49F" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default TokenUsageChart;
