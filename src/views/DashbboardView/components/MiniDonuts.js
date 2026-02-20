import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const miniData = [
  { label: 'Storage Used', percent: 73.9, color: '#00C49F', value: 38566 },
  { label: 'Tokens Remaining', percent: 45.6, color: '#FFB020', value: 18472 },
];

const MiniDonuts = () => {
  return (
    <Box display="flex" gap={2} mt={3}>
      {miniData.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            bgcolor: '#ffffff',
            p: 2,
            borderRadius: '16px',
            boxShadow: 1,
            textAlign: 'center',
          }}
        >
          <Box sx={{ width: '100%', height: 120, mx: 'auto' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[{ value: item.percent }, { value: 100 - item.percent }]}
                  innerRadius="70%"
                  outerRadius="90%"
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill={item.color} />
                  <Cell fill="#e0e0e0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {item.value.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MiniDonuts;
