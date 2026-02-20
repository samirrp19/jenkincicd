// src/pages/PricingPage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Link as RouterLink } from "react-router-dom";
import HeaderLanding from "../components/HeaderLanding"; // ✅ import your header

const pricingPlans = [
  {
    title: "Free Plan",
    price: "₹0",
    description: "Best way to get started with Codex.",
    buttonText: "Get Started",
    buttonColor: "#8b5cf6",
    features: [
      "Create 1 app",
      "Host 1 app (self-hosted)",
      "10,000 AI tokens / month",
      "Basic AI assistance",
      "Community support",
    ],
  },
  {
    title: "Pro Plan",
    price: "₹999 / month",
    description: "For professional developers & startups.",
    buttonText: "Upgrade to Pro",
    buttonColor: "#00c49a",
    features: [
      "Create up to 5 apps",
      "Host 3 apps (self-hosted)",
      "50,000 AI tokens / month included",
      "AI generation, debugging & testing",
      "Team collaboration tools",
      "Priority support",
    ],
    popular: true, // mark as popular
  },
];

const tokenRecharges = [
  {
    title: "100K Tokens",
    price: "₹299",
    description: "Top-up your AI usage.",
    buttonColor: "#f59e0b",
  },
  {
    title: "500K Tokens",
    price: "₹999",
    description: "For heavy workloads & large projects.",
    buttonColor: "#ef4444",
  },
];

const hostingPlans = [
  {
    title: "Basic Hosting",
    price: "₹199 / app / month",
    description: "Simple hosting managed by Codex.",
    buttonColor: "#3b82f6",
    features: [
      "HTTPS + custom subdomain",
      "1 GB RAM, 1 vCPU",
      "Shared hosting environment",
    ],
  },
  {
    title: "Scale Hosting",
    price: "₹499 / app / month",
    description: "Scale your apps with dedicated resources.",
    buttonColor: "#6366f1",
    features: [
      "HTTPS + custom domain",
      "2 GB RAM, 2 vCPU",
      "Autoscaling pods",
      "App monitoring & logs",
    ],
  },
];

const PricingPage = () => {
  return (
    <>
      {/* ✅ Reuse header across pages */}
      <HeaderLanding />

      <Box sx={{ py: 12, backgroundColor: "#0b0f19", color: "#fff" }}>
        <Container maxWidth="lg">
          {/* Section Title */}
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              textTransform: "uppercase",
              color: "#8b5cf6",
              fontWeight: 700,
              mb: 1,
            }}
          >
            Pricing
          </Typography>
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            sx={{
              mb: 6,
              fontSize: { xs: "2rem", md: "2.5rem" },
              color: "#ffffff",
            }}
          >
            Choose the Right Plan <br /> for Your Development Journey
          </Typography>

          {/* Main Pricing Plans */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            sx={{
              mx: "auto",
              maxWidth: "75%",
              display: "flex",
              justifyContent: "center",
              mb: 10,
            }}
          >
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  backgroundColor: "#111827",
                  borderRadius: "10px",
                  boxShadow: plan.popular
                    ? "0 0 20px rgba(139,92,246,0.6)"
                    : "0 4px 10px rgba(255, 255, 255, 0.1)",
                  padding: "24px",
                  minHeight: "420px",
                  position: "relative",
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-12px",
                      right: "16px",
                      backgroundColor: "#8b5cf6",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      px: 2,
                      py: 0.5,
                      borderRadius: "12px",
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: "#fff", mb: 1 }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#8b5cf6", mb: 2 }}>
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.8, mb: 3, color: "#ffffff" }}
                  >
                    {plan.description}
                  </Typography>

                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="contained"
                    fullWidth
                    component={RouterLink}
                    to="/register"
                    sx={{
                      backgroundColor: plan.buttonColor,
                      fontWeight: "600",
                      borderRadius: "25px",
                      textTransform: "none",
                      fontSize: "1rem",
                      padding: "10px 24px",
                      mb: 3,
                    }}
                  >
                    {plan.buttonText}
                  </Button>

                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ mb: 1, color: "#ffffff" }}
                  >
                    FEATURES
                  </Typography>
                  <List dense>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ paddingLeft: 0 }}>
                        <CheckIcon sx={{ color: "#00c49a", mr: 1 }} />
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            sx: { color: "#ffffff" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Token Recharges */}
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            sx={{ mb: 4 }}
          >
            Token Recharges
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            sx={{
              mx: "auto",
              maxWidth: "60%",
              display: "flex",
              justifyContent: "center",
              mb: 10,
            }}
          >
            {tokenRecharges.map((token, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  backgroundColor: "#111827",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
                  padding: "24px",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                    {token.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#8b5cf6", mb: 2 }}>
                    {token.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.8, mb: 3, color: "#ffffff" }}
                  >
                    {token.description}
                  </Typography>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/register"
                    sx={{
                      backgroundColor: token.buttonColor,
                      borderRadius: "25px",
                    }}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Hosting Plans */}
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            sx={{ mb: 4 }}
          >
            Hosting Add-Ons
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            sx={{
              mx: "auto",
              maxWidth: "75%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {hostingPlans.map((hosting, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  backgroundColor: "#111827",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
                  padding: "24px",
                  minHeight: "300px",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                    {hosting.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#8b5cf6", mb: 2 }}>
                    {hosting.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.8, mb: 2, color: "#ffffff" }}
                  >
                    {hosting.description}
                  </Typography>

                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/register"
                    sx={{
                      backgroundColor: hosting.buttonColor,
                      borderRadius: "25px",
                    }}
                  >
                    Choose Plan
                  </Button>

                  <List dense sx={{ mt: 2 }}>
                    {hosting.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ paddingLeft: 0 }}>
                        <CheckIcon sx={{ color: "#00c49a", mr: 1 }} />
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            sx: { color: "#ffffff" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default PricingPage;
