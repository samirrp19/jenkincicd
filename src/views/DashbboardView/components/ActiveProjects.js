import React from 'react';
import { Box, Typography, LinearProgress, Avatar, Grid } from '@mui/material';

// Dummy active projects data
const activeProjects = [
  {
    title: 'Social Network App',
    lessons: '7/12',
    progress: 58.3,
    image: '/project1.jpg', // Provide your image URLs here
  },
  {
    title: 'E-commerce Platform',
    lessons: '8/12',
    progress: 66.7,
    image: '/project2.jpg',
  },
  {
    title: 'Project Management Tool',
    lessons: '9/12',
    progress: 75,
    image: '/project3.jpg',
  },
  {
    title: 'Portfolio Website',
    lessons: '10/12',
    progress: 83.3,
    image: '/project4.jpg',
  },
];

const ActiveProjects = () => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: '#ffffff',
        borderRadius: '16px',
        boxShadow: 1,
        height: '100%',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Active Projects
      </Typography>

      {activeProjects.map((project, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                variant="rounded"
                src={project.image}
                alt={project.title}
                sx={{ width: 50, height: 50 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" fontWeight="bold">
                {project.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Lessons: {project.lessons}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={project.progress}
                sx={{
                  mt: 1,
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#FFB020', // Orange color
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" fontWeight="bold">
                {project.progress}%
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ActiveProjects;
