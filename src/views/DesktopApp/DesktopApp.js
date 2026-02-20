
import React from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CollaborativeArticles from "./components/CollaborativeArticles";


const DesktopApp = () => {
  return (
    <Box>
      <Header />
      <Hero />
      <CollaborativeArticles />
    </Box>
  );
};

export default DesktopApp;
