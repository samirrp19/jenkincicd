import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const CreateProjectModal = ({ open, onClose, selectedOrg, onProjectCreated }) => {
  const { token, user } = useAuth();
  const userId = user?.id || "";
  const username = user?.username || "";

  const [organizations, setOrganizations] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState(selectedOrg);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch Organizations (Including Default)
  useEffect(() => {
    if (!token || !userId) return;

    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/org/${userId}/organizations`, {
          headers: { "x-auth-token": token },
        });

        let fetchedOrgs = response.data.ownedOrganizations || [];

        // ✅ Ensure "Default" Organization Exists
        const defaultOrg = { _id: "default", name: "Default" };
        if (!fetchedOrgs.some((org) => org.name.toLowerCase() === "default")) {
          fetchedOrgs = [defaultOrg, ...fetchedOrgs];
        }

        setOrganizations(fetchedOrgs);
        setSelectedOrganization(selectedOrg || defaultOrg._id);
      } catch (err) {
        console.error("❌ Error fetching organizations:", err);
      }
    };

    fetchOrganizations();
  }, [token, userId, selectedOrg]);

  // ✅ Handle Project Creation
  const handleCreateProject = async () => {
    if (!projectName || !selectedOrganization) {
      setError("Please enter a project name and select an organization.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${apiUrl}/api/projects/${username}/projects/create`,
        {
          projectName,
          organizationId: selectedOrganization,
          userId,
          username,
        },
        { headers: { "x-auth-token": token } }
      );

      console.log("✅ Project Created:", response.data);
      setProjectName("");
      onProjectCreated(response.data.project); // ✅ Update project list
      onClose();
    } catch (err) {
      console.error("❌ Error creating project:", err);
      setError("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-project-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" fontWeight="bold">Create Project</Typography>

        {/* Show Errors */}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {/* Organization Dropdown */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Organization</Typography>
          <Select value={selectedOrganization} onChange={(e) => setSelectedOrganization(e.target.value)} fullWidth>
            {organizations.map((org) => (
              <MenuItem key={org._id} value={org._id}>{org.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Project Name Input */}
        <TextField
          fullWidth
          label="Project Name"
          variant="outlined"
          sx={{ mt: 2 }}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        {/* Create Project Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, bgcolor: "#7376f7", color: "#fff" }}
          onClick={handleCreateProject}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "✓ Create Project"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;
