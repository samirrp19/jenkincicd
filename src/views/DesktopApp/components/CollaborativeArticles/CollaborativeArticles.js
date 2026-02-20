import React, { useState } from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";

const categories = [
  "Marketing", "Public Administration", "Healthcare", "Engineering",
  "IT Services", "Sustainability", "Business Administration",
  "Telecommunications", "HR Management"
];

const jobs = [
  "Engineering", "Business Development", "Finance",
  "Administrative Assistant", "Retail Associate", "Customer Service",
  "Operations", "Information Technology", "Marketing", "Human Resources"
];

const CollaborativeArticles = () => {
  const [showMoreJobs, setShowMoreJobs] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Collaborative Articles Section */}
      <Box sx={{ backgroundColor: "#F5F5F5", p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Explore collaborative articles
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We’re unlocking community knowledge in a new way. Experts add insights directly into each article, started with the help of AI.
        </Typography>
        <Grid container spacing={1}>
          {categories.map((category, index) => (
            <Grid item key={index}>
              <Button variant="outlined" sx={{ borderRadius: "20px" }}>{category}</Button>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Button variant="outlined" sx={{ borderRadius: "20px" }}>Show all</Button>
        </Box>
      </Box>

      {/* Jobs Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Find the right job or internship for you
        </Typography>
        <Grid container spacing={1}>
          {jobs.slice(0, showMoreJobs ? jobs.length : 6).map((job, index) => (
            <Grid item key={index}>
              <Button variant="outlined" sx={{ borderRadius: "20px" }}>{job}</Button>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Button variant="outlined" sx={{ borderRadius: "20px" }} onClick={() => setShowMoreJobs(!showMoreJobs)}>
            {showMoreJobs ? "Show less" : "Show more"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CollaborativeArticles;
