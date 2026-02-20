import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const MembersToConnectCard = () => {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || !token) return;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/members`, {
          headers: { "x-auth-token": token },
        });
        const filteredUsers = response.data.filter(u => u.username !== user.username);
        setUsers(filteredUsers.slice(0, 5)); // Limit to 5 users for display
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user, token]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "12px",
        bgcolor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        More profiles for you
      </Typography>

      {users.map((member) => (
        <Box
          key={member._id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={member.profilePicture || undefined} sx={{ width: 40, height: 40 }}>
              {(!member.profilePicture && member.name) ? member.name[0] : null}
            </Avatar>
            <Box>
              <Typography fontWeight={600} fontSize="14px">
                {member.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @{member.username}
              </Typography>
            </Box>
          </Box>

          <Button
            size="small"
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: "12px",
              borderRadius: "20px",
            }}
          >
            Connect
          </Button>
        </Box>
      ))}

      {/* Show all button */}
      <Box sx={{ pt: 1 }}>
        <Button
          variant="text"
          fullWidth
          sx={{
            backgroundColor: "#e4e6eb",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#d8dadf",
            },
          }}
        >
          Show all
        </Button>
      </Box>
    </Paper>
  );
};

export default MembersToConnectCard;
