import React, { useState } from 'react';
import {
  Drawer, Box, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl,
} from '@mui/material';

const CreatePrompt = ({ isOpen, toggleDrawer, sendPrompt }) => {
  const [promptType, setPromptType] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handlePromptChange = (event) => {
    setPromptType(event.target.value);
  };

  const handleSubmit = () => {
    const selectedPrompt = promptType === 'custom' ? customPrompt : promptType;
    sendPrompt(selectedPrompt);
    toggleDrawer(false);
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 350, padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Create Prompt</Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Context</InputLabel>
          <Select
            value={promptType}
            onChange={handlePromptChange}
            label="Context"
          >
            <MenuItem value="prompt1">Prompt 1</MenuItem>
            <MenuItem value="prompt2">Prompt 2</MenuItem>
            <MenuItem value="prompt3">Prompt 3</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>

        {/* If Custom is selected, show a TextField for entering custom prompt */}
        {promptType === 'custom' && (
          <TextField
            fullWidth
            label="Enter custom context"
            multiline
            rows={4}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
        )}

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={() => toggleDrawer(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Start
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CreatePrompt;
