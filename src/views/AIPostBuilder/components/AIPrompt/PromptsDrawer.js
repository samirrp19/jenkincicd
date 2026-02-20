import React, { useState } from 'react';
import { Drawer, Box, Typography, List, ListItem, Button, TextField } from '@mui/material';

const PromptsDrawer = ({ isOpen, toggleDrawer, prompts }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleSubmit = () => {
    console.log('Submitting updated prompt:', selectedPrompt);
    toggleDrawer(false);
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 350, padding: 2 }}>
        {!selectedPrompt ? (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Available Prompts</Typography>
            <List>
              {prompts.map((prompt, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  sx={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', marginBottom: '8px' }}
                >
                  {prompt.title}
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Edit Prompt</Typography>
            
            <TextField
              fullWidth
              label="Context"
              value={selectedPrompt.context}
              onChange={(e) => setSelectedPrompt({ ...selectedPrompt, context: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            
            <TextField
              fullWidth
              label="Subcontext"
              value={selectedPrompt.subcontext}
              onChange={(e) => setSelectedPrompt({ ...selectedPrompt, subcontext: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            
            {/* Add more fields as needed */}
            
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={() => setSelectedPrompt(null)} color="secondary">
                Back
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default PromptsDrawer;
