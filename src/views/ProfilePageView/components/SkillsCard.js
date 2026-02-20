import React from "react";
import { Box, Paper, Typography, Chip, Stack } from "@mui/material";

const SkillsCard = ({ skills }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Skills
      </Typography>

      {skills.length > 0 ? (
        <Stack spacing={1} flexWrap="wrap" direction="row">
          {skills.map((skill, idx) => (
            <Chip key={idx} label={skill} color="primary" variant="outlined" />
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No skills added yet.
        </Typography>
      )}
    </Paper>
  );
};

export default SkillsCard;
