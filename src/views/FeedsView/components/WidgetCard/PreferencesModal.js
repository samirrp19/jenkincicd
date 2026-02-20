import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
} from '@mui/material';

// List of preferences
const preferencesData = {
  'Web Development': ['MERN', 'MEAN', 'Spring Boot', 'Django'],
  Languages: ['Python', 'Javascript', 'Java', 'C#', 'C++', 'Go'],
  'Cloud Computing': ['Amazon Web Services', 'Google Cloud', 'Azure'],
  'Data Science': ['Data Engineering', 'Data Pipeline', 'Data Governance'],
  Testing: ['Automated Testing', 'Testing Tools'],
  DevOps: ['CICD', 'Shell Scripting', 'Automation'],
};

const PreferencesModal = ({ open, handleClose }) => {
  const [preferences, setPreferences] = useState({});

  // Handle the change when an item checkbox is toggled
  const handleCheckboxChange = (section, item) => {
    setPreferences((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [item]: !prevState[section]?.[item],
      },
    }));
  };

  // Handle the Save button click
  const handleSave = () => {
    console.log('Selected Preferences:', preferences); // Here you can perform any actions with the preferences
    handleClose();
  };

  // Render a section with items and checkboxes
  const renderSection = (section, items) => (
    <Box key={section} mb={2}>
      <Typography variant="h6" gutterBottom>
        {section}
      </Typography>
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={preferences[section]?.[item] || false}
                onChange={() => handleCheckboxChange(section, item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
      <Divider sx={{ my: 2 }} />
    </Box>
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Preferences</DialogTitle>
      <DialogContent dividers>
        {Object.keys(preferencesData).map((section) =>
          renderSection(section, preferencesData[section])
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreferencesModal;
