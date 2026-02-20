// components/Language/LanguageIOPanel.jsx
import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

const LanguageIOPanel = ({ standardInput, setStandardInput, output = {} }) => {
    const { stdout = '', stderr = '', error = '' } = output;
  
    return (
      <Box sx={{ px: 3, pb: 3, flex: 1, overflow: 'auto' }}>
        <Typography variant="h6">Standard Inputs</Typography>
        <TextField
          fullWidth
          multiline
          rows={5}
          value={standardInput}
          onChange={(e) => setStandardInput(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Typography variant="h6">Output</Typography>
        <Box sx={{ backgroundColor: '#e0e0e0', p: 2, borderRadius: 1 }}>
          {error ? (
            <Typography color="error" component="pre">{error}</Typography>
          ) : (
            <>
              <Typography component="pre">{stdout}</Typography>
              <Typography color="error" component="pre">{stderr}</Typography>
            </>
          )}
        </Box>
      </Box>
    );
  };
  
  export default LanguageIOPanel;
  
