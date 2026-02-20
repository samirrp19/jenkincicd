import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';

const GroupSidebar = () => {
  const { username } = useParams();

  return (
    <Box>
      <TextField
        variant="outlined"
        label="Search Groups"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/${username}/groups/create`}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        Create Group
      </Button>
      <List component="nav">
        <ListItem button component={Link} to={`/${username}/groups`}>
          <ListItemText primary="Your Groups" />
        </ListItem>
      </List>
    </Box>
  );
};

export default GroupSidebar;
