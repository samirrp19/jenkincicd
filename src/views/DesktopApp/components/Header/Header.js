import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#FDF3E7", // White-Golden Background
        boxShadow: "none",
        height: "50px", // Minimal height
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "50px" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "bold", color: "#000" }}>
          LEARNTUTE
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Features with Hover Dropdown */}
          <Typography
            sx={{ cursor: "pointer", fontSize: "12px", color: "#000" }}
            onMouseEnter={handleMenuOpen}
          >
            Features
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{ onMouseLeave: handleMenuClose }}
          >
            <MenuItem onClick={handleMenuClose}>AI Code Generator</MenuItem>
            <MenuItem onClick={handleMenuClose}>Real-time Collaboration</MenuItem>
            <MenuItem onClick={handleMenuClose}>Instant Hosting</MenuItem>
            <MenuItem onClick={handleMenuClose}>Multi-language Support</MenuItem>
          </Menu>

          <Typography sx={{ cursor: "pointer", fontSize: "12px", color: "#000" }}>Teams</Typography>
          <Typography sx={{ cursor: "pointer", fontSize: "12px", color: "#000" }}>Pricing</Typography>
          <Typography sx={{ cursor: "pointer", fontSize: "12px", color: "#000" }}>Guides</Typography>
          <Typography sx={{ cursor: "pointer", fontSize: "12px", color: "#000" }}>Blog</Typography>
          <Typography sx={{ cursor: "pointer", fontSize: "12px", color: "#000" }}>Careers</Typography>
        </Box>

        {/* Right Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="text" sx={{ fontSize: "12px", color: "#000" }}>Contact Sales</Button>
          <Button variant="text" sx={{ fontSize: "12px", color: "#000" }} href="/login">Log in</Button>
          <Button variant="contained" sx={{ fontSize: "12px", backgroundColor: "#000", color: "#fff" }} href="/register">
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
