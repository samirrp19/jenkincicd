import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateProjectModal from "./CreateProjectModal";
import useAuth from "hooks/useAuth";
import { useThemeContext } from "../ThemeContext";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectsList = ({ selectedOrg, setSelectedOrg }) => {
  const { themeMode } = useThemeContext();
  const isDarkMode = themeMode === "dark";
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const username = user?.username || "";

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchOrganizationsAndProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        let orgId = selectedOrg;

        // ✅ If the selected organization is "Default", fetch the actual Default Org ID
        if (!orgId || orgId === "Default") {
          const response = await axios.get(`${apiUrl}/api/org/${user.id}/organizations`, {
            headers: { "x-auth-token": token },
          });

          const defaultOrg = response.data.ownedOrganizations.find(org => org.isDefault);
          if (defaultOrg) {
            orgId = defaultOrg._id;
            setSelectedOrg(orgId);
            localStorage.setItem("selectedOrg", orgId);
          }
        }

        // ✅ Only fetch projects if `orgId` is a valid MongoDB ObjectId
        if (orgId && orgId !== "Default") {
          const response = await axios.get(`${apiUrl}/api/org/organizations/${orgId}/projects`, {
            headers: { "x-auth-token": token },
          });

          setProjects(response.data.projects || []);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationsAndProjects();
  }, [selectedOrg, token]);

  const handleProjectCreated = (newProject) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/${username}/projects/ai/${projectId}/`);
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" color={isDarkMode ? "#fff" : "#000"} sx={{ mb: 2 }}>
        Active Projects
      </Typography>

      <Grid container spacing={3}>
        {/* Create New Project Button */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              backgroundColor: isDarkMode ? "#3A3F66" : "#6B73FF",
              color: "#fff",
              p: 3,
              borderRadius: "10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => setModalOpen(true)}
          >
            <AddIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">Create New Project</Typography>
          </Card>
        </Grid>

        {/* Show Loading State */}
        {loading && (
          <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
            <CircularProgress />
          </Grid>
        )}

        {/* Show Error Message */}
        {!loading && error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Show No Projects Found Message */}
        {!loading && !error && projects.length === 0 && (
          <Grid item xs={12}>
            <Typography sx={{ mt: 3, textAlign: "center", color: isDarkMode ? "#fff" : "#666" }}>
              No projects found for this organization. Click "Create New Project" to start.
            </Typography>
          </Grid>
        )}

        {/* Show Projects */}
        {!loading &&
          !error &&
          projects.length > 0 &&
          projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "10px",
                  backgroundColor: isDarkMode ? "#1E1E2D" : "#fff",
                  color: isDarkMode ? "#fff" : "#000",
                  boxShadow: isDarkMode ? "none" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.03)" },
                }}
                onClick={() => handleProjectClick(project._id)}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{project.projectName}</Typography>
                  <Typography variant="body2">📅 Date: {new Date(project.createdAt).toLocaleDateString()}</Typography>
                  <Typography variant="body2">👥 Users: {project.members?.length || 1}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Create Project Modal */}
      <CreateProjectModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        selectedOrg={selectedOrg} 
        onProjectCreated={handleProjectCreated} 
      />
    </Box>
  );
};

export default ProjectsList;
