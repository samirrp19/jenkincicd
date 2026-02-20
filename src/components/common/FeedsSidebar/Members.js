import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, Avatar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const Members = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState(new Set());
  const [friendRequests, setFriendRequests] = useState(new Set());

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/members`, {
          headers: { "x-auth-token": token },
        });
        const filteredUsers = response.data.filter(u => u.username !== user.username);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${user.username}/friends`, {
          headers: { "x-auth-token": token },
        });
        setFriends(new Set(response.data.map(friend => friend._id)));
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${user.username}/friend-requests`, {
          headers: { "x-auth-token": token },
        });
        setFriendRequests(new Set(response.data.map(request => request._id)));
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchUsers();
    fetchFriends();
    fetchFriendRequests();
  }, [token, user]);

  const handleAddFriend = async (friendUsername) => {
    try {
      await axios.post(`${apiUrl}/api/users/${user.username}/add-friend/${friendUsername}`, {}, {
        headers: { "x-auth-token": token },
      });
      setFriends(new Set([...friends, friendUsername]));
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleConfirmFriend = async (friendUsername) => {
    try {
      await axios.post(`${apiUrl}/api/users/${user.username}/confirm-friend/${friendUsername}`, {}, {
        headers: { "x-auth-token": token },
      });
      setFriends(new Set([...friends, friendUsername]));
      setFriendRequests(new Set([...friendRequests].filter(id => id !== friendUsername)));
    } catch (error) {
      console.error("Error confirming friend request:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Members
          </Typography>
          <Grid container spacing={2}>
            {users.map((userItem) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={userItem._id}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar src={userItem.profilePicture} sx={{ width: 80, height: 80, margin: "auto" }} />
                    <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                      {userItem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userItem.mutualFriends} mutual friends
                    </Typography>
                    {friendRequests.has(userItem._id) ? (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => handleConfirmFriend(userItem.username)}
                      >
                        Confirm
                      </Button>
                    ) : !friends.has(userItem._id) ? (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => handleAddFriend(userItem.username)}
                      >
                        Add Friend
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Members;
