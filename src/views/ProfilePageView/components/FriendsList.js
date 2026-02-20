import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FriendsList = ({ friends }) => {
  const navigate = useNavigate();

  const handleMessageClick = (friendUsername) => {
    navigate(`/messenger/${friendUsername}`);
  };

  if (!friends || friends.length === 0) {
    return (
      <Box>
        <Typography variant="h6" mb={2}>
          Friends
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No friends to show.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Friends
      </Typography>

      <Grid container spacing={2}>
        {friends.map((friend) => (
          <Grid item xs={12} sm={6} md={4} key={friend._id}>
            <Card
              sx={{
                borderRadius: 3,
                textAlign: "center",
                p: 2,
                height: "100%",
              }}
            >
              <CardContent>
                <Avatar
                  src={friend.profilePicture || undefined}
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "auto",
                    mb: 1,
                  }}
                >
                  {!friend.profilePicture && friend.name?.[0]}
                </Avatar>

                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {friend.name}
                </Typography>

                {/* Message Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => handleMessageClick(friend.username)}
                >
                  Message
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FriendsList;
