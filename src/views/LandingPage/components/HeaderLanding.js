import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";

const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(to right, rgba(20, 20, 60, 0.85), rgba(10, 10, 40, 0.75))",
  backdropFilter: "blur(10px)",
  boxShadow: "none",
  position: "fixed",
  top: 0,
  zIndex: 1100,
  height: "55px",
  display: "flex",
  justifyContent: "center",
  transition: "0.3s",
});

const StyledButton = styled(Button)({
  fontWeight: 500,
  borderRadius: "20px",
  padding: "6px 14px",
  transition: "0.3s",
  textTransform: "none",
  fontSize: "0.9rem",
});

const HeaderLanding = ({ onContactClick, onFeatureClick, onPricingClick, onToolsClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /**
   * Scroll if the element is on the current page,
   * otherwise route to the landing page with a hash.
   */
  const scrollOrRoute = (sectionId, hash) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we're not already on the landing page, navigate with hash
      if (pathname !== "/") {
        navigate(`/${hash}`);
      } else {
        // On landing but element missing (unlikely) — set the hash anyway
        window.location.hash = hash;
      }
    }
  };

  const handleFeatures = () => {
    if (typeof onFeatureClick === "function") return onFeatureClick();
    scrollOrRoute("features-section", "#features");
  };

  const handlePricing = () => {
    if (typeof onPricingClick === "function") return onPricingClick();
    // note: your id was "benifits-section" in the code — keep the same spelling
    scrollOrRoute("benifits-section", "#pricing");
  };

  const handleTools = () => {
    if (typeof onToolsClick === "function") return onToolsClick();
    scrollOrRoute("tools-section", "#tools");
  };

  const handleContact = () => {
    if (typeof onContactClick === "function") onContactClick();
    else navigate("/contact");
  };

  const handleNavClick = (text) => {
    switch (text) {
      case "Features":
        handleFeatures();
        break;
      case "Pricing":
        handlePricing();
        break;
      case "Tools":
        handleTools();
        break;
      case "Contact":
        handleContact();
        break;
      default:
        // no-op
        break;
    }
  };

  return (
    <StyledAppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
        {/* Logo / Brand */}
        <Typography
          variant="h6"
          fontWeight="600"
          onClick={() => navigate("/")}
          sx={{
            fontFamily: "Inter, sans-serif",
            color: "#fff",
            fontSize: "1.25rem",
            letterSpacing: "0.5px",
            cursor: "pointer",
          }}
        >
          Learntute.
        </Typography>

        {/* Nav Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {["Features", "Pricing", "Tools"].map((text) => (
            <Typography
              key={text}
              variant="body2"
              onClick={() => handleNavClick(text)}
              sx={{
                cursor: "pointer",
                fontWeight: 400,
                color: "#ffffffb3",
                fontSize: "0.95rem",
                transition: "0.3s",
                "&:hover": { color: "#fff" },
              }}
            >
              {text}
            </Typography>
          ))}
        </Box>

        {/* Auth Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <StyledButton
            variant="outlined"
            sx={{ borderColor: "#ffffff40", color: "#ffffff90" }}
            onClick={() => navigate("/login")}
          >
            Login
          </StyledButton>
          <StyledButton
            variant="contained"
            sx={{ backgroundColor: "#6B46C1", color: "#fff" }}
            onClick={() => navigate("/register")}
          >
            Sign Up →
          </StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default HeaderLanding;
