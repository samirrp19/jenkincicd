import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import ReactPlayer from 'react-player';
import CloseIcon from '@mui/icons-material/Close';

const VideoPlayerModal = ({ show, handleClose, videoUrl, videoName, subtitleUrl }) => {
  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        {videoName}
        <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ReactPlayer 
          url={videoUrl} 
          controls 
          width="100%" 
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous',
                controlsList: 'nodownload',
                disablePictureInPicture: true,
              },
              tracks: subtitleUrl ? [{ kind: 'subtitles', src: subtitleUrl, srcLang: 'en', default: true }] : [],
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
