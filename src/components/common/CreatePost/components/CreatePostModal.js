import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import BuilderIconSection from './BuilderIconSection'; // Import the builder icons component

const CreatePostModal = ({
  open,
  handleCloseModal,
  isMaximized,
  toggleMaximize,
  username,
  children,
  handleSubmit,
  activeTab,
  handleBuilderRedirect, // pass in the handler for builder redirect
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          width: isMaximized ? '100vw' : '80vw',
          height: isMaximized ? '100vh' : 'auto',
          maxWidth: 'none',
          margin: isMaximized ? 0 : 'auto',
        },
      }}
    >
      <DialogTitle sx={{ backgroundColor: 'background.paper' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Left section: Avatar and Username */}
          <Box display="flex" alignItems="center">
            <Avatar src="https://via.placeholder.com/40" alt={username} sx={{ mr: 2 }} />
            <Typography variant="h6">{username}</Typography>
          </Box>

          {/* Right section: Builder Icons, Maximize/Minimize, Close */}
          <Box display="flex" alignItems="center">
            {/* Include the builder icons */}
            <BuilderIconSection
              activeTab={activeTab}
              handleBuilderRedirect={handleBuilderRedirect}
            />

            {/* Maximize/Minimize button */}
            <Tooltip title={isMaximized ? 'Minimize' : 'Maximize'} arrow>
              <IconButton onClick={toggleMaximize}>
                {isMaximized ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Tooltip>

            {/* Close button */}
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
