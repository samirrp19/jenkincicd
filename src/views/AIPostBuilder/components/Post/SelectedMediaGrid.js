import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const SelectedMediaGrid = ({ media = [], onClickImage, onReset, onAdd }) => {
  const [openVideo, setOpenVideo] = useState(null);

  if (!media?.length) return null;

  const getType = (item) => {
    const url = item.url || item.s3Url || '';
    return item.type || (url.endsWith('.webm') || url.endsWith('.mp4') ? 'video' : 'image');
  };

  const handleOpenVideo = (item) => setOpenVideo(item);
  const handleCloseVideo = () => setOpenVideo(null);

  return (
    <Box
      sx={{
        mt: 2,
        border: '1px solid #ddd',
        p: 2,
        borderRadius: 2,
        bgcolor: '#fafafa',
        position: 'relative',
      }}
    >
      <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, mb: 1 }}>
        Selected Media
      </Typography>

      <Grid container spacing={1}>
        {media.map((item, index) => {
          const url = item.url || item.s3Url;
          const type = getType(item);

          return (
            <Grid item xs={6} key={index}>
              <Box
                sx={{
                  width: '100%',
                  height: 160,
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  '&:hover': { boxShadow: 3 },
                  cursor: 'pointer',
                }}
                onClick={() =>
                  type === 'video' ? handleOpenVideo(item) : onClickImage(index)
                }
              >
                {type === 'video' ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${item.youtubeId || ''}/0.jpg`} // fallback or thumbnail logic
                      alt={`video-thumb-${index}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                    <PlayCircleOutlineIcon
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: 40,
                        color: '#ffffffcc',
                      }}
                    />
                  </>
                ) : (
                  <img
                    src={url}
                    alt={`media-${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" size="small" onClick={onAdd}>
          Add
        </Button>
      </Box>

      <IconButton
        onClick={onReset}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: '#fff',
          border: '1px solid #ccc',
          '&:hover': { bgcolor: '#f5f5f5' },
        }}
      >
        <Close fontSize="small" />
      </IconButton>

      {/* Video Modal */}
      <Dialog
        open={!!openVideo}
        onClose={handleCloseVideo}
        maxWidth="md"
        fullWidth
        sx={{
          zIndex: 11000, // ensure it's higher than CreatePost modal
          '& .MuiDialog-paper': {
            m: 0,
            borderRadius: 0,
          },
        }}
        BackdropProps={{
          sx: { zIndex: 10990 }, // backdrop just behind dialog
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {openVideo && (
            <ReactPlayer
              url={openVideo.url || openVideo.s3Url}
              controls
              playing
              width="100%"
              height="100%"
              style={{ position: 'relative', zIndex: 11001 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SelectedMediaGrid;
