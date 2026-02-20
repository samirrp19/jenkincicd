import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const SummaryComponent = ({ summary }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#666" }}>
      <ReactMarkdown>{summary}</ReactMarkdown>
    </Typography>
  </Box>
);

export default SummaryComponent;
