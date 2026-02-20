import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton, Paper } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfileCard = ({ profilePicture, name, email }) => {
  const { token, user } = useAuth();
  const [picture, setPicture] = useState(profilePicture);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const { data } = await axios.put(
        `${apiUrl}/api/users/${user.username}/profile-picture`,
        formData,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.profilePicture) {
        setPicture(data.profilePicture);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        mb: 3,
        bgcolor: "#ffffff",
        position: "relative",
        minHeight: 280, // 🔥 add this so Paper is tall enough
      }}
    >
      {/* Background Banner */}
      <Box
        sx={{
          width: "100%",
          height: 140,
          background: "linear-gradient(135deg, #cfd8dc, #eceff1)",
        }}
      />

      {/* Avatar + Info */}
      <Box
        sx={{
          position: "absolute",
          top: 90, // moved slightly lower
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Avatar */}
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={picture}
            alt={name}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid white",
              bgcolor: "#e0e0e0",
            }}
          />
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: -4,
              right: -4,
              backgroundColor: "#1976d2",
              color: "#ffffff",
              width: 28,
              height: 28,
              border: "2px solid white",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            <CameraAltIcon sx={{ fontSize: 16 }} />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </IconButton>
        </Box>

        {/* Name */}
        <Typography
          variant="h6"
          fontWeight={600}
          mt={2}
          sx={{ textAlign: "center" }}
        >
          {name}
        </Typography>

        {/* Email */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            maxWidth: "240px",
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          {email}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProfileCard;
