import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, Divider } from "@mui/material";
import useAuth from "hooks/useAuth";

const ToolsSection = () => {
  const { user } = useAuth();
  const username = user?.username || "admin";

  const toolsItems = [
    // { icon: "/question.png", text: "Questions", route: `/${username}/challenges` },
    { icon: "/program.png", text: "Program", route: `/${username}/compiler` },
    { icon: "/template.png", text: "Template", route: `/${username}/builder` },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 1,
        borderRadius: "12px",
        bgcolor: "#ffffff",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, fontSize: "13px", color: "text.secondary", px: 2, mb: 0.5 }}
      >
        Tools
      </Typography>

      <Divider sx={{ my: 1 }} />

      <List sx={{ padding: 0 }}>
        {toolsItems.map((item, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={item.route}
            sx={{
              borderRadius: "8px",
              mb: 0.5,
              "&:hover": { bgcolor: "#f0f2f5" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <img src={item.icon} alt={item.text} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ToolsSection;
