import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProjectHeader from './components/ProjectHeader';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import useAuth from 'hooks/useAuth';

const ProjectView = () => {
  const { user, token } = useAuth();
  const [activeSection, setActiveSection] = useState('projects');

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      {/* Full Width Header */}
      <ProjectHeader userId={user?.id} username={user?.username || ''}  token={token} />

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: '240px',
            height: 'calc(100vh - 64px)', // Adjust for header height
            position: 'fixed',
            top: '64px',
            left: 0,
            bgcolor: 'background.paper',
            borderRight: '1px solid #e0e0e0',
            boxShadow: 1,
            zIndex: 1000,
          }}
        >
          <Sidebar setActiveSection={setActiveSection} />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            ml: '240px', // Offset for Sidebar width
            mt: '64px', // Offset for header height
            p: 3,
            overflowY: 'auto',
          }}
        >
          <MainContent
            activeSection={activeSection}
            username={user?.username}
            token={token}
            userId={user?.id} // Pass userId to MainContent
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectView;
