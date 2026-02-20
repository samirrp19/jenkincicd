import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import MediaCarousel from './MediaCarousel';

const ViewerMainContent = ({ post, hasCodeAccess = false }) => {
  const {
    title,
    description,
    screenshots = [],
    recordings = [],
    tags = [],
  } = post;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          {title}
        </Typography>

        {description && (
          <Typography variant="body1" color="text.secondary" mb={2}>
            {description}
          </Typography>
        )}

        <MediaCarousel
          screenshots={screenshots}
          recordings={recordings}
          hasCodeAccess={hasCodeAccess}
        />
      </Box>

      {/* Fixed tags at bottom */}
      {tags.length > 0 && (
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: '1px solid #eee',
            bgcolor: 'background.paper',
            position: 'sticky',
            bottom: 0,
          }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tags.map((tag, idx) => (
              <Chip key={idx} label={`#${tag}`} variant="outlined" />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ViewerMainContent;
