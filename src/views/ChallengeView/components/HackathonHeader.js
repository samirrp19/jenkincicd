import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField, MenuItem, Chip } from '@mui/material';
import axios from 'axios';
import useAuth from 'hooks/useAuth';

const visibilityOptions = ['public', 'private'];

const HackathonHeader = ({ onCreateHackathonClick }) => {
  const { token } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    scenario: '',
    description: '',
    visibility: 'public',
    tags: [],
    expectedAnswer: ''
  });

  const handleChange = (field) => (event) => {
    const value = field === 'tags' ? event.target.value : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleCreateQuestion = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/challenges/question/create`,
        formData,
        {
          headers: { "x-auth-token": token },
        }
      );
      console.log('Question created:', response.data);
      setOpenModal(false);
      setFormData({
        title: '',
        scenario: '',
        description: '',
        visibility: 'public',
        tags: [],
        expectedAnswer: ''
      });
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography variant="h4" fontWeight={600}>Hackathons</Typography>
      <Box display="flex" gap={2}>
        <Button variant="outlined" onClick={() => setOpenModal(true)}>
          + Create Question
        </Button>
        <Button variant="contained" onClick={onCreateHackathonClick}>
          Create Hackathon
        </Button>
      </Box>

      {/* Create Question Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant="h6" mb={2}>Create New Question</Typography>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={formData.title}
            onChange={handleChange('title')}
          />
          <TextField
            fullWidth
            label="Scenario"
            multiline
            rows={2}
            margin="normal"
            value={formData.scenario}
            onChange={handleChange('scenario')}
          />
          <TextField
            fullWidth
            label="Problem Statement"
            multiline
            rows={4}
            margin="normal"
            value={formData.description}
            onChange={handleChange('description')}
          />
          <TextField
            select
            fullWidth
            label="Visibility"
            margin="normal"
            value={formData.visibility}
            onChange={handleChange('visibility')}
          >
            {visibilityOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Tags (comma separated)"
            margin="normal"
            value={formData.tags}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })
            }
            InputProps={{
              startAdornment: formData.tags.map((tag, index) => (
                <Chip key={index} label={tag} sx={{ mr: 1 }} />
              ))
            }}
          />
          <TextField
            fullWidth
            label="Expected Answer"
            multiline
            rows={3}
            margin="normal"
            value={formData.expectedAnswer}
            onChange={handleChange('expectedAnswer')}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleCreateQuestion} variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HackathonHeader;
