import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper
} from '@mui/material';

const apiUrl = process.env.REACT_APP_API_URL;

const CreateQuestion = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scenario: '',
    expectedAnswer: '',
    visibility: 'private',
    difficultyLevel: 'easy',
    tags: '',
  });

  const { title, description, scenario, expectedAnswer, visibility, difficultyLevel, tags } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/questions`, formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      navigate('/'); // Redirect to the list of questions after successful submission
    } catch (error) {
      console.error('Error creating question:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 6,
            backgroundColor: '#f7f7f7',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Create a New Question
          </Typography>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="Enter the question title"
                />
              </Grid>
  
              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  fullWidth
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Enter the description"
                />
              </Grid>
  
              {/* Scenario */}
              <Grid item xs={12}>
                <TextField
                  label="Scenario"
                  name="scenario"
                  value={scenario}
                  onChange={onChange}
                  fullWidth
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Describe the coding scenario"
                />
              </Grid>
  
              {/* Expected Answer */}
              <Grid item xs={12}>
                <TextField
                  label="Expected Answer"
                  name="expectedAnswer"
                  value={expectedAnswer}
                  onChange={onChange}
                  fullWidth
                  required
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Enter the expected answer"
                />
              </Grid>
  
              {/* Visibility */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Visibility"
                  name="visibility"
                  value={visibility}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="private">Private</MenuItem>
                  <MenuItem value="public">Public</MenuItem>
                </TextField>
              </Grid>
  
              {/* Difficulty Level */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Difficulty Level"
                  name="difficultyLevel"
                  value={difficultyLevel}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </TextField>
              </Grid>
  
              {/* Tags */}
              <Grid item xs={12}>
                <TextField
                  label="Tags"
                  name="tags"
                  value={tags}
                  onChange={onChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter tags separated by commas"
                />
              </Grid>
  
              {/* Submit Button */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" marginTop={2}>
                  <Button variant="contained" color="primary" type="submit" size="large">
                    Create Question
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default CreateQuestion;
