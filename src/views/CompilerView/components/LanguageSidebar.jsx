import React from 'react';
import {
  Box, Typography, TextField, Button, FormControl,
  InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LanguageSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  sidebarContent,
  loading,
  aiPrompt,
  setAiPrompt,
  onSubmitPrompt,
  programTitle,
  setProgramTitle,
  programDescription,
  setProgramDescription,
  tags,
  setTags,
  visibility,
  setVisibility,
  onSave
}) => {
  const renderContent = () => {
    switch (sidebarContent) {
      case 'ai-tutor':
        return (
          <Box>
            <Typography variant="h6">AI Tutor</Typography>
            <TextField
              fullWidth
              placeholder="Enter prompt"
              multiline
              rows={3}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={onSubmitPrompt}
              disabled={loading}
            >
              {loading ? "Generating..." : "Submit"}
            </Button>
          </Box>
        );

      case 'save':
        return (
          <Box>
            <Typography variant="h6">Save Program</Typography>
            <TextField
              fullWidth
              label="Program Title"
              value={programTitle}
              onChange={(e) => setProgramTitle(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={programDescription}
              onChange={(e) => setProgramDescription(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value.split(','))}
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Visibility</InputLabel>
              <Select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="public">Public</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={onSave}
            >
              Save Program
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{
      width: isSidebarOpen ? '300px' : '0px',
      position: 'fixed',
      right: 0,
      top: 0,
      height: '100%',
      backgroundColor: '#fff',
      boxShadow: 3,
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      zIndex: 1300
    }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Sidebar</Typography>
        <IconButton onClick={() => setIsSidebarOpen(false)}><CloseIcon /></IconButton>
      </Box>
      <Box sx={{ p: 2 }}>{renderContent()}</Box>
    </Box>
  );
};

export default LanguageSidebar;
