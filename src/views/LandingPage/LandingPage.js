// src/LandingPage.jsx
import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderLanding from "./components/HeaderLanding";
import HeroLanding from "./components/HeroLanding";
import Features from "./components/Features";
import Tools from "./components/Tools";
import Benefits from "./components/Benefits";
import JoinUs from "./components/JoinUs";
import FooterLanding from "./components/FooterLanding";
import { CssBaseline, Box } from "@mui/material";
import backgroundImage from "./assets/landing-bg.jpg";

const SECTION_IDS = {
  features: "features-section",
  pricing: "benefits-section", // pricing maps to benefits area
  tools: "tools-section",
};

function LandingPage() {
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const toolsRef = useRef(null);

  // Map ids to refs for smooth scrolling
  const idToRef = {
    [SECTION_IDS.features]: featuresRef,
    [SECTION_IDS.pricing]: benefitsRef,
    [SECTION_IDS.tools]: toolsRef,
  };

  // Scroll when landing with a URL hash (/#features | /#pricing | /#tools)
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const key = hash.replace("#", "");
    // translate hash to actual DOM id
    const map = {
      features: SECTION_IDS.features,
      pricing: SECTION_IDS.pricing,
      tools: SECTION_IDS.tools,
    };
    const targetId = map[key] || key;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  const scrollToId = (id) => {
    const ref = idToRef[id];
    if (ref?.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => scrollToId(SECTION_IDS.features);
  const scrollToBenefits = () => scrollToId(SECTION_IDS.pricing);
  const scrollToTools = () => scrollToId(SECTION_IDS.tools);

  return (
    <>
      <CssBaseline />
      <HeaderLanding
        onFeatureClick={scrollToFeatures}  // in-page scroll
        onPricingClick={scrollToBenefits} // pricing → benefits
        onToolsClick={scrollToTools}
        // onContactClick not provided: Header handles /contact
      />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
          pt: "70px", // offset for fixed header
        }}
      >
        <HeroLanding />

        {/* Spacer */}
        <Box sx={{ height: "100px" }} />

        {/* Features */}
        <Box ref={featuresRef} id={SECTION_IDS.features}>
          <Features />
        </Box>

        {/* Tools */}
        <Box ref={toolsRef} id={SECTION_IDS.tools}>
          <Tools />
        </Box>

        {/* Benefits / Pricing */}
        <Box ref={benefitsRef} id={SECTION_IDS.pricing}>
          <Benefits />
        </Box>

        <JoinUs />
        <FooterLanding />
      </Box>
    </>
  );
}

export default LandingPage;
