import React, { useEffect, useState } from "react";
import { Box, Paper, Avatar, Typography } from "@mui/material";
import useAuth from "hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <<< Added

const api_url = process.env.REACT_APP_API_URL;

const ProfileCard = () => {
  const { user, token } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate(); // <<< Added

  useEffect(() => {
    if (user?.username && token) {
      axios
        .get(`${api_url}/api/users/${user.username}/profile`, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          const pic = res.data.user?.profilePicture;
          if (pic) {
            setProfilePic(pic);
          }
        })
        .catch((err) => {
          console.error("Error fetching community profile picture:", err);
        });
    }
  }, [token, user?.username]);

  const handleAvatarClick = () => {
    if (user?.username) {
      navigate(`/${user.username}/profile`); // <<< Navigate to /username/profile
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "12px",
        bgcolor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 1,
      }}
    >
      {/* Avatar clickable */}
      <Avatar
        src={profilePic || undefined}
        sx={{ width: 64, height: 64, cursor: "pointer" }} // <<< Added cursor
        onClick={handleAvatarClick} // <<< Added onClick
      >
        {(!profilePic && user?.name) ? user.name[0] : null}
      </Avatar>

      <Typography variant="subtitle1" fontWeight={600} mt={1}>
        {user?.name || "Admin User"}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Solutions Architect
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Profile viewers: 20
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProfileCard;
