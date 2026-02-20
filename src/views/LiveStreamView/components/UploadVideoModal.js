import React, { useState, useRef } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';

const UploadVideoModal = ({ show, handleClose, handleUpload, username, token }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [subtitle, setSubtitle] = useState(null); 
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const subtitleInputRef = useRef(null);

  const triggerFileInput = () => fileInputRef.current.click();
  const triggerSubtitleInput = () => subtitleInputRef.current.click();

  const handleFileSelection = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleSubtitleSelection = (e) => {
    const selectedSubtitle = e.target.files[0];
    if (selectedSubtitle) {
      setSubtitle(selectedSubtitle);
    }
  };

  const handleUploadToVideoStore = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    if (subtitle) formData.append('subtitle', subtitle);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/videos/${username}/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });

      const uploadedVideo = {
        videoName: response.data.video.videoName || fileName,
        mimeType: response.data.video.mimeType,
        videoUrl: response.data.video.videoUrl,
        thumbnailUrl: response.data.video.thumbnailUrl,
        subtitleUrl: response.data.video.subtitleUrl, 
        uploadedAt: response.data.video.uploadedAt,
      };

      handleUpload(uploadedVideo);
      setFileName('');
      setFile(null);
      setSubtitle(null);
      setUploading(false);
      handleClose();
    } catch (error) {
      console.error('Error uploading the video:', error);
      setUploading(false);
      handleUpload(null);
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload Video</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Button variant="contained" color="primary" startIcon={<FaUpload />} onClick={triggerFileInput}>
            Upload Video
          </Button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelection} accept="video/*" />
        </Box>
        {fileName && <Typography align="center">Selected Video: {fileName}</Typography>}
        
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="secondary" startIcon={<FaUpload />} onClick={triggerSubtitleInput}>
            Upload Subtitle
          </Button>
          <input type="file" ref={subtitleInputRef} style={{ display: 'none' }} onChange={handleSubtitleSelection} accept=".vtt,.srt" />
        </Box>
        {subtitle && <Typography align="center">Selected Subtitle: {subtitle.name}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleUploadToVideoStore} color="primary" disabled={!fileName || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadVideoModal;
