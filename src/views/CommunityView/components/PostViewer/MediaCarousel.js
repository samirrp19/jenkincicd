import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ReactPlayer from 'react-player';

const MediaCarousel = ({ screenshots = [], recordings = [] }) => {
  const media = [
    ...screenshots.map((item) =>
      typeof item === 'string' ? { url: item, type: 'image' } : { ...item, type: 'image' }
    ),
    ...recordings.map((item) =>
      typeof item === 'string' ? { url: item, type: 'video' } : { ...item, type: 'video' }
    ),
  ];

  const [index, setIndex] = useState(0);
  const total = media.length;

  if (total === 0) return null;

  const handlePrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setIndex((prev) => (prev + 1) % total);

  const { url, type } = media[index];

  return (
    <Box sx={{ position: 'relative', width: '100%', mb: 3 }}>
      <Box
        sx={{
          width: '100%',
          height: { xs: 300, md: 500 },
          backgroundColor: '#000',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {type === 'video' ? (
          <ReactPlayer url={url} controls width="100%" height="100%" />
        ) : (
            <img
            src={url}
            alt="media"
            onLoad={() => console.log('✅ Image loaded:', url)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              cursor: 'zoom-in',
            }}
            onClick={() => window.open(url, '_blank')}
          />
          
        )}

        {total > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 10,
                color: '#fff',
                transform: 'translateY(-50%)',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
            >
              <ChevronLeft fontSize="large" />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 10,
                color: '#fff',
                transform: 'translateY(-50%)',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
            >
              <ChevronRight fontSize="large" />
            </IconButton>
          </>
        )}
      </Box>
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 16,
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.5)',
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          fontWeight: 500,
        }}
      >
       {index + 1} / {total}
     </Typography>

    </Box>
  );
};

export default MediaCarousel;
