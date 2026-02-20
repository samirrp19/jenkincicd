import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

const WorkspaceSettingsModal = ({ open, onClose, workspaceData }) => {
  if (!workspaceData) return null;

  const {
    workspaceName,
    framework,
    frameworkType,
    efsPath,
    tempEfsPath,
    postType,
  } = workspaceData;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          mt: 10, // Push below fixed header
          ml: { sm: 8 }, // Avoid sidebar overlap
          mr: { sm: 2 },
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Workspace Properties
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Workspace Name</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>{workspaceName}</Typography>
          <Typography variant="subtitle2">Framework</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>{framework}</Typography>
          <Typography variant="subtitle2">Framework Type</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>{frameworkType}</Typography>
          <Typography variant="subtitle2">EFS Path</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>{efsPath}</Typography>
          <Typography variant="subtitle2">Temporary EFS Path</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>{tempEfsPath}</Typography>
          <Typography variant="subtitle2">Post Type</Typography>
          <Typography variant="body2">{postType}</Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkspaceSettingsModal;
