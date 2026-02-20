import React from 'react';
import Editor from '@monaco-editor/react';
import { Box, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language'; // Icon for HTML

const editorOptions = {
  theme: 'vs-dark',
  minimap: { enabled: false },
  automaticLayout: true,
  fontSize: 14,
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  tabSize: 2,
  renderLineHighlight: 'all',
};

const editorStyle = {
  zIndex: 2,
  overflow: 'hidden',
  flex: 1,
};

const HtmlEditor = ({ value, onChange, editorHeight }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ddd',
        borderRadius: '4px',
        overflow: 'hidden',
        height: editorHeight,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px',
          backgroundColor: '#1E1E1E',
          color: '#fff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LanguageIcon sx={{ marginRight: 1 }} />
          <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
            HTML
          </Typography>
        </Box>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </Box>

      <div style={editorStyle}>
        <Editor
          height="100%" // Match the flex height of the editor container
          language="html"
          value={value}
          onChange={(newValue) => {
            console.log('HTML Editor Updated:', newValue);  // Add this log
            onChange(newValue);
          }}
          options={editorOptions}
        />
      </div>
    </Box>
  );
};

export default HtmlEditor;
