import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const DeleteConfirmationModal = ({ show, handleClose, handleDelete, videoName }) => {
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="delete-video-title"
      aria-describedby="delete-video-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="delete-video-title">Delete Video</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-video-description">
          Are you sure you want to delete the video <strong>{videoName}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
