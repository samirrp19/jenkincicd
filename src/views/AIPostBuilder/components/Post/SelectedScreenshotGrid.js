import React from 'react';
import { Box, Typography, IconButton, Grid, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

const SelectedScreenshotGrid = ({ screenshots, onClickImage, onReset, onAdd }) => {
  if (!screenshots?.length) return null;

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
        Selected Screenshots
      </Typography>

      <Grid container spacing={1}>
        {screenshots.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Box
              sx={{
                width: '100%',
                height: 120,
                border: '1px solid #ccc',
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 3,
                },
              }}
              onClick={() => onClickImage(index)}
            >
              <img
                src={item.url}
                alt={`screenshot-${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>
        ))}
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
    </Box>
  );
};

export default SelectedScreenshotGrid;
