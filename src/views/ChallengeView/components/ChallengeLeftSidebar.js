import React from 'react';
import { Box, Card, Avatar, Typography, Stack } from '@mui/material';
import ProfileCard from '../../CommunityView/components/ProfileCard';
import SidebarFooter from './SidebarFooter';

const menuItems = [
  { label: 'Hackathons', icon: '/icons/pages/competing.png', tabIndex: 0 },
  { label: 'Challenges', icon: '/icons/pages/question.png', tabIndex: 1 },
  { label: 'Practice', icon: '/icons/pages/programming.png', tabIndex: 2 }
];

const ChallengeLeftSidebar = ({ user, selectedTab, setSelectedTab, visibilityFilter, setVisibilityFilter }) => (
  <Box display="flex" flexDirection="column" height="100%">
    <Box p={2} pt={10} flexGrow={1}>
      <ProfileCard />

      <Card sx={{ mt: 2, p: 2 }}>
        <Stack spacing={2}>
          {menuItems.map((item, index) => (
            <Box
              key={index}
              onClick={() => setSelectedTab(item.tabIndex)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: selectedTab === item.tabIndex ? '#f0f0f0' : 'transparent',
                borderRadius: 1,
                px: 1.5,
                py: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <Avatar src={item.icon} sx={{ width: 28, height: 28, mr: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Card>
    </Box>

    <SidebarFooter visibilityFilter={visibilityFilter} setVisibilityFilter={setVisibilityFilter} />
  </Box>
);

export default ChallengeLeftSidebar;
