import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'React', value: 40 },
  { name: 'NodeJS', value: 30 },
  { name: 'Python', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = () => {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Projects by Languages
      </Typography>
      <ResponsiveContainer width="50%" height={300}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={100} label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartComponent;
