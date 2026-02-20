import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MemoryIcon from "@mui/icons-material/Memory";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import { Link as RouterLink } from "react-router-dom";


const featuresData = [
  {
    id: 1,
    icon: <AutoAwesomeIcon sx={{ fontSize: 30, color: "#61dafb" }} />,
    title: "AI Assistance",
    subtitle: "Get Context-Aware AI Assistance for all Tasks",
    description:
      "Add diverse context like DB Schema, APIs, code repositories (GitHub, GitLab, Bitbucket), and more.",
    link: "/features/ai-assistance",
    badges: [
      "Code Generation",
      "Code Debugging",
      "Code Refactoring",
      "Code Testing",
      "Code Migration",
      "Code Optimization",
      "Application Generation",
    ],
  },
  {
    id: 2,
    icon: <MemoryIcon sx={{ fontSize: 30, color: "#c084fc" }} />,
    title: "AI Bots",
    subtitle: "Instantly Create Specialized AI Agents",
    description:
      "Add AI bots on Slack channels & Discord servers. Use it anywhere for instant assistance, interbot conversations, & more.",
    link: "/features/ai-bots",
    image: "ai-bots.jpg",
  },
  {
    id: 3,
    icon: <DescriptionIcon sx={{ fontSize: 30, color: "#4ade80" }} />,
    title: "AI-Powered Documentation",
    subtitle: "Create Codebase & Database Documentation",
    description:
      "Effortlessly create and maintain documentation with AI. Ease Developer onboarding & use AI chat for clarifications.",
    link: "/features/ai-documentation",
    image: "ai-database.jpg",
  },
  {
    id: 4,
    icon: <StorageIcon sx={{ fontSize: 30, color: "#60a5fa" }} />,
    title: "AI for Database",
    subtitle: "Visualize Databases",
    description:
      "Add any SQL or No-SQL Database Schema and Visualize DB Structure with an ER Diagram.",
    link: "/features/ai-database",
    image: "database.png",
    collapsible: [
      {
        title: "Model DB with AI",
        content:
          "Use AI to generate, modify, and improve your database schema automatically.",
      },
      {
        title: "Generate Queries",
        content:
          "AI-powered SQL query generation with context-aware suggestions.",
      },
      {
        title: "Generate Mock Data",
        content: "Instantly generate test data for your database models.",
      },
    ],
  },
];

const Features = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#0b0f19", color: "#fff" }}>
      <Container maxWidth="lg">
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
          Features
        </Typography>
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 6, fontSize: { xs: "2rem", md: "2.5rem" } }}
        >
          Advanced AI Features Built to Boost Productivity for Developers
        </Typography>

        {/* Features List - 2nd + 3rd Column */}
        <Stack spacing={6} sx={{ mx: "auto", maxWidth: "75%" }}>
          {featuresData.map((feature) => (
            <Card
              key={feature.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                backgroundColor: "#111827",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
              }}
            >
              {/* Left Side: Feature Details (2nd Column - 12/4 width) */}
              <CardContent sx={{ flex: 1.2, padding: "24px" }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                  {feature.icon}
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#8b5cf6",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {feature.title}
                  </Typography>
                </Stack>

                <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>
                  {feature.subtitle}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, color: "#fff", mb: 3 }}>
                  {feature.description}
                </Typography>

                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#6B46C1",
                      fontWeight: "600",
                      borderRadius: "25px",
                      textTransform: "none",
                      fontSize: "1rem",
                      padding: "10px 24px",
                    }}
                    endIcon={<ArrowForwardIosIcon />}
                    component={RouterLink}
                    to={feature.link}
                  >
                    Explore More
                  </Button>
                </CardActions>
              </CardContent>

              {/* Right Side: Image OR Tags (3rd Column - 12/4 width) */}
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "24px",
                }}
              >
                {feature.badges ? (
                  <Stack direction="row" flexWrap="wrap" spacing={1}>
                    {feature.badges.map((badge, idx) => (
                      <Chip
                        key={idx}
                        label={badge}
                        sx={{ backgroundColor: "#1e293b", color: "#fff" }}
                      />
                    ))}
                  </Stack>
                ) : feature.image ? (
                  <Box>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      style={{
                        maxWidth: "200px", // Adjusted Image Size
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Accordions Below "AI for Database" */}
        <Box sx={{ mx: "auto", maxWidth: "75%", mt: 6 }}>
          {featuresData
            .filter((feature) => feature.collapsible)
            .map((feature) =>
              feature.collapsible.map((item, idx) => (
                <Accordion
                  key={idx}
                  sx={{
                    backgroundColor: "#1e293b",
                    color: "#fff",
                    mt: 2,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{item.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
