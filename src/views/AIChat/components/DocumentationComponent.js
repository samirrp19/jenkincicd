import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const DocumentationComponent = ({ documentation }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" sx={{ color: "#333" }}>
      <ReactMarkdown>{documentation}</ReactMarkdown>
    </Typography>
  </Box>
);

export default DocumentationComponent;
