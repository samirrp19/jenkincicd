import React, { useState } from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";

const Hero = () => {
  const defaultImage = "LEARNTUTE LOGO.jpg"; // Default image
  const [hoverImage, setHoverImage] = useState(defaultImage);

  const handleHover = (image) => {
    setHoverImage(image || defaultImage);
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", color: "#000", minHeight: "100vh", p: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Turn your ideas into apps with AI.
            </Typography>
            <Typography variant="h6" gutterBottom>
              What do you want to create?
            </Typography>
            <Box mt={3}>
              {[
                { text: "🚀 A website for my dream business", img: "earth.jpg" },
                { text: "📊 A habit tracker to reach my goals", img: "dance_floor.png" },
                { text: "🎓 An educational app for my kids", img: "default.jpg" },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="contained"
                  sx={{
                    display: "block",
                    mb: 2,
                    background: "#fff",
                    color: "#000",
                    borderRadius: "50px",
                    padding: "8px 20px",
                    fontSize: "14px",
                  }}
                  fullWidth
                  onMouseEnter={() => handleHover(item.img)}
                  onMouseLeave={() => handleHover(defaultImage)}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                variant="outlined"
                sx={{
                  display: "block",
                  color: "#000",
                  borderColor: "#000",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  fontSize: "14px",
                }}
                fullWidth
              >
                Or describe a different app idea...
              </Button>
            </Box>
          </Grid>

          {/* Right Side Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "400px",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ddd",
              }}
            >
              <img
                src={hoverImage}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease-in-out" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
