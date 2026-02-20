import React from 'react';
import { styled } from '@mui/system';
import { Avatar, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Paper, Grid, Card, CardContent, IconButton } from '@mui/material';
import { FaHome, FaUser, FaCog, FaBell, FaEnvelope, FaPen, FaHeart } from 'react-icons/fa';

const ProfileContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const Header = styled('header')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const MainContent = styled('main')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
}));

const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ProfilePage = () => {
  const [activeItem, setActiveItem] = React.useState('profile');

  const handleNavItemClick = (item) => {
    setActiveItem(item);
  };

  const navItems = [
    { icon: <FaHome />, text: 'Home', value: 'home' },
    { icon: <FaUser />, text: 'Profile', value: 'profile' },
    { icon: <FaCog />, text: 'Settings', value: 'settings' },
    { icon: <FaBell />, text: 'Notifications', value: 'notifications' },
    { icon: <FaEnvelope />, text: 'Messages', value: 'messages' },
  ];

  return (
    <ProfileContainer>
      <Header>
        <Typography variant="h4">User Profile</Typography>
      </Header>
      <MainContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Sidebar>
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="User Avatar"
                sx={{ width: 120, height: 120, margin: '0 auto 16px' }}
              />
              <Typography variant="h6" align="center" gutterBottom>
                Jane Doe
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary" paragraph>
                Web Developer | Coffee Lover
              </Typography>
              <List>
                {navItems.map((item) => (
                  <ListItem
                    button
                    key={item.value}
                    selected={activeItem === item.value}
                    onClick={() => handleNavItemClick(item.value)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Sidebar>
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
Profile Details
                </Typography>
                <Typography variant="body1" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaPen />}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </ProfileCard>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {['Liked a post', 'Commented on a photo', 'Shared an article'].map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <FaHeart />
                    </ListItemIcon>
                    <ListItemText primary={activity} secondary={`${index + 1} hour${index !== 0 ? 's' : ''} ago`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Sidebar>
              <Typography variant="h6" gutterBottom>
                Related Content
              </Typography>
              {['Web Development Tips', 'JavaScript Frameworks', 'CSS Tricks'].map((content, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">{content}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Follow
              </Button>
            </Sidebar>
          </Grid>
        </Grid>
      </MainContent>
    </ProfileContainer>
  );
};

export default ProfilePage;