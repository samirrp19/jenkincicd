import React from "react";
import { Box, Container, Typography, Grid, Paper, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GitlabIcon from "@mui/icons-material/AccountTree"; // Use appropriate GitLab icon
import BitbucketIcon from "@mui/icons-material/CloudSync"; // Use appropriate Bitbucket icon
import StorageIcon from "@mui/icons-material/Storage"; // For SQL & NoSQL DBs
import PostmanIcon from "@mui/icons-material/Http"; // Use appropriate Postman icon
import SlackIcon from "@mui/icons-material/Chat"; // Slack icon
import TeamsIcon from "@mui/icons-material/People"; // Microsoft Teams
import EmailIcon from "@mui/icons-material/Email";
import JiraIcon from "@mui/icons-material/Assessment"; // Jira icon

const tools = [
  { name: "Github", icon: <GitHubIcon />, color: "#181717" },
  { name: "Gitlab", icon: <GitlabIcon />, color: "#fc6d26" },
  { name: "Bitbucket", icon: <BitbucketIcon />, color: "#0052CC" },
  { name: "SQL & NoSQL DB's", icon: <StorageIcon />, color: "#4CAF50" },
  { name: "Postman", icon: <PostmanIcon />, color: "#FF6C37" },
  { name: "Slack", icon: <SlackIcon />, color: "#4A154B" },
  { name: "Microsoft Teams", icon: <TeamsIcon />, color: "#6264A7" },
  { name: "Email", icon: <EmailIcon />, color: "#FFD700" },
  { name: "JIRA", icon: <JiraIcon />, color: "#0052CC" },
];

const Tools = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#0b0f19", color: "#fff", mt: 4 }}>
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
          Tools we Integrate for Context & Communication
        </Typography>

        {/* Tools Grid - 2nd + 3rd Column Layout */}
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  backgroundColor: "#1e293b",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                <Box
                  sx={{
                    color: tool.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {tool.icon}
                </Box>
                <Typography>{tool.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tools;
