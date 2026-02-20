import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Box,
  Tooltip,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import FolderIcon from "@mui/icons-material/Folder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

const ProjectCard = ({ project, token, userId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOpenProject = async () => {
    setLoading(true);

    // Navigate to AIPostBuilder immediately
    navigate(
      `/${project.username}/ai/?postType=project&postId=${project._id}&appName=${project.appName}`
    );

    // Trigger backend processing in parallel
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/apps/${project._id}`,
        {
          projectName: project.appName,
          userId: project.userId,
          username: project.username,
          frontendFramework: project.frontendFramework,
          backendFramework: project.backendFramework,
          database: project.database,
        },
        { headers: { "x-auth-token": token } }
      );

      if (response.status === 200) {
        console.log("Project opened successfully:", response.data);
      }
    } catch (error) {
      console.error("Error opening project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, boxShadow: 4, borderRadius: 3, p: 2, bgcolor: "#f9f9f9" }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {project.appName}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <PersonIcon color="primary" />
          <Typography variant="body1" color="textSecondary">
            {project.username}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CodeIcon color="primary" />
          <Typography variant="body1" color="textSecondary">
            Frontend: {project.frontendFramework}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CodeIcon color="secondary" />
          <Typography variant="body1" color="textSecondary">
            Backend: {project.backendFramework}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <StorageIcon color="info" />
          <Typography variant="body1" color="textSecondary">
            Database: {project.database}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <FolderIcon color="warning" />
          <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
            Path: {project.efsPath}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" alignItems="center" gap={1}>
          <CalendarTodayIcon color="primary" />
          <Typography variant="body2" color="textSecondary">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <CalendarTodayIcon color="secondary" />
          <Typography variant="body2" color="textSecondary">
            Updated: {new Date(project.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Tooltip title="Open Project">
          <Button
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} /> : <RocketLaunchIcon />}
            onClick={handleOpenProject}
            disabled={loading}
          >
            {loading ? "Opening..." : "Open"}
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
