import React from 'react';
import {
  Modal, Box, Typography, Avatar, IconButton, Grid
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ReactPlayer from 'react-player';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const PostPreviewModal = ({
  open,
  onClose,
  description,
  screenshots = [],
  recordings = [],
  audienceLabel,
  taggedUsers = [],
}) => {
  const media = [...screenshots, ...recordings];
  const maxVisible = 5;
  const extraCount = media.length - maxVisible;

  const renderMedia = (item, index) => {
    const isVideo = item.url?.endsWith('.mp4') || item.url?.endsWith('.webm');
    const url = item.url || item.s3Url;
    const isLast = index === maxVisible - 1 && extraCount > 0;

    return (
      <Grid item xs={4} key={index} sx={{ position: 'relative' }}>
        <Box
          sx={{
            width: '100%',
            paddingTop: '75%',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #ddd',
            position: 'relative',
          }}
        >
          {isVideo ? (
            <ReactPlayer
              url={url}
              controls
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: 8,
              }}
            />
          ) : (
            <img
              src={url}
              alt={`media-${index}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}

          {isLast && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0,0,0,0.6)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              +{extraCount}
            </Box>
          )}
        </Box>
      </Grid>
    );
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 15000 }}>
      <Box sx={style}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Post Preview</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }} />
          <Box>
            <Typography fontWeight={500}>Your Name</Typography>
            <Typography variant="caption" color="text.secondary">{audienceLabel}</Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography sx={{ mb: 2 }}>{description}</Typography>

        {/* Media Grid */}
        {media.length > 0 && (
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {media.slice(0, maxVisible).map(renderMedia)}
          </Grid>
        )}

        {/* Tagged Users */}
        {taggedUsers.length > 0 && (
          <Typography variant="caption" color="text.secondary">
            With: {taggedUsers.join(', ')}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default PostPreviewModal;
