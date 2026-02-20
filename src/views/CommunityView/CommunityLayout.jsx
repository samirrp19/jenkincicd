// components/layout/CommunityLayout.jsx
import React from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import ProfileCard from "./components/ProfileCard";
import Header from "./components/Header";
import MenuSection from "./components/MenuSection";
import ToolsSection from "./components/ToolsSection";

const HEADER_HEIGHT = 45;

const CommunityLayout = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ecf0f1" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
          mx: { xs: 1, md: 2 },
          mt: 4,
          mb: 2,
          px: 2,
          py: 1,
        }}
      >
        <Header />
      </Box>

      {/* Layout Grid */}
      <Box sx={{ px: { xs: 1, md: 2 }, pb: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            {/* Left Sidebar */}
            <Grid item xs={12} md={3} sx={{ mt: 2 }}>
              <Stack
                spacing={2}
                sx={{
                  height: `calc(100vh - ${HEADER_HEIGHT + 38}px)`,
                  position: "sticky",
                  top: `${HEADER_HEIGHT + 38}px`,
                  overflowY: "auto",
                  p: 2,
                  borderRadius: "10px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
                }}
              >
                <ProfileCard />
                <MenuSection />
                <ToolsSection />
              </Stack>
            </Grid>

            {/* Middle Content */}
            <Grid item xs={12} md={9} sx={{ mt: 2 }}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default CommunityLayout;
