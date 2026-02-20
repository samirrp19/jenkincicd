import React from 'react';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StoreAlert = ({ variant = 'info', message, onClose }) => {
  return (
    <Alert
      severity={variant} // severity maps to variants like error, warning, info, success
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }} // Optional: for some margin below the alert
    >
      {message}
    </Alert>
  );
};

export default StoreAlert;
