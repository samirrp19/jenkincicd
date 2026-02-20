import React from 'react';
import { Box, Select, MenuItem, IconButton } from '@mui/material';
import { Download, Undo, Save, Settings, Fullscreen } from '@mui/icons-material';

const supportedLanguages = [
  { value: 'bash', label: 'Bash' },
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

const EditorHeader = ({ language, onLanguageChange, sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        borderBottom: '1px solid #ddd',
        ...sx,
      }}
    >
      {/* Language Selection Dropdown */}
      <Select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ minWidth: 140 }}
      >
        {supportedLanguages.map((lang) => (
          <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
        ))}
      </Select>

      {/* Editor Toolbar Icons */}
      <Box>
        <IconButton aria-label="Download code">
          <Download />
        </IconButton>
        <IconButton aria-label="Undo last action">
          <Undo />
        </IconButton>
        <IconButton aria-label="Save code">
          <Save />
        </IconButton>
        <IconButton aria-label="Editor settings">
          <Settings />
        </IconButton>
        <IconButton aria-label="Fullscreen mode">
          <Fullscreen />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EditorHeader;
