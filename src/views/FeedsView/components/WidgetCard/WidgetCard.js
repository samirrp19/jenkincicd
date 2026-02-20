import React, { useState } from 'react';
import { Grid, Card, CardContent, Box, Tooltip, IconButton, useTheme } from '@mui/material';
import { ReactComponent as StoreIcon } from '../../../../assets/icons/svg/web-code-editor.svg';
import { ReactComponent as DashboardIcon } from '../../../../assets/icons/svg/dashboard.svg';
import { ReactComponent as ProjectIcon } from '../../../../assets/icons/svg/project.svg';
import { ReactComponent as PreferencesIcon } from '../../../../assets/icons/svg/preferences.svg';
import { ReactComponent as GroupConnectIcon } from '../../../../assets/icons/svg/group-connect.svg';
import { ReactComponent as ChallengesIcon } from '../../../../assets/icons/svg/challenges.svg';
import PreferencesModal from './PreferencesModal'; // Import the Preferences Modal
import useAuth from 'hooks/useAuth';  // Assuming you have a useAuth hook

const iconData = [
  { icon: <DashboardIcon width={30} height={30} />, label: 'Dashboard', link: '/dashboard' },
  { icon: <ProjectIcon width={40} height={40} />, label: 'Projects', link: '/projects' },
  { icon: <GroupConnectIcon width={40} height={40} />, label: 'Live', link: '/live' },
  { icon: <StoreIcon width={40} height={40} />, label: 'Store', link: '/store' },
  { icon: <ChallengesIcon width={40} height={40} />, label: 'Challenges', link: '/challenges' },
  { icon: <PreferencesIcon width={40} height={40} />, label: 'Preferences', link: null }, // Remove link for Preferences
];

const WidgetCard = () => {
  const theme = useTheme();
  const { user } = useAuth(); // Extract the username from the authentication hook
  const username = user ? user.username : null; // Get the username
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control Preferences Modal

  // Function to handle icon click
  const handleIconClick = (link, label) => {
    if (label === 'Preferences') {
      setIsModalOpen(true); // Open the Preferences Modal when Preferences is clicked
    } else if (link) {
      // Replace /project with the username/project if it's the Web Editor icon
      if (link === '/store' && username) {
        window.location.assign(`/${username}${link}`);  // Open in a new tab
      } else if (link === '/challenges' && username) {
        window.location.assign(`/${username}${link}`);
      } else if (link === '/dashboard' && username) {
        window.open(`/${username}${link}`, '_blank');
      } else if (link === '/live' && username) {
        window.location.assign(`/${username}${link}`);
      } else if (link === '/projects' && username) {
        window.location.assign(`/${username}${link}`);
      } else {
        window.open(link, '_blank'); // For other icons, just open the link
      }
    }
  };

  // Function to handle closing of the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default, 
        color: theme.palette.text.primary,
        borderRadius: 2, // Rounded corners for the tray
        padding: 2, // Padding inside the tray
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for a material effect
      }}
    >
      <Grid container spacing={2}>
        {iconData.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Box display={'block'} width={1} height={1}>
              <Card
                elevation={0}
                sx={{
                  aspectRatio: '1 / 1', // Ensures the card is a square
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 1, // Padding inside each square
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                  }}
                >
                  <Tooltip title={item.label} arrow>
                    <IconButton onClick={() => handleIconClick(item.link, item.label)}>
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Preferences Modal */}
      <PreferencesModal open={isModalOpen} handleClose={handleCloseModal} />
    </Box>
  );
};

export default WidgetCard;
