import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import CreatePrompt from './AIPrompt/CreatePrompt';
import PromptsDrawer from './AIPrompt/PromptsDrawer';
import SettingsDrawer from './AIPrompt/SettingsDrawer';

const AIDropdown = ({ onPostTypeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [promptsDrawerOpen, setPromptsDrawerOpen] = useState(false);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

  // Sample list of prompts (this would usually come from the backend)
  const prompts = [
    { title: 'Prompt 1', context: 'Context 1', subcontext: 'Subcontext 1' },
    { title: 'Prompt 2', context: 'Context 2', subcontext: 'Subcontext 2' },
    { title: 'Prompt 3', context: 'Context 3', subcontext: 'Subcontext 3' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (isOpen) => {
    setDrawerOpen(isOpen);
    handleMenuClose(); // Close the menu after selecting "Create"
  };

  const togglePromptsDrawer = (isOpen) => {
    setPromptsDrawerOpen(isOpen);
    handleMenuClose(); // Close the menu after selecting "Prompts"
  };

  const toggleSettingsDrawer = (isOpen) => {
    setSettingsDrawerOpen(isOpen);
    handleMenuClose();
  };

  const saveSettings = (postType) => {
    // Call the passed `onPostTypeChange` prop to notify the parent component
    onPostTypeChange(postType); 
    localStorage.setItem('postType', postType); // Persist post type
  };

  const sendPrompt = (prompt) => {
    console.log('Sending prompt:', prompt);
    // Implement the backend call logic here to send the prompt
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        sx={{ color: '#d4d4d4', textTransform: 'none', padding: '2px 8px' }}
      >
        AI
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
          },
        }}
      >
        <MenuItem onClick={() => toggleDrawer(true)}>Create</MenuItem>
        <MenuItem onClick={() => togglePromptsDrawer(true)}>Prompts</MenuItem>
        <MenuItem onClick={() => toggleSettingsDrawer(true)}>Settings</MenuItem>
      </Menu>

      {/* Drawer for Create Prompt */}
      <CreatePrompt
        isOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        sendPrompt={sendPrompt}
      />

      {/* Drawer for List of Prompts */}
      <PromptsDrawer
        isOpen={promptsDrawerOpen}
        toggleDrawer={togglePromptsDrawer}
        prompts={prompts}  // Pass the list of prompts
      />

      {/* Drawer for Settings */}
      <SettingsDrawer
        isOpen={settingsDrawerOpen}
        toggleDrawer={toggleSettingsDrawer}
        saveSettings={saveSettings}
      />
    </>
  );
};

export default AIDropdown;
