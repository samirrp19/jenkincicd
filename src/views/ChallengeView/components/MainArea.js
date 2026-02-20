import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Chip,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import useAuth from 'hooks/useAuth';

const apiUrl = process.env.REACT_APP_API_URL;

const MainArea = () => {
  const { token, user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = user?.username;
  const navigate = useNavigate(); // Use React Router's useNavigate hook for navigation

  // Fetch questions from the API using axios on component mount
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
        setQuestions(response.data); // Set the questions data from the response
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [token, username]);

  // Handle card click to navigate to QuestionPage
  const handleCardClick = (questionId) => {
    const questionShortText = `Q-${questionId.slice(-4)}`; // Generate the short question text
    navigate(`/questions/${questionId}`, { state: { title: questionShortText } }); // Pass the short question text to the QuestionView component
  };

  // Display a loading indicator while data is being fetched
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading questions...
        </Typography>
      </Box>
    );
  }

  // Display an error message if there is an issue
  if (error) {
    return (
      <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {questions.length > 0 ? (
          questions.map((question) => (
            <Grid item xs={12} sm={6} md={4} key={question._id}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: '10px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                  },
                  cursor: 'pointer',
                  backgroundColor: '#f4f6f8',
                }}
                onClick={() => handleCardClick(question._id)} // Pass question ID on click
              >
                {/* Card Header - Title */}
                <Box
                  sx={{
                    backgroundColor: '#3f51b5',
                    padding: '8px 16px',
                    color: 'white',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                    gutterBottom
                  >
                    Q-{question._id.slice(-4)} {/* Display short question title */}
                  </Typography>
                </Box>

                {/* Card Body - Description */}
                <CardContent sx={{ padding: '16px', backgroundColor: '#ffffff' }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {question.description}
                  </Typography>
                </CardContent>

                {/* Card Footer - Tags */}
                <CardActions
                  sx={{
                    padding: '8px 16px',
                    backgroundColor: '#f9f9f9',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    {question.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        size="small"
                        sx={{
                          color: '#3f51b5',
                          borderColor: '#3f51b5',
                        }}
                      />
                    ))}
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" align="center" sx={{ width: '100%' }}>
            No questions available
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default MainArea;
