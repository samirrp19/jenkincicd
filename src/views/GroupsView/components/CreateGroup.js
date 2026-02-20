import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const CreateGroup = ({ token, username }) => {
  const [groupName, setGroupName] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [members, setMembers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [groupImage, setGroupImage] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${username}/friends`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [token, username]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${apiUrl}/api/groups/create`,
        { name: groupName, privacy, members, image: groupImage },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate(`/${username}/groups`);
      }, 2000);
    } catch (error) {
      setError('Error creating group. Please try again.');
    }
  };

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Group created successfully!</Alert>}

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <h3>Create Group</h3>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Group Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Privacy</InputLabel>
              <Select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                label="Privacy"
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Invite Friends</InputLabel>
              <Select
                multiple
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                input={<OutlinedInput label="Invite Friends" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => {
                      const friend = friends.find((friend) => friend._id === id);
                      return <Chip key={id} label={friend?.username || 'Unknown'} />;
                    })}
                  </Box>
                )}
              >
                {friends.map((friend) => (
                  <MenuItem key={friend._id} value={friend._id}>
                    {friend.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Group Image URL"
              fullWidth
              margin="normal"
              variant="outlined"
              value={groupImage}
              onChange={(e) => setGroupImage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateGroup}
              sx={{ mt: 2 }}
            >
              Create Group
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <h3>Group Preview</h3>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={groupImage || 'https://via.placeholder.com/150'}
              alt="Group"
              style={{ width: '150px', borderRadius: '50%' }}
            />
            <h4>{groupName}</h4>
            <p>Members: {members.length}</p>
            <p>Privacy: {privacy}</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateGroup;
