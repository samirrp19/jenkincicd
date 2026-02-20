import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import useAuth from "hooks/useAuth";

const LeftSidebar = () => {
  const { user } = useAuth();
  const username = user?.username || ""; // fallback if undefined

  const menuItems = [
    { icon: "/dashboard.png", text: "Dashboard", route: `/${username}/dashboard` }, // updated
    { icon: "/project.png", text: "Projects", route: `/${username}/projects` },
    { icon: "/trending.png", text: "Trending", route: "/trending" },
    { icon: "/acceptance.png", text: "Friends", route: `/${username}/friends` },
    { icon: "/marketplace.png", text: "Marketplace", route: "/marketplace" },
  ];

  const toolsItems = [
    { icon: "/question.png", text: "Questions", route: `/${username}/challenges` },
    { icon: "/program.png", text: "Program", route: `/${username}/compiler` },
    { icon: "/template.png", text: "Template", route: `/${username}/builder` },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        gap: 2,
        p: 2,
        position: "sticky",
        top: 0,
      }}
    >
      {/* Profile Card */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "12px",
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1,
        }}
      >
        <Avatar
          src="/user-avatar.jpg"
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="subtitle1" fontWeight={600} mt={1}>
          {user?.name || "Admin User"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Solutions Architect
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Profile viewers: 20
          </Typography>
        </Box>
      </Paper>

      {/* Menu Section */}
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

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, fontSize: "13px", color: "text.secondary", px: 2, mb: 0.5 }}
        >
          Tools
        </Typography>

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
    </Box>
  );
};

export default LeftSidebar;
