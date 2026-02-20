import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert, Grid } from '@mui/material';
import axios from 'axios';

const CreateProjectDrawer = ({ open, onClose, username, userId, token }) => {
  const [domain, setDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [domains, setDomains] = useState([]);
  const [appName, setAppName] = useState('');
  const [frontendFramework, setFrontendFramework] = useState('');
  const [backendFramework, setBackendFramework] = useState('');
  const [database, setDatabase] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // Fetch the list of available domains (contexts) from the backend
    const fetchDomains = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contexts`, {
          headers: { 'x-auth-token': token },
        });
        // Assuming the API returns an object with a "contexts" array
        if (response.data && Array.isArray(response.data.contexts)) {
          setDomains(response.data.contexts);
        }
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, [token]);

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleCreateApp = async () => {
    try {
      // Use the custom domain value if "custom" is selected; otherwise, use the selected domain
      const selectedDomain = domain === 'custom' ? customDomain : domain;
      const payload = {
        appName,
        userId,
        username,
        domain: selectedDomain,
        frontendFramework,
        backendFramework,
        database,
        action: 'create',
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/apps/create`,
        payload,
        { headers: { 'x-auth-token': token } }
      );

      if (response.status === 201) {
        setSnackbar({ open: true, message: 'App created successfully!', severity: 'success' });
        onClose(); // Close drawer after success
      } else {
        throw new Error('App creation failed.');
      }
    } catch (error) {
      console.error('Error creating app:', error);
      setSnackbar({ open: true, message: 'Error creating app. Please try again.', severity: 'error' });
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'fixed',
            top: '64px', // Adjusted to appear below a typical AppBar height
            height: 'calc(100% - 64px)', // Fills remaining space
          },
        }}
      >
        <Box sx={{ width: 400, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create App
          </Typography>

          {/* Domain Selection */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Domain</InputLabel>
            <Select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              label="Domain"
            >
              {domains.map((d) => (
                <MenuItem key={d._id} value={d.name}>
                  {d.name}
                </MenuItem>
              ))}
              <MenuItem value="custom">Custom Domain</MenuItem>
            </Select>
          </FormControl>

          {/* Custom Domain Input if 'custom' is selected */}
          {domain === 'custom' && (
            <TextField
              label="Custom Domain"
              variant="outlined"
              fullWidth
              size="small"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          {/* App Name Input */}
          <TextField
            label="App Name"
            variant="outlined"
            fullWidth
            size="small"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Frameworks: Frontend and Backend */}
          <Typography variant="subtitle1" gutterBottom>
            Framework
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Frontend</InputLabel>
                <Select
                  value={frontendFramework}
                  onChange={(e) => setFrontendFramework(e.target.value)}
                  label="Frontend"
                >
                  <MenuItem value="react">React</MenuItem>
                  <MenuItem value="vue">Vue</MenuItem>
                  <MenuItem value="nextjs">Next</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Backend</InputLabel>
                <Select
                  value={backendFramework}
                  onChange={(e) => setBackendFramework(e.target.value)}
                  label="Backend"
                >
                  <MenuItem value="node">Node JS</MenuItem>
                  <MenuItem value="flask">Python Flask</MenuItem>
                  <MenuItem value="rails">Ruby Rails</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Database Selection */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Database</InputLabel>
            <Select
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              label="Database"
            >
              <MenuItem value="postgres">Postgres</MenuItem>
              <MenuItem value="mongodb">MongoDB</MenuItem>
              <MenuItem value="sqlite">Sqlite</MenuItem>
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateApp}
            disabled={
              !appName ||
              !frontendFramework ||
              !backendFramework ||
              !database ||
              !domain ||
              (domain === 'custom' && !customDomain)
            }
            sx={{ textTransform: 'none' }}
          >
            Create App
          </Button>
        </Box>
      </Drawer>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateProjectDrawer;
