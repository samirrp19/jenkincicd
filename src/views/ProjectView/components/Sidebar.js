import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';

const Sidebar = ({ setActiveSection }) => {
  return (
    <Box sx={{ width: '240px', height: '100%', bgcolor: 'background.paper', boxShadow: 1 }}>
      <Typography variant="h6" sx={{ padding: 2 }}>
        DEVBOX
      </Typography>
      <List>
        <ListItem button onClick={() => setActiveSection('projects')}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button onClick={() => setActiveSection('prompts')}>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="Prompts" />
        </ListItem>
        <ListItem button onClick={() => setActiveSection('documents')}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Documents" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default Sidebar;
