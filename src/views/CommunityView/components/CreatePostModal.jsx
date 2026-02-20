import React from "react";
import {
  Box,
  Modal,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";

const storyOptions = [
  {
    id: 1,
    title: "Create a photo story",
    icon: "/assets/photo-icon.svg", // Replace with your actual icon path
    bg: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
  },
  {
    id: 2,
    title: "Create a text story",
    icon: "/assets/text-icon.svg",
    bg: "linear-gradient(135deg, #ff6bc9 0%, #b44dff 100%)",
  },
  {
    id: 3,
    title: "Create a poll story",
    icon: "/assets/poll-icon.svg",
    bg: "linear-gradient(135deg, #f9cb28 0%, #f0932b 100%)",
  },
  {
    id: 4,
    title: "Create a video story",
    icon: "/assets/video-icon.svg",
    bg: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
  },
];

const CreatePostModal = ({ open, onClose, username }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          bgcolor: "#f4f6f8",
        }}
      >
        {/* Left Sidebar */}
        <Box
          sx={{
            width: 260,
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #ddd",
            pt: 8,
          }}
        >
          {/* Header with logo + close */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 2,
              borderBottom: "1px solid #eee",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src="/assets/logo.svg"
                alt="Logo"
                style={{ height: 30 }}
              />
            </Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* User Info */}
          <Box sx={{ px: 2, py: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src="/assets/user-avatar.jpg" /> {/* Replace as needed */}
            <Typography fontWeight={600}>{username}</Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: 3,
              py: 2,
              borderBottom: "1px solid #ddd",
              backgroundColor: "#fff",
              pt: 8
            }}
          >
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <Avatar
              sx={{ ml: 2 }}
              src="/assets/user-avatar.jpg"
            />
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              p: 4,
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
              flex: 1,
              overflowY: "auto",
            }}
          >
            {storyOptions.map((option) => (
              <Paper
                key={option.id}
                sx={{
                  width: 180,
                  height: 260,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: option.bg,
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: 4,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <img
                  src={option.icon}
                  alt={option.title}
                  style={{ width: 48, height: 48, marginBottom: 16 }}
                />
                <Typography fontWeight={600} textAlign="center" fontSize="15px">
                  {option.title}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
