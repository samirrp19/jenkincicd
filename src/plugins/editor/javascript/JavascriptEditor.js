import React from 'react';
import Editor from '@monaco-editor/react';
import { Box, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code'; // Icon for JavaScript

const editorOptions = {
  theme: 'vs-dark',
  minimap: { enabled: false },
  automaticLayout: true,
  fontSize: 14,
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  tabSize: 2,
  renderLineHighlight: 'all',
  suggestOnTriggerCharacters: true,
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true,
  },
  parameterHints: {
    enabled: true,
  },
  formatOnType: true,
};

const editorStyle = {
  zIndex: 2,
  overflow: 'hidden',
  flex: 1,
};

const JavascriptEditor = ({ value, onChange, editorHeight }) => {
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
          <CodeIcon sx={{ marginRight: 1 }} />
          <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
            JavaScript
          </Typography>
        </Box>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </Box>

      <div style={editorStyle}>
        <Editor
          height="100%" // Match the flex height of the editor container
          language="javascript"
          value={value}
          onChange={(newValue) => {
            console.log('Javascript Editor Updated:', newValue);  // Add this log
            onChange(newValue);
          }}
          options={editorOptions}
        />
      </div>
    </Box>
  );
};

export default JavascriptEditor;
