import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import LogoComponent from 'components/LogoComponent';
import useAuth from 'hooks/useAuth'; 

const MessengerPageViewHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user ? user.username : null;

  const handleHomeClick = () => {
    if (username) {
      navigate(`/${username}/community`);
    }
  };

  const handleGroupsClick = () => {
    if (username) {
      navigate(`/${username}/groups`);
    }
  };

  const handleMessengerClick = () => {
    if (username) {
      navigate(`/${username}/messenger`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // This ensures space between left and right sections
        padding: '0 16px',
        backgroundColor: '#f0f0f0',
        height: '64px', // Same height as sidebar header
      }}
    >
      {/* Sidebar closed, logo and toggle icon should be at the start */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isSidebarOpen && (
          <LogoComponent isSidebarOpen={false} />
        )}
      </Box>

      {/* Icons in the center */}
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexGrow: 1 }}>
        <IconButton onClick={handleHomeClick}>
          <Box
            component="img"
            src="/assets/home.png"
            alt="Home"
            sx={{ width: 26, height: 26 }}
          />
        </IconButton>

        <IconButton onClick={handleGroupsClick}>
          <Box
            component="img"
            src="/assets/group.png"
            alt="Groups"
            sx={{ width: 26, height: 26 }}
          />
        </IconButton>

        <IconButton onClick={handleMessengerClick}>
          <Box
            component="img"
            src="/assets/chat.png"
            alt="Chat"
            sx={{ width: 26, height: 26 }}
          />
        </IconButton>
      </Box>

      {/* Empty box to balance the layout */}
      <Box sx={{ width: '64px' }} /> {/* This creates space so the right side aligns properly */}
    </Box>
  );
};

export default MessengerPageViewHeader;
