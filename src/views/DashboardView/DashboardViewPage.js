import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from 'components/Header';
import useAuth from 'hooks/useAuth';  // Assuming you're using a hook for auth

const DashboardViewPage = () => {
  const { user, token } = useAuth(); // Fetching username and token from auth hook
  const [activeSection, setActiveSection] = useState('projects'); // Default section to 'projects'

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      {/* Full Width Header */}
      <Header />

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Sidebar - Fixed Position */}
        <Box
          sx={{
            width: '240px',
            height: 'calc(100vh - 64px)', // Sidebar takes full height minus header height
            position: 'fixed', // Keep sidebar fixed
            top: '64px', // Ensure it is placed below the header
            left: 0,
            bgcolor: 'background.paper',
            boxShadow: 1,
            zIndex: 1000, // Ensure it stays above the content
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto', // Enable scrolling if content exceeds the viewport height
          }}
        >
          <Sidebar setActiveSection={setActiveSection} /> {/* Pass setActiveSection to Sidebar */}
        </Box>

        {/* Main Content - Push it to the right of the Sidebar */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            ml: '240px', // Give margin to compensate for fixed Sidebar width
            p: 3,
          }}
        >
          <MainContent activeSection={activeSection} username={user?.username} token={token} />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardViewPage;
