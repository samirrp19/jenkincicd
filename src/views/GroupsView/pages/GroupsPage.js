import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Tabs, Tab } from '@mui/material';
import GroupSidebar from '../components/GroupSidebar';
import GroupCard from '../components/GroupCard';

const apiUrl = process.env.REACT_APP_API_URL;

const GroupsPage = ({ token, username }) => {
  const [groups, setGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('yourGroups');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/groups/${username}/groups`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, [username, token]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 10 }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <GroupSidebar username={username} />
        </Grid>

        {/* Main content */}
        <Grid item xs={12} md={9}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Your Groups" value="yourGroups" />
          </Tabs>

          {/* Tab content */}
          <Box sx={{ mt: 3 }}>
            {activeTab === 'yourGroups' && (
              <Grid container spacing={3}>
                {groups.map((group) => (
                  <Grid item key={group._id} xs={12} sm={6} md={4}>
                    <GroupCard group={group} username={username} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroupsPage;
