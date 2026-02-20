import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const ProfilePage = () => {
  return (
    <Box sx={{ p: 3, width: "100%", textAlign: "center" }}>
      <Avatar sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }}>P</Avatar>
      <Typography variant="h5" fontWeight="bold">User Profile</Typography>
      <Typography sx={{ mt: 2 }}>Profile details will appear here.</Typography>
    </Box>
  );
};

export default ProfilePage;
