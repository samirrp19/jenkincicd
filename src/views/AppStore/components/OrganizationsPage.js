import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Box, Typography, Button, Paper, Chip, 
  CircularProgress, Alert 
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder";
import useAuth from "hooks/useAuth";
import ViewOrganization from "./organization/ViewOrganization"; // Import ViewOrganization component
import CreateOrganization from "./organization/CreateOrganization"; // Import CreateOrganization component

const apiUrl = process.env.REACT_APP_API_URL;

const OrganizationPage = () => {
  const { token, user } = useAuth();
  const userId = user?.id || "";

  const [ownedOrganizations, setOwnedOrganizations] = useState([]);
  const [memberOrganizations, setMemberOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null); // Store selected org for viewing
  const [creatingOrganization, setCreatingOrganization] = useState(false); // Track if user is creating an org

  useEffect(() => {
    console.log("DEBUG: Token received:", token);
    console.log("DEBUG: UserID received:", userId);

    if (!token || !userId) {
      console.warn("Missing token or userId - Skipping API call");
      setLoading(false);
      return;
    }

    const fetchOrganizations = async () => {
      try {
        console.log("Fetching organizations from API:", `${apiUrl}/api/org/${userId}/organizations`);

        const response = await axios.get(`${apiUrl}/api/org/${userId}/organizations`, {
          headers: { "x-auth-token": token },
        });

        console.log("API Response:", response.data);

        setOwnedOrganizations(response.data.ownedOrganizations || []);
        setMemberOrganizations(response.data.memberOrganizations || []);

        console.log("Updated ownedOrganizations state:", response.data.ownedOrganizations || []);
        console.log("Updated memberOrganizations state:", response.data.memberOrganizations || []);
      } catch (err) {
        console.error("Error fetching organizations:", err);
        setError("Failed to load organizations.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [token, userId]);

  console.log("Rendering - ownedOrganizations:", ownedOrganizations);
  console.log("Rendering - memberOrganizations:", memberOrganizations);

  // ✅ Function to handle clicking "View Organization"
  const handleViewOrganization = (org) => {
    setSelectedOrganization(org);
  };

  // ✅ Function to go back to the list
  const handleBackToList = () => {
    setSelectedOrganization(null);
    setCreatingOrganization(false); // Ensure form is closed
  };

  // ✅ Function to show Create Organization form
  const handleCreateOrganization = () => {
    setCreatingOrganization(true);
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      {/* If an organization is selected, show ViewOrganization page */}
      {selectedOrganization ? (
        <ViewOrganization organization={selectedOrganization} onBack={handleBackToList} />
      ) : creatingOrganization ? (
        <CreateOrganization onCancel={handleBackToList} />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Your Organizations
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateOrganization}>
              + Create Organization
            </Button>
          </Box>

          {/* Show Loading or Error State */}
          {loading ? (
            <Box display="flex" justifyContent="center" mt={3}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          ) : ownedOrganizations.length === 0 && memberOrganizations.length === 0 ? (
            <Typography sx={{ mt: 3 }}>No organizations found. Create one to get started.</Typography>
          ) : (
            <Box sx={{ mt: 3 }}>
              {/* Display Owned Organizations */}
              {ownedOrganizations.length > 0 && (
                <>
                  {ownedOrganizations.map((org) => (
                    <Paper 
                      key={org._id} 
                      sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9f9fc" }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {org.name}{" "}
                          <Chip label="Admin" size="small" color="primary" />
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#666" }}>
                          {org.description || "No description provided."}
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1}>
                        <Button startIcon={<PeopleIcon />} variant="outlined">
                          Members {org.members ? org.members.length : 0}
                        </Button>
                        <Button startIcon={<FolderIcon />} variant="outlined">
                          Projects 0 {/* Placeholder since API does not return projects */}
                        </Button>
                        <Button variant="contained" color="success" onClick={() => handleViewOrganization(org)}>
                          View Organization
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </>
              )}

              {/* Display Member Organizations */}
              {memberOrganizations.length > 0 && (
                <>
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                    Member Organizations
                  </Typography>
                  {memberOrganizations.map((org) => (
                    <Paper 
                      key={org._id} 
                      sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9f9fc" }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {org.name}{" "}
                          <Chip label="Member" size="small" color="secondary" />
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#666" }}>
                          {org.description || "No description provided."}
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1}>
                        <Button startIcon={<PeopleIcon />} variant="outlined">
                          Members {org.members ? org.members.length : 0}
                        </Button>
                        <Button startIcon={<FolderIcon />} variant="outlined">
                          Projects 0 {/* Placeholder */}
                        </Button>
                        <Button variant="contained" color="success" onClick={() => handleViewOrganization(org)}>
                          View Organization
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default OrganizationPage;
