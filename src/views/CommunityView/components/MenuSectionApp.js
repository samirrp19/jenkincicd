import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import useAuth from "hooks/useAuth";

const MenuSection = () => {
  const { user } = useAuth();
  const username = user?.username || "admin";

  const menuItems = [
    { icon: "/dashboard.png", text: "Dashboard", route: `/${username}/dashboard` },
    { icon: "/project.png", text: "Projects", route: `/${username}/projects` },
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
      <List sx={{ padding: 0 }}>
        {menuItems.map((item, index) => (
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

export default MenuSection;
