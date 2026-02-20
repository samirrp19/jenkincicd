import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SettingsDrawer = ({ isOpen, toggleDrawer, saveSettings }) => {
  const [postType, setPostType] = useState(localStorage.getItem('postType') || 'program'); // Get from localStorage

  useEffect(() => {
    const savedPostType = localStorage.getItem('postType');
    if (savedPostType) {
      setPostType(savedPostType);
    }
  }, []);

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleSave = () => {
    saveSettings(postType); // Trigger saving and loading of the builder
    toggleDrawer(false);
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 350, padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Settings
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel>Select Post Type</InputLabel>
          <Select value={postType} onChange={handlePostTypeChange} label="Select Post Type">
            <MenuItem value="program">Program</MenuItem>
            <MenuItem value="project">Project</MenuItem>
            <MenuItem value="template">Template</MenuItem>
            <MenuItem value="challenge">Challenge</MenuItem>
            <MenuItem value="document">Document</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={() => toggleDrawer(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
