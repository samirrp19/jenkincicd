import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import axios from "axios";
import ProjectCard from "./ProjectCard"; // Import the ProjectCard component

const Projects = ({ username, token, userId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("grid"); // Default to grid view

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/apps/projects`,
          {
            headers: { "x-auth-token": token },
            params: { userId }, // Pass userId as a query parameter
          }
        );
        setProjects(response.data.projects);
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [username, token, userId]);

  const handleViewChange = (event, newView) => {
    if (newView !== null) setView(newView);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Toggle between Grid and List View */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Your Projects
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view toggle"
          sx={{ bgcolor: "background.paper", boxShadow: 1, borderRadius: 2 }}
        >
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Display Projects in List or Grid View */}
      {projects.length === 0 ? (
        <Typography>No projects found</Typography>
      ) : view === "grid" ? (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <ProjectCard project={project} token={token} userId={userId} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} token={token} userId={userId} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Projects;
