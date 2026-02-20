import React, { useState } from 'react';
import { Box } from '@mui/material';
import useAuth from 'hooks/useAuth';
import Header from '../CommunityView/components/Header';
import ChallengeLeftSidebar from './components/ChallengeLeftSidebar';
import ChallengeMainContent from './components/ChallengeMainContent';

const ChallengeView = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);

  const [visibilityFilter, setVisibilityFilter] = useState({
    private: true,
    public: true,
    group: true
  });

  const SIDEBAR_WIDTH = 300;
  const HEADER_HEIGHT = 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            position: 'fixed',
            top: HEADER_HEIGHT,
            bottom: 0,
            left: 0,
            bgcolor: '#f9f9f9',
            borderRight: '1px solid #ddd',
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          <ChallengeLeftSidebar
            user={user}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            visibilityFilter={visibilityFilter}
            setVisibilityFilter={setVisibilityFilter}
          />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            marginLeft: `${SIDEBAR_WIDTH}px`,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflowY: 'auto',
            pt: 10,
            px: 3,
            bgcolor: '#fff'
          }}
        >
          <ChallengeMainContent selectedTab={selectedTab} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChallengeView;
