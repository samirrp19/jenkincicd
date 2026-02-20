import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

const puzzles = [
  { icon: "/database.png", name: "Zip", description: "Complete the path" },
  { icon: "/earth.jpg", name: "Tango", description: "Harmonize the grid" },
];

const RightSidebar = () => {
  const [questions, setQuestions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/challenges/questions`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setQuestions(res.data || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const visibleQuestions = showAll
    ? questions.slice(0, 5)
    : questions.slice(0, 2);

  return (
    <Box sx={{ p: 2 }}>
      {/* Today's Challenges Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          mb: 2,
          p: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} mb={1}>
          Today's Challenges
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Created by Learntute
        </Typography>

        <List dense disablePadding>
          {visibleQuestions.map((q, index) => (
            <ListItem key={q._id || index} sx={{ py: 0.5 }}>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={600}>
                    {q.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {questions.length > 2 && (
          <Typography
            variant="body2"
            color="primary"
            sx={{ mt: 1, fontWeight: 600, cursor: "pointer" }}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less ▲" : "Show more ▼"}
          </Typography>
        )}
      </Box>

      {/* Puzzles Section — untouched */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          mb: 2,
          p: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} mb={1}>
          Today's Hackathons
        </Typography>

        <List dense disablePadding>
          {puzzles.map((puzzle, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <img
                src={puzzle.icon}
                alt={puzzle.name}
                width={24}
                height={24}
                style={{ marginRight: 10 }}
              />
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={600}>
                    {puzzle.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {puzzle.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Typography
          variant="body2"
          color="primary"
          sx={{ mt: 1, fontWeight: 600, cursor: "pointer" }}
        >
          Show more ▼
        </Typography>
      </Box>

      {/* Sponsored Section — untouched */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={700}
          sx={{ textAlign: "right", display: "block", mb: 1 }}
        >
          Promoted
        </Typography>
        <img
          src="/sbi-ad.png"
          alt="Sponsored Ad"
          style={{ width: "100%", borderRadius: "6px", marginBottom: "10px" }}
        />
        <Typography variant="subtitle2" fontWeight={600}>
          State Bank of India
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={0.5}
        >
          Grow your career by following State Bank of India
        </Typography>
        <Box
          sx={{
            mt: 2,
            bgcolor: "#0a66c2",
            color: "#ffffff",
            borderRadius: "20px",
            py: 0.5,
            px: 2,
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          Follow
        </Box>
      </Box>
    </Box>
  );
};

export default RightSidebar;
