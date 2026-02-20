import React from 'react';
import { Box, Tabs, Tab, InputBase, Divider, Typography, List, ListItem, ListItemText, ListItemIcon, Radio } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const LeftSidebar = () => {
  return (
    <Box sx={{ width: 300, p: 3, bgcolor: 'background.paper', boxShadow: 3 }}>
      {/* Search Box */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SearchIcon sx={{ mr: 1 }} />
        <InputBase placeholder="Search Problems" fullWidth />
      </Box>

      {/* Tabs for Recommended and Custom */}
      <Tabs value={0} aria-label="Sidebar Tabs">
        <Tab label="Recommended" />
        <Tab label="Custom" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      {/* Popular Topics and Tags */}
      <Tabs value={0} aria-label="Topic Tabs">
        <Tab label="Popular Topics" />
        <Tab label="Tags" />
      </Tabs>

      <List>
        <ListItem>
          <ListItemIcon>
            <Radio />
          </ListItemIcon>
          <ListItemText primary="Basic Programming" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Radio />
          </ListItemIcon>
          <ListItemText primary="Arrays" />
        </ListItem>
        {/* Add more items as needed */}
      </List>
    </Box>
  );
};

export default LeftSidebar;
