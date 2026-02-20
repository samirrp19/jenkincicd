import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Tabs, Tab, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GroupCard = ({ group }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleCardClick = () => {
    navigate(`/${group.createdBy.username}/groups/${group._id}`);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Card
      sx={{
        width: 300,
        cursor: 'pointer',
        mb: 3,
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="150"
        image={group.image || 'https://via.placeholder.com/150'}
        alt={group.name}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {group.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Members: {group.members.length}
        </Typography>

        {/* Tabs Section */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mt: 2 }}
        >
          <Tab label="About" />
          <Tab label="Posts" />
          <Tab label="Members" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Typography variant="body2">{group.about}</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Typography variant="body2">Group posts will be displayed here.</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <ul>
            {group.members.map((member) => (
              <li key={member.member?._id || member._id}>
                {member.member?.username || 'Unknown'}
              </li>
            ))}
          </ul>
        </TabPanel>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click event
            // Handle Join Group action here
          }}
        >
          Join Group
        </Button>
      </CardContent>
    </Card>
  );
};

// TabPanel component for handling the tab content
const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default GroupCard;
