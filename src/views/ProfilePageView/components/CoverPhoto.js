import React from "react";
import { Box, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const CoverPhoto = ({ coverUrl }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 180, md: 280 },
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      }}
    >
      <img
        src={coverUrl || "/default-cover.jpg"}
        alt="Cover"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Optional: Add an edit button on the cover */}
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "rgba(255,255,255,0.8)",
          '&:hover': { backgroundColor: "rgba(255,255,255,1)" }
        }}
      >
        <CameraAltIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CoverPhoto;