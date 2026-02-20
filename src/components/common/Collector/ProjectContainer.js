import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, CardActions, Button } from '@mui/material';
import fetchUserProjects from 'services/projectCollectorService';  // Import the service

const ProjectContainer = ({ username, token }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedProjects = await fetchUserProjects(username, token);
        setProjects(fetchedProjects);
        setError(null); // Clear any previous error
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadProjects();
  }, [username, token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
      {projects.length === 0 ? (
        <Typography>No projects found</Typography>
      ) : (
        projects.map((project) => (
          <Card key={project._id} sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {project.projectName}
              </Typography>
              <Typography color="textSecondary">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Open</Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ProjectContainer;
