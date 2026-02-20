import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Avatar, Card, CardContent, Divider, Button, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProfileCard = ({ user, token }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: theme.palette.background.paper, // Use theme for background color
        color: theme.palette.text.primary, // Use theme for text color
        maxWidth: 300,
        mx: 'auto',
      }}
    >
      <CardContent>
        {/* Profile Avatar */}
        <Box display="flex" justifyContent="center">
          <Avatar
            src={user.avatar || 'https://via.placeholder.com/150'}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
        </Box>

        {/* Name and Role */}
        <Typography variant="h6" align="center" gutterBottom>
          {user.name || 'Full Name'}
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          {user.username || 'Username'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {user.role || 'Student'}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Profile Viewers and Analytics */}
        <Typography variant="body2" align="center">
          Profile viewers{' '}
          <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>
            13
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link href="#" underline="hover">
            View all analytics
          </Link>
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Premium Offer */}
        <Typography variant="body2" align="center">
          Strengthen your coding skills with an AI writing assistant
        </Typography>
        <RouterLink 
          to={`/${user.username}/builder?token=${token}`} 
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 1, fontSize: '0.9rem' }}
          >
            Portfolio Builder Application
          </Button>
        </RouterLink>

        <Divider sx={{ my: 2 }} />

        {/* Saved Items */}
        <Typography variant="body2" color="text.secondary" align="center">
          <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>
            Saved items
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
