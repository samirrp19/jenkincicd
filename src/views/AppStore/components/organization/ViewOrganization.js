import React, { useState } from "react";
import { Box, Typography, TextField, Button, Tabs, Tab, Paper } from "@mui/material";

const ViewOrganization = ({ organization, onBack }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Button onClick={onBack} sx={{ mb: 2 }}>
        ← Back
      </Button>
      <Typography variant="h5" fontWeight="bold">
        {organization.name}
      </Typography>

      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleChange} sx={{ mt: 2 }}>
        <Tab label="General" />
        <Tab label="Members 1" />
        <Tab label="Projects" />
        <Tab label="Subscription" />
        <Tab label="Invoices" />
      </Tabs>

      {/* Tab Content */}
      <Paper sx={{ mt: 3, p: 3 }}>
        {tabIndex === 0 && (
          <Box>
            <TextField fullWidth label="Name of the organization" defaultValue={organization.name} sx={{ mb: 2 }} />
            <TextField fullWidth label="Description" multiline rows={3} defaultValue={organization.description} sx={{ mb: 3 }} />
            <Button variant="contained" color="success">
              Save Changes
            </Button>

            <Box sx={{ mt: 5, p: 2, border: "1px solid red", borderRadius: "8px" }}>
              <Typography variant="h6" color="error">
                Delete this organization
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#666" }}>Once deleted, it will be gone forever. Please be certain.</Typography>
              <Button variant="contained" color="error" sx={{ mt: 2 }}>
                Delete this organization
              </Button>
            </Box>

            <Box sx={{ mt: 3, p: 2, border: "1px solid red", borderRadius: "8px" }}>
              <Typography variant="h6" color="error">
                Leave this organization
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#666" }}>You will no longer be able to access this organization</Typography>
              <Button variant="contained" color="error" sx={{ mt: 2 }}>
                Leave this organization
              </Button>
            </Box>
          </Box>
        )}

        {tabIndex === 1 && <Typography>Members List will be shown here</Typography>}
        {tabIndex === 2 && <Typography>Projects will be listed here</Typography>}
        {tabIndex === 3 && <Typography>Subscription details will be shown here</Typography>}
        {tabIndex === 4 && <Typography>Invoices will be shown here</Typography>}
      </Paper>
    </Box>
  );
};

export default ViewOrganization;
