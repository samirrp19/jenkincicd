import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, Stepper, Step, StepLabel, CircularProgress, Alert } from "@mui/material";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const CreateOrganization = ({ onCancel, onSuccess }) => {
  const { token, user } = useAuth();
  const userId = user?.id || ""; // Get userId from auth context
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Add details", "Invite members"];
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Function to handle form submission
  const handleSubmit = async () => {
    if (!orgName.trim()) {
      setError("Organization name is required.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${apiUrl}/api/org/organizations`, // ✅ Correct API endpoint
        { 
          name: orgName, 
          description, 
          userId // ✅ Include userId as required by the API
        },
        { headers: { "x-auth-token": token } } // ✅ Correct Authorization header
      );

      console.log("Organization Created:", response.data);
      setSuccessMessage("Organization created successfully! 🎉");

      // Refresh organization list after successful creation
      onSuccess();

      // Reset form
      setTimeout(() => {
        onCancel();
      }, 1500);
    } catch (err) {
      console.error("Error creating organization:", err);
      setError(err.response?.data?.error || "Failed to create organization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%", textAlign: "center" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography variant="h5" fontWeight="bold">
        Set up your organization
      </Typography>

      {/* Form */}
      <Box sx={{ maxWidth: "400px", mx: "auto", mt: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        <TextField 
          fullWidth 
          label="Name of the organization" 
          required 
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          sx={{ mb: 2 }} 
        />
        <TextField 
          fullWidth 
          label="Description" 
          multiline 
          rows={3} 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }} 
        />
        <Button 
          fullWidth 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Create 🚀"}
        </Button>
        <Button fullWidth variant="outlined" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreateOrganization;
