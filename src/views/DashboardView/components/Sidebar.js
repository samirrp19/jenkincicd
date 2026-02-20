import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import RecentIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import HelpIcon from '@mui/icons-material/Help';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';

const Sidebar = ({ setActiveSection }) => {
  return (
    <Box sx={{ width: '240px', height: '100%', overflowY: 'auto', flexGrow: 1 }}>
      {/* DEVBOX Section */}
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
        <ListItem button onClick={() => setActiveSection('posts')}>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button onClick={() => setActiveSection('templates')}>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItem>
      </List>

      <Divider />

      {/* EXTRAS Section */}
      <Typography variant="h6" sx={{ padding: 2 }}>
        EXTRAS
      </Typography>
      <List>
        <ListItem button>
          <ListItemIcon>
            <RecentIcon />
          </ListItemIcon>
          <ListItemText primary="Recent" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Invite Members" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Get Started" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <UpgradeIcon />
          </ListItemIcon>
          <ListItemText primary="Upgrade" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
