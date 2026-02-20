import React from "react";
import { Grid, Paper, Typography, Box, Stack } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const statData = [
  {
    label: "Total Apps",
    value: "714k",
    change: "+2.6%",
    positive: true,
    image: "/assets/apps.jpg", // Add these SVGs to your public/assets folder
  },
  {
    label: "Total Posts",
    value: "311k",
    change: "+0.2%",
    positive: true,
    image: "/assets/posts.jpg",
  },
  {
    label: "Collaborators",
    value: "124k",
    change: "-0.1%",
    positive: false,
    image: "/assets/collaborators.jpg",
  },
];

const AppStatCards = () => {
  return (
    <Grid container spacing={3}>
      {statData.map((stat, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0px 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: "#7d7d7d", fontWeight: 600 }}>
                {stat.label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stat.value}
              </Typography>
              <Box display="flex" alignItems="center" color={stat.positive ? "green" : "red"}>
                {stat.positive ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
                <Typography variant="body2" fontWeight={500}>
                  {stat.change}
                </Typography>
              </Box>
            </Stack>
            <Box
              component="img"
              src={stat.image}
              alt={stat.label}
              sx={{ width: 80, height: 80, objectFit: "contain" }}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppStatCards;
