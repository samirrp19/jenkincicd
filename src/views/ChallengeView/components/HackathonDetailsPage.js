import React from 'react';
import {
  Box, Typography, List, ListItem, ListItemText,
  Checkbox, Button, Divider, Paper, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';


const HackathonDetailsPage = ({ hackathon, onBack }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    // If using static questions: navigate to first one
    // Otherwise: just go to general live page and load questions there
    navigate('/hackathon/live/q1');
  };
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: '200px' }, py: 6 }}>
      {/* Back Button */}
      <IconButton onClick={onBack} sx={{ mb: 2 }}>
        <ArrowBackIcon /> <Typography ml={1}>Back to Hackathons</Typography>
      </IconButton>

      <Typography variant="h4" fontWeight={600} gutterBottom>
        {hackathon?.title || 'SQL Online Test and Quiz'}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Take this comprehensive SQL quiz online to assess your proficiency in basic and intermediate SQL concepts...
      </Typography>

      <Typography variant="h6" mt={4} mb={2}>After completing this SQL quiz, you’ll receive:</Typography>
      <ul>
        <li><b>Instant Performance Report:</b> Get immediate insights into your strengths and areas for improvement.</li>
        <li><b>Personalized Learning Path:</b> Receive tailored course recommendations based on your quiz results.</li>
        <li><b>Shareable Score Card:</b> Showcase your SQL proficiency to potential employers or colleagues.</li>
      </ul>

      <Typography variant="body1" gutterBottom>
        Whether you’re a beginner... the perfect tool to gauge your expertise.
      </Typography>

      <Paper variant="outlined" sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>Test Syllabus</Typography>
        <List sx={{ columns: 2 }}>
          {[
            'Basic SQL queries',
            'Select statements',
            'SQL Joins',
            'Subqueries',
            'Set Operations',
            'Order by and Limit queries'
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <AccessTimeIcon color="primary" />
          <Typography variant="body1"><b>1 Hour</b> — Total time to attempt the assessment</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <FormatListNumberedIcon color="primary" />
          <Typography variant="body1">17 Questions — Programming problems and MCQs</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <PersonIcon color="primary" />
          <Typography variant="body1"><b>Priyabrata Mohanty</b><br /><small>CodeChef Username: aided_flag_74</small></Typography>
        </Box>

        <Typography variant="body2" fontWeight={600} mb={1}>Read the rules carefully before starting</Typography>
        <ul>
          <li>You can only attempt this assessment once</li>
          <li>You will not be able to pause the assessment after starting</li>
          <li>You are not allowed to switch tabs during the assessment</li>
          <li>You will get a detailed report on your performance at the end of the assessment</li>
        </ul>

        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <Checkbox />
          <Typography variant="body2">I agree to participate fairly in the assessment</Typography>
        </Box>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleStart}
        >
          Start Assessment
        </Button>
      </Paper>
    </Box>
  );
};

export default HackathonDetailsPage;
