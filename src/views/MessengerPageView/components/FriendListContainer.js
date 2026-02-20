import React, { useEffect, useState } from 'react';
import {
  Box, Avatar, Typography, Tooltip, IconButton
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const FriendListContainer = ({ isSidebarOpen, token, username, onSelectUser, onInitiateCall }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${username}/friends`, {
          headers: { 'x-auth-token': token },
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [username, token]);

  return (
    <Box sx={{ maxHeight: '160px', overflowY: 'auto', px: 1 }}>
      {friends.map((friend, index) => (
        <Tooltip title={friend.name || friend.username} key={index} placement="right">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              mb: 1,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            <Box
              onClick={() => onSelectUser && onSelectUser(friend)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                flexGrow: 1
              }}
            >
              <Avatar
                alt={friend.name}
                src={friend.profilePic || `https://via.placeholder.com/40?text=${friend.username[0]}`}
              />
              {isSidebarOpen && (
                <Typography variant="body2" noWrap>
                  {friend.name || friend.username}
                </Typography>
              )}
            </Box>

            {/* Call buttons */}
            <Box>
              <Tooltip title="Audio Call">
                <IconButton
                  size="small"
                  onClick={() => onInitiateCall(friend, 'audio')}
                >
                  <CallIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Video Call">
                <IconButton
                  size="small"
                  onClick={() => onInitiateCall(friend, 'video')}
                >
                  <VideoCallIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default FriendListContainer;
