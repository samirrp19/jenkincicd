import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const WorkspaceModal = ({ open, onClose }) => {
  const [workspaceType, setWorkspaceType] = useState('Devbox');
  const [customName, setCustomName] = useState('');

  const handleWorkspaceTypeChange = (event) => {
    setWorkspaceType(event.target.value);
    if (event.target.value !== 'Custom') {
      setCustomName('');
    }
  };

  const handleCreateWorkspace = () => {
    const workspaceName = workspaceType === 'Custom' ? customName : workspaceType;
    console.log('Creating workspace:', workspaceName);
    // Add logic for creating a workspace here
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Create Workspace
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Workspace Type</InputLabel>
          <Select
            value={workspaceType}
            onChange={handleWorkspaceTypeChange}
            label="Workspace Type"
          >
            <MenuItem value="Devbox">Devbox</MenuItem>
            <MenuItem value="Sandbox">Sandbox</MenuItem>
            <MenuItem value="Custom">Custom</MenuItem>
          </Select>
        </FormControl>
        {workspaceType === 'Custom' && (
          <TextField
            label="Custom Workspace Name"
            variant="outlined"
            fullWidth
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateWorkspace}
          disabled={workspaceType === 'Custom' && !customName}
        >
          Create Workspace
        </Button>
      </Box>
    </Modal>
  );
};

// Modal styling
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

export default WorkspaceModal;
