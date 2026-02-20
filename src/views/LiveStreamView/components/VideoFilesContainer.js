import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Grid, IconButton, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import UploadVideoModal from './UploadVideoModal';

const VideoFilesContainer = ({ videos, onVideoClick, onDelete, username, token }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleDeleteIconClick = (video) => {
    setSelectedVideo(video);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDelete = async () => {
    if (!selectedVideo) return;
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/videos/${username}/videos/${selectedVideo._id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      if (response.status === 200) {
        onDelete(selectedVideo._id);
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error('Error deleting the video:', error);
      alert('Failed to delete the video. Please try again.');
    }
  };

  const handleUploadModalClose = () => setShowUploadModal(false);

  const handleUploadModalShow = () => setShowUploadModal(true);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<UploadIcon />} onClick={handleUploadModalShow} color="primary">
          Upload Video
        </Button>
      </Box>

      <Grid container spacing={3}>
        {videos.map((video, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={video.thumbnailUrl}
                alt={video.videoName}
                sx={{ cursor: 'pointer' }}
                onClick={() => onVideoClick(video)}
              />
              <CardContent>
                <Typography variant="h6" component="div">{video.videoName}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="delete" onClick={() => handleDeleteIconClick(video)} sx={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedVideo && (
        <DeleteConfirmationModal show={showDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} videoName={selectedVideo.videoName} />
      )}

      <UploadVideoModal show={showUploadModal} handleClose={handleUploadModalClose} handleUpload={(uploadedVideo) => { /* Handle upload logic */ }} username={username} token={token} />
    </>
  );
};

export default VideoFilesContainer;
