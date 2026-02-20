import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, MenuItem, Grid, Checkbox,
  FormControlLabel, Paper, IconButton, Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import useAuth from 'hooks/useAuth';

const visibilityOptions = ['public', 'private'];

const CreateHackathonPage = ({ onCreated, showBackButton = false }) => {
  const { token } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bannerUrl: '',
    startDate: '',
    endDate: '',
    maxParticipants: 100,
    offers: '',
    visibility: 'public',
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenges/questions`, {
          headers: { 'x-auth-token': token },
        });
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to fetch questions', err);
      }
    };
    fetchQuestions();
  }, [token]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleQuestionToggle = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    try {
      const payload = {
        ...formData,
        questions: selectedQuestions,
        offers: formData.offers.split(',').map((s) => s.trim()),
      };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/challenges/hackathons/create`,
        payload,
        { headers: { 'x-auth-token': token } }
      );
      alert('Hackathon created');
      if (typeof onCreated === 'function') onCreated();
    } catch (error) {
      console.error('Error creating hackathon:', error);
    }
  };

  return (
    <Box sx={{ pb: 6 }}>
      {/* Optional back button */}
      {showBackButton && (
        <Tooltip title="Back to Hackathons">
          <IconButton onClick={onCreated} sx={{ mb: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      )}

      <Typography variant="h4" gutterBottom>Create Hackathon</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField fullWidth label="Title" value={formData.title} onChange={handleChange('title')} margin="normal" />
          <TextField fullWidth multiline rows={4} label="Description" value={formData.description} onChange={handleChange('description')} margin="normal" />
          <TextField fullWidth label="Banner URL" value={formData.bannerUrl} onChange={handleChange('bannerUrl')} margin="normal" />
          <TextField fullWidth type="datetime-local" label="Start Date" value={formData.startDate} onChange={handleChange('startDate')} margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField fullWidth type="datetime-local" label="End Date" value={formData.endDate} onChange={handleChange('endDate')} margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Max Participants" type="number" value={formData.maxParticipants} onChange={handleChange('maxParticipants')} margin="normal" />
          <TextField fullWidth label="Offers (comma separated)" value={formData.offers} onChange={handleChange('offers')} margin="normal" />
          <TextField select fullWidth label="Visibility" value={formData.visibility} onChange={handleChange('visibility')} margin="normal">
            {visibilityOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Pick Questions</Typography>
          <Paper variant="outlined" sx={{ maxHeight: 400, overflowY: 'auto', p: 2 }}>
            {questions.map((q) => (
              <FormControlLabel
                key={q._id}
                control={<Checkbox checked={selectedQuestions.includes(q._id)} onChange={() => handleQuestionToggle(q._id)} />}
                label={
                  <Box>
                    <b>{q.title}</b>
                    <Typography variant="caption" display="block">{q.scenario}</Typography>
                  </Box>
                }
              />
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="right">
        <Button variant="contained" onClick={handleCreate}>Submit Hackathon</Button>
      </Box>
    </Box>
  );
};

export default CreateHackathonPage;
