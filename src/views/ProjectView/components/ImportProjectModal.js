import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const ImportProjectModal = ({ open, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleImportProject = () => {
    console.log('Importing project:', { repoUrl, username });
    // Implement project import logic here
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Import Project from GitHub
        </Typography>
        <TextField
          label="GitHub Repo URL"
          variant="outlined"
          fullWidth
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleImportProject}
          disabled={!repoUrl || !username || !password}
        >
          Import Project
        </Button>
      </Box>
    </Modal>
  );
};

// Define the modal style here
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default ImportProjectModal;
