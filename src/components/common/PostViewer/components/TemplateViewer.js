import React from 'react';
import { Box } from '@mui/material';

const TemplateViewer = ({ templateUrl }) => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <iframe
        src={templateUrl}
        title="Template Viewer"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </Box>
  );
};

export default TemplateViewer;
