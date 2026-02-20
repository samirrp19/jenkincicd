// src/pages/ContactUsPage.jsx
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import HeaderLanding from "./HeaderLanding"; // ✅ add header

const ContactUsPage = () => {
  return (
    <>
      <HeaderLanding />

      <Box
        sx={{
          minHeight: "100vh",
          background: "#4b3b72",
          pt: { xs: "80px", md: "90px" }, // ✅ offset for fixed header
          pb: 6,
        }}
      >
        <Grid
          container
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            borderRadius: { md: 2 },
            overflow: "hidden",
            boxShadow: { md: "0 10px 30px rgba(0,0,0,0.2)" },
          }}
        >
          {/* Left Section */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              color: "white",
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background:
                "linear-gradient(160deg, rgba(38,26,66,0.9) 0%, rgba(75,59,114,0.95) 100%)",
            }}
          >
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" mb={4} sx={{ opacity: 0.9 }}>
              Not sure what you need? The team at Square Events will be happy to
              listen to you and suggest event ideas you hadn&apos;t considered.
            </Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <MailOutlineIcon sx={{ mr: 1 }} />
              <Typography>codex@learntute.com</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography>Support: (+91) 8527465766</Typography>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              backgroundColor: "white",
              p: { xs: 3, md: 6 },
            }}
          >
            <Paper elevation={0} sx={{ width: "100%", background: "transparent" }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                We’d love to hear from you!
                <br />
                Let’s get in touch
              </Typography>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full Name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Company" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone number"
                    variant="outlined"
                    placeholder="+1 (555) 000-0000"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    multiline
                    minRows={4}
                    variant="outlined"
                    placeholder="Type your message here"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#4b3b72",
                      textTransform: "none",
                      fontWeight: 600,
                      px: 3,
                      py: 1.25,
                      "&:hover": { backgroundColor: "#3f3262" },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContactUsPage;
