import React from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const CircleContainer = styled(Box)({
  position: "relative",
  width: 120,
  height: 120,
  margin: "auto",
});

const CircleContent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
});

const Bar = styled(Box)(({ heightPercent, color }) => ({
  width: 20,
  height: `${heightPercent}%`,
  backgroundColor: color,
  borderRadius: "10px",
  marginBottom: "5px",
  transition: "0.5s",
}));

const ProfileSidebarStats = () => {
  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Grid container spacing={2}>
        {/* Temperature Gauge */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Temperature
            </Typography>
            <CircleContainer>
              <CircularProgress
                variant="determinate"
                value={52}
                size={120}
                thickness={4}
                sx={{ color: "#2196F3" }}
              />
              <CircleContent>
                <Typography variant="h6" fontWeight="bold" color="#FF9800">
                  26°C
                </Typography>
              </CircleContent>
            </CircleContainer>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography variant="caption">0°</Typography>
              <Typography variant="caption">50°</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Light Intensity Gauge */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Lights intensity
            </Typography>
            <CircleContainer>
              <CircularProgress
                variant="determinate"
                value={76}
                size={120}
                thickness={4}
                sx={{ color: "#FF9800" }}
              />
              <CircleContent>
                <Typography variant="h6" fontWeight="bold" color="#2196F3">
                  76%
                </Typography>
              </CircleContent>
            </CircleContainer>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography variant="caption">0%</Typography>
              <Typography variant="caption">100%</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Consumption Bars */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Consumption A
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "end", height: 120 }}>
              <Bar heightPercent={80} color="#2196F3" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Consumption B
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "end", height: 120 }}>
              <Bar heightPercent={60} color="#FF9800" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileSidebarStats;
