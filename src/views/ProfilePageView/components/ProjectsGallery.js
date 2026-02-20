import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectsGallery = () => {
  const { token, user } = useAuth();
  const { username } = useParams();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !username) return;

    axios
      .get(`${apiUrl}/api/users/${username}/projects`, {
        headers: { "x-auth-token": token }
      })
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.error("Failed to load projects", err));
  }, [token, username]);

  const handleProjectClick = (projectId) => {
    if (user?.username) {
      navigate(`/${user.username}/projects/ai/${projectId}/`);
    }
  };

  const capitalize = (text) => {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!projects.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No projects found.</Typography>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Projects
      </Typography>
      <Grid container spacing={2}>
        {projects.map((proj) => (
          <Grid item xs={12} sm={6} md={4} key={proj._id}>
            <Card sx={{ borderRadius: 3, textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {capitalize(proj.projectName)}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {proj.visibility?.toUpperCase() || "PRIVATE"}
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleProjectClick(proj._id)}
                >
                  Open Project
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectsGallery;
