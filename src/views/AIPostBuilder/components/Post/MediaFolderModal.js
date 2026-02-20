import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import { Close, ZoomOutMap } from '@mui/icons-material';
import MediaFolderTabs from './MediaFolderTabs';

const baseStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '85vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  outline: 'none',
  overflowY: 'auto',
};

const fullscreenStyle = {
  ...baseStyle,
  width: '90vw',
  height: '90vh',
};

const MediaFolderModal = ({
  open,
  onClose,
  userId,
  projectId,
  templateId,
  selectedMedia,
  setSelectedMedia
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 12000 }}>
      <Box sx={fullscreen ? fullscreenStyle : baseStyle}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Select Media</Typography>
          <Box>
            <IconButton onClick={() => setFullscreen(!fullscreen)}>
              <ZoomOutMap />
            </IconButton>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        {/* Tabs Component */}
        <MediaFolderTabs
          userId={userId}
          projectId={projectId}
          templateId={templateId}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
        />

        {/* Done Button */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={onClose}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MediaFolderModal;
