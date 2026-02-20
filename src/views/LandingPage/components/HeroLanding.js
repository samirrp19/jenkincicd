// src/components/HeroLanding.jsx
import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroLanding = () => {
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const images = [
    "/assets/robot-human.png",
    "/assets/human-human.png",
    "/assets/human-program.png",
    "/assets/human-game.png"
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "65px",
        paddingBottom: "60px",
        color: "#fff",
        backgroundColor: "transparent",
      }}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Grid container spacing={0} sx={{ height: "100%" }} alignItems="stretch">
          {/* Left Column - Text */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 6 }}>
            <Typography
              variant="overline"
              sx={{
                fontSize: "1rem",
                color: "#aaa",
                letterSpacing: "2px",
              }}
            >
              SOCIAL NETWORK WITH AI
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "3.5rem", md: "5rem" },
                color: "#EF8C32",
                mt: 1,
              }}
            >
              AI Builds the Apps. You Build the Future.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#ccc",
                mt: 3,
                fontSize: "1.25rem",
                maxWidth: "500px",
                lineHeight: 1.6,
              }}
            >
              Generate full apps, play with live code, and share your builds — all inside the world’s first agentic app network powered by Learntute.
            </Typography>

            {/* Pagination dots */}
            <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#888' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#EF8C32' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#888' }} />
            </Box>
          </Grid>

          {/* Right Column - Auto Image Slider */}
          <Grid item xs={12} md={6} sx={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            <Slider {...sliderSettings}>
              {images.map((src, index) => (
                <Box
                  key={index}
                  component="img"
                  src={src}
                  alt={`Slide ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              ))}
            </Slider>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroLanding;