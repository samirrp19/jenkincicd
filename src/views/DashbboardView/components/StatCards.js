import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const stats = [
  {
    label: 'Projects Created',
    value: 24,
    icon: <AssignmentIcon sx={{ fontSize: 30, color: '#FFB020' }} />,
    bgColor: '#FFF7E8',
  },
  {
    label: 'Projects by Languages',
    value: 5,
    icon: <FolderIcon sx={{ fontSize: 30, color: '#00C49F' }} />,
    bgColor: '#E9FAF1',
  },
  {
    label: 'Post Views',
    value: 1056,
    icon: <VisibilityIcon sx={{ fontSize: 30, color: '#B388FF' }} />,
    bgColor: '#F3E8FF',
  },
];

const StatCards = ( {username} ) => {
  return (
    <Box>
      {/* Welcome Header */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          Hi,  {username || "User"} <EmojiEmotionsIcon sx={{ fontSize: 28, color: '#FFC107' }} />
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={0.5}>
          Usage stats!
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 1,
                bgcolor: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
                p: 2,
                height: '100%',
              }}
            >
              {/* Icon Background Box */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 48,
                  height: 48,
                  bgcolor: stat.bgColor,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </Box>

              <CardContent sx={{ pt: 6 }}>
                <Typography variant="h4" fontWeight="bold" mb={0.5}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatCards;
