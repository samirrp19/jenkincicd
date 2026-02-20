import React from "react";
import { Box, Typography } from "@mui/material";

const FavoritesPage = () => {
  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5", // Light gray background
        minHeight: "calc(100vh - 50px)", // Adjusted height considering header
      }}
    >
      {/* Content Container */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          padding: "40px",
          width: "80%",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* No Favorites Icon */}
        <img
          src="/notes_empty.png" // Ensure the icon path is correct
          alt="No Favorites"
          style={{ width: "80px", marginBottom: "16px" }}
        />

        {/* Text */}
        <Typography variant="h6" fontWeight="bold">
          No favorites present
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Favorite projects will be shown here
        </Typography>
      </Box>
    </Box>
  );
};

export default FavoritesPage;
