import React from "react";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import FolderIcon from "@mui/icons-material/Folder";

const organizations = [
  {
    name: "test",
    role: "Admin",
    projects: 1,
    members: 1,
    description: "test projects",
  },
];

const OrganizationsList = ({ onCreate, onView }) => {
  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Your Organizations
        </Typography>
        <Button variant="contained" color="primary" onClick={onCreate}>
          + Create organization
        </Button>
      </Box>

      {/* Organization List */}
      <Box sx={{ mt: 3 }}>
        {organizations.map((org, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9f9fc" }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {org.name} <Chip label={org.role} size="small" />
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#666" }}>{org.description}</Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Button startIcon={<PeopleIcon />} variant="outlined">
                Members {org.members}
              </Button>
              <Button startIcon={<FolderIcon />} variant="outlined">
                Projects {org.projects}
              </Button>
              <Button variant="contained" color="success" onClick={() => onView(org)}>
                View Organization
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default OrganizationsList;
