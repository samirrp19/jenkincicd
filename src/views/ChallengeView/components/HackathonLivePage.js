// src/views/HackathonLivePage.js
import React, { useState } from 'react';
import { Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionView from  '../../QuestionView/QuestionView';

// Dummy data (replace with backend data)
const dummyHackathon = {
  title: 'Inspirational 3D course for Designers',
  questions: [
    { id: 'q1', title: 'Quiz topic one' },
    { id: 'q2', title: 'Quiz topic two' },
    { id: 'q3', title: 'Quiz topic three' }
  ],
  participants: [
    { name: 'Adele', avatar: '/avatars/adele.png' },
    { name: 'Alyssa', avatar: '/avatars/alyssa.png' },
    { name: 'Arianna', avatar: '/avatars/arianna.png' },
    { name: 'Charles', avatar: '/avatars/charles.png' },
    { name: 'Emily', avatar: '/avatars/emily.png' }
  ]
};

const HackathonLivePage = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [selectedQuestionId, setSelectedQuestionId] = useState(questionId || dummyHackathon.questions[0].id);

  const handleQuestionSelect = (id) => {
    setSelectedQuestionId(id);
    navigate(`/hackathon/live/${id}`);
  };

  return (
    <Grid container>
      {/* Left Sidebar */}
      <Grid item xs={12} sm={4} md={3} sx={{ bgcolor: '#fafafa', height: '100vh', overflowY: 'auto', borderRight: '1px solid #ddd' }}>
        <Box sx={{ p: 2 }}>
          {/* Hackathon Title */}
          <Typography variant="h6" fontWeight={600} mb={1}>{dummyHackathon.title}</Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Question List */}
          <Typography variant="subtitle2" gutterBottom>Quizzes</Typography>
          <List dense>
            {dummyHackathon.questions.map((q) => (
              <ListItem button selected={q.id === selectedQuestionId} key={q.id} onClick={() => handleQuestionSelect(q.id)}>
                <ListItemText primary={q.title} />
              </ListItem>
            ))}
          </List>

          {/* Participant List */}
          <Typography variant="subtitle2" mt={4} gutterBottom>Participants</Typography>
          <List dense>
            {dummyHackathon.participants.map((p, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={p.avatar}>{p.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={p.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      {/* Right Main Area */}
      <Grid item xs={12} sm={8} md={9} sx={{ height: '100vh', overflowY: 'auto' }}>
        <QuestionView key={selectedQuestionId} id={selectedQuestionId} />
      </Grid>
    </Grid>
  );
};

export default HackathonLivePage;
