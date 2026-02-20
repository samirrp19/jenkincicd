import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const ContactUs = () => {
  return (
    <Box sx={{ py: 4, backgroundColor: "#0b0f19", color: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          {/* Empty 1st Column */}
          <Grid item xs={0} md={3}></Grid>

          {/* Contact Us Section in 2nd + 3rd Columns */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: "#111827",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                py: 2,
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography
                  variant="h7"
                  fontWeight={700}
                  sx={{ mb: 1, color: "#fff" }}
                >
                  Get in touch
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, color: "#fff" }}
                >
                  Don't miss any updates of our product.
                </Typography>
              </CardContent>

              {/* Email Input & Subscribe Button */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                  variant="outlined"
                  placeholder="Your email"
                  sx={{
                    backgroundColor: "#1e293b",
                    borderRadius: "20px",
                    width: "250px", // Slightly stretched width
                    "& .MuiOutlinedInput-root": {
                      padding: "6px 10px", // Reduced height
                      "& fieldset": { border: "none" },
                      "& input": { color: "#fff", fontSize: "0.9rem" },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#6B46C1",
                    fontWeight: "600",
                    borderRadius: "20px",
                    textTransform: "none",
                    padding: "6px 16px", // Slightly smaller button
                    fontSize: "0.9rem",
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Empty 4th Column */}
          <Grid item xs={0} md={3}></Grid>

          {/* Copyright Text (Centered) */}
          <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" sx={{ opacity: 0.7, color: "#fff" }}>
              © Learntute Inc. 2024 All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
