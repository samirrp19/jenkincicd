import React from 'react';
import { Grid, Box, Typography, Button, Card, CardContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PracticeContainer = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 4, px: 2, mt: 4 }}> {/* Added top margin */}
      {/* Left Side (Practice and Popular Topics) */}
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              Practice
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '16px', color: 'text.secondary', mt: 1 }}>
              This is the place to hone your skills
            </Typography>
          </Box>

          {/* Popular Topics Card */}
          <Card sx={{ ml: 4, p: 3, borderRadius: 2, boxShadow: 2, width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Popular Topics
            </Typography>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Math
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1,959 Problems
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Data Structure
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1,447 Problems
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Dynamic Programming
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  630 Problems
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="text"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: '#2a67b1',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
              >
                Show More
              </Button>
            </Box>
          </Card>
        </Box>
      </Grid>

      {/* Right Side (Self Learning and 1v1 Games in 4-column layout) */}
      <Grid item xs={12} md={2}>
        {/* Self Learning Column */}
        <Card
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 2,
            background: 'linear-gradient(to right, #1f3b8a, #2a67b1)',
            color: 'white',
            height: '100%',  // Full height for self-learning
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Self Learning
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Structured, topic-wise focus on learning with hand-picked problems
          </Typography>
          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: 'white',
              mt: 2,
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            View
          </Button>
        </Card>
      </Grid>

      {/* 1v1 Games & Upcoming Contest in another Column */}
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
          {/* 1v1 Games Card */}
          <Card
            sx={{
              p: 2,
              boxShadow: 2,
              borderRadius: 2,
              background: 'linear-gradient(to right, #6e9cfc, #7aa9ff)',
              color: 'white',
              height: '50%',  // Take 50% of the column
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              1v1 Games
            </Typography>
            <Typography variant="body2">Play challenges and Puzzles</Typography>
          </Card>

          {/* Upcoming Contest Card */}
          <Card
            sx={{
              p: 2,
              boxShadow: 2,
              borderRadius: 2,
              background: '#4f4f4f',
              color: 'white',
              height: '50%',  // Take 50% of the column
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="overline" sx={{ fontWeight: 'bold' }}>
              UPCOMING CONTEST
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              December Long Challenge
            </Typography>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PracticeContainer;
