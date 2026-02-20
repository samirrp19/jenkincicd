import React from 'react';
import { Avatar, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GroupDetailsSidebar = ({ group }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Avatar
        src={group.image || 'https://via.placeholder.com/150'}
        alt={group.name}
        sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
      />
      <Typography variant="h5" align="center" gutterBottom>
        {group.name}
      </Typography>

      <List>
        <ListItemButton onClick={() => handleNavigation(`/groups/${group._id}/about`)}>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigation(`/groups/${group._id}/posts`)}>
          <ListItemText primary="Posts" />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigation(`/groups/${group._id}/members`)}>
          <ListItemText primary="Members" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default GroupDetailsSidebar;
