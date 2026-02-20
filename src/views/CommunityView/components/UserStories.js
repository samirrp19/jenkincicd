import { useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";

const userStories = [
  {
    id: 1,
    image: "/assets/monitoring.svg",
    title: "APP",
    bgColor: "#E0F7FA",
    route: "/community/app",
  },
  {
    id: 2,
    image: "/assets/code.svg",
    title: "PROGRAM",
    bgColor: "#FFF3E0",
    route: "/community/program",
  },
  {
    id: 3,
    image: "/assets/goals.svg",
    title: "CHALLENGE",
    bgColor: "#F3E5F5",
    route: "/community/challenge",
  },
  {
    id: 4,
    image: "/assets/hackathon.svg",
    title: "HACKATHON",
    bgColor: "#E8F5E9",
    route: "/community/hackathon",
  },
];

const UserStories = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Stack direction="row" spacing={2}>
        {/* Create Post Card (Triggers Modal) */}
        <Paper
          onClick={() => setModalOpen(true)}
          sx={{
            width: 120,
            height: 150,
            borderRadius: 3,
            backgroundColor: "#f4f4f4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: 2,
            transition: "0.3s",
            "&:hover": { boxShadow: 4 },
          }}
        >
          <Avatar
            sx={{ bgcolor: "#6B46C1", width: 40, height: 40, mb: 1 }}
          >
            +
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              color: "#6B46C1",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Create Post
          </Typography>
        </Paper>

        {/* Story Cards with routing */}
        {userStories.map((story) => (
          <Link
            key={story.id}
            to={story.route}
            style={{ textDecoration: "none" }}
          >
            <Paper
              sx={{
                width: 120,
                height: 150,
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                boxShadow: 2,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { boxShadow: 4 },
                backgroundColor: story.bgColor,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={story.image}
                alt={story.title}
                sx={{
                  width: 56,
                  height: 56,
                  objectFit: "contain",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  padding: 1,
                  mb: 1,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                  color: "#333",
                }}
              >
                {story.title}
              </Typography>
            </Paper>
          </Link>
        ))}
      </Stack>

      {/* Modal for Create Post */}
      <CreatePostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        username="Priyabrata Mohanty"
      />
    </>
  );
};

export default UserStories;
