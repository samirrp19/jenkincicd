import React from 'react';
import {
    Container,
    Box,
    useTheme
  } from '@mui/material';
import Header from 'views/CommunityView/components/Header';
import GroupsPage from './pages/GroupsPage';
import useAuth from 'hooks/useAuth'; 


const GroupsView = () => {
  const theme = useTheme();
  const { token, user } = useAuth();

  return (
    <>
      <Box
          sx={{
            backgroundColor: theme.palette.background.default, 
            color: theme.palette.text.primary,
            height: '100vh', // Full viewport height
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // Prevent page scrolling
          }}
        >
        <Header />
        <Container
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            display: 'flex',
            height: 'calc(100vh - 56px)', // Full viewport height minus the Topbar height (assuming 56px)
            overflow: 'hidden', // Prevent the whole page from scrolling
          }}
        >
            <GroupsPage token={token} username={user?.username} />
          
        </Container>
      </Box>
    </>
  );
};

export default GroupsView;
