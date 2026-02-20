import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const JoinUs = () => {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#0b0f19",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundImage: 'url(joinUs.jpg)', // ✅ wrapped with url()
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "75%",
          borderRadius: "10px",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            color: "#ffffff",
            mb: 2,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          Use Learntute AI to deliver code <br />
          incredibly faster
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: "#ffffff",
            opacity: 0.8,
            mb: 4,
            fontSize: { xs: "1rem", md: "1.2rem" },
          }}
        >
          Join thousands of developers who are using <br />
          Learntute to boost their development
        </Typography>

        {/* Try for Free Button */}
        <Button
          variant="contained"
          component={RouterLink}
          to="/register"
          sx={{
            backgroundColor: "#8b5cf6",
            fontWeight: "600",
            borderRadius: "25px",
            textTransform: "none",
            fontSize: "1rem",
            padding: "12px 24px",
          }}
        >
          Try For Free →
        </Button>
      </Box>
    </Box>
  );
};

export default JoinUs;
