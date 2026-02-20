import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const CreateProjectModal = ({ open, onClose, username, userId, token }) => {
  const [projectName, setProjectName] = useState('');
  const [framework, setFramework] = useState('');
  const [postType, setPostType] = useState(''); // Add postType state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleCreateProject = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/apps/create`,
        { projectName, userId, username, framework}, // Include postType in request
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      if (response.status === 201) {
        setSnackbar({ open: true, message: 'Project created successfully!', severity: 'success' });
        onClose(); // Close modal after success
      } else {
        throw new Error('Project creation failed.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setSnackbar({ open: true, message: 'Error creating project. Please try again.', severity: 'error' });
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Create Project
          </Typography>
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Framework</InputLabel>
            <Select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              label="Framework"
            >
              <MenuItem value="react-node">ReactNode</MenuItem>
              <MenuItem value="NodeJs">NodeJs</MenuItem>
              {/* Add more frameworks as needed */}
            </Select>
          </FormControl>

          {/* New postType selector */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Post Type</InputLabel>
            <Select
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              label="Post Type"
            >
              <MenuItem value="project">Project</MenuItem>
              <MenuItem value="program">Program</MenuItem>
              <MenuItem value="template">Template</MenuItem>
              <MenuItem value="document">Document</MenuItem>
              <MenuItem value="challenge">Challenge</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateProject}
            disabled={!projectName || !framework || !postType}
          >
            Create Project
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

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

export default CreateProjectModal;
