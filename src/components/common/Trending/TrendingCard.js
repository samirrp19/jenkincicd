import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, IconButton, Grid, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import useAuth from 'hooks/useAuth';

const apiUrl = process.env.REACT_APP_API_URL; 

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
}));

const NewsTitle = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginTop: theme.spacing(2),
}));

const TrendingCard = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth(); 
  const username = user?.username; 
  
  // Fetch top questions from the API
  useEffect(() => {
    if (!username) {
        console.error('Username is undefined');
        return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/questions`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setQuestions(response.data.slice(0, 5)); // Get the top 5 questions
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [token, username]);

  // Format date in a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Dummy puzzle data for "Today's Puzzles" section
  const puzzles = [
    { title: 'Queens', description: 'Crown each region' },
    { title: 'Pinpoint', description: 'Guess the category' },
    { title: 'Crossclimb', description: 'Unlock a trivia ladder' },
  ];

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Trending Topics
        </Typography>

        {/* Section 1: Top Questions */}
        <SectionTitle variant="subtitle1">Top Questions</SectionTitle>

        {loading ? (
          <Box textAlign="center" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          questions.map((question, index) => (
            <Box key={index} mb={2}>
              <NewsTitle variant="body1" gutterBottom>
                {question.title}
              </NewsTitle>
              <Typography variant="caption" color="textSecondary">
                Posted on {formatDate(question.createdAt)}
              </Typography>
            </Box>
          ))
        )}

        <Box textAlign="center" my={2}>
          <IconButton aria-label="Show more news">
            <FaChevronDown />
          </IconButton>
        </Box>

        {/* Section 2: Today's Puzzles */}
        <SectionTitle variant="subtitle1">Today's Puzzles</SectionTitle>
        <Grid container spacing={1}>
          {puzzles.map((puzzle, index) => (
            <Grid item xs={12} key={index}>
              <Box display="flex" alignItems="center" mb={1}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: '#E0E0E0',
                    borderRadius: '50%',
                    marginRight: 2,
                  }}
                />
                <Box>
                  <Typography variant="body1">{puzzle.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {puzzle.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default TrendingCard;
