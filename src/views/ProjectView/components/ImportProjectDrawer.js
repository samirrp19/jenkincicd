import React, { useState } from 'react';
import { Drawer, Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

const ImportProjectDrawer = ({ open, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleImportProject = () => {
    console.log('Importing project:', { repoUrl, username });
    // Implement project import logic here

    setSnackbar({ open: true, message: 'Project imported successfully!', severity: 'success' });
    onClose();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'fixed',
            top: '64px', // Adjusted to appear below a typical AppBar height
            height: 'calc(100% - 64px)', // Fills remaining space
          },
        }}
      >
        <Box sx={{ width: 400, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Import Project from GitHub
          </Typography>

          {/* Repo URL Input */}
          <TextField
            label="GitHub Repo URL"
            variant="outlined"
            fullWidth
            size="small"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Username Input */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Import Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleImportProject}
            disabled={!repoUrl || !username || !password}
            sx={{ textTransform: 'none' }}
          >
            Import Project
          </Button>
        </Box>
      </Drawer>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ImportProjectDrawer;
