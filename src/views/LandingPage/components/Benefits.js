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

const benefitsData = [
  {
    title: "Learntute For Developers",
    description:
      "Get a powerful assistant ready to help you in any programming task.",
    buttonText: "Try For Free",
    features: [
      "Get context-aware AI assistance.",
      "AI supports development in Frontend, Backend, Database, API, Infrastructure, & beyond.",
      "Connect with Github, Gitlab, or Bitbucket to maintain your code context.",
      "Use multiple workspaces to work on different features.",
    ],
    buttonColor: "#8b5cf6",
  },
  {
    title: "Learntute For Teams",
    description:
      "Instantly increase team productivity and development pace with AI.",
    buttonText: "Try For Free",
    features: [
      "Maintain consistent code standards and practices across the team.",
      "Ensure code clarity and make onboarding easy with documentation tools.",
      "Ensure data compliance with logs and reports.",
      "Use Learntute AI bots in Slack and Discord to get instant help across teams.",
    ],
    buttonColor: "#00c49a",
  },
];

const Benefits = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#0b0f19", color: "#fff", mt: 4 }}>
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
          Benefits
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
          Empowering Teams & Individual Developers <br />
          Maximize Efficiency with AI
        </Typography>

        {/* Benefits Cards */}
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
          {benefitsData.map((benefit, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                backgroundColor: "#111827",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
                padding: "24px",
                height: "100%",
                minHeight: "360px",
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Title */}
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ color: "#fff", mb: 2 }}
                >
                  {benefit.title}
                </Typography>
                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.8, mb: 3, color: "#ffffff" }}
                >
                  {benefit.description}
                </Typography>

                {/* Try for Free Button */}
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="contained"
                  fullWidth
                  component={RouterLink}
                  to="/register"
                  sx={{
                    backgroundColor: benefit.buttonColor,
                    fontWeight: "600",
                    borderRadius: "25px",
                    textTransform: "none",
                    fontSize: "1rem",
                    padding: "10px 24px",
                    mb: 3,
                  }}
                >
                  {benefit.buttonText}
                </Button>

                {/* Features List */}
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ mb: 1, color: "#ffffff" }}
                >
                  FEATURES
                </Typography>
                <List dense>
                  {benefit.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ paddingLeft: 0 }}>
                      <CheckIcon sx={{ color: "#00c49a", mr: 1 }} />
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{ sx: { color: "#ffffff" } }}
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
  );
};

export default Benefits;
