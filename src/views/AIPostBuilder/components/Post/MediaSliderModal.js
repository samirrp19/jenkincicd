import React, { useState } from 'react';
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Button
} from '@mui/material';
import { Close, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  outline: 'none',
  textAlign: 'center'
};

const MediaSliderModal = ({ open, onClose, items = [], startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  if (!currentItem) return null;

  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 13000 }}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            {currentItem?.name || `Screenshot ${currentIndex + 1}`}
          </Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={handlePrev}><ArrowBackIos /></IconButton>

          <Box sx={{ width: '80%', height: 400, overflow: 'hidden', borderRadius: 2 }}>
            <img
              src={currentItem.url || currentItem}
              alt={`screenshot-${currentIndex}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: 8
              }}
            />
          </Box>

          <IconButton onClick={handleNext}><ArrowForwardIos /></IconButton>
        </Box>

        <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
          {currentIndex + 1} / {items.length}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MediaSliderModal;
