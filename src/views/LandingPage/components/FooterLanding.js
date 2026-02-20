import React from "react";
import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const FooterLanding = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#0b0f19", color: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          {/* Empty 1st Column */}
          <Grid item xs={0} md={3}></Grid>

          {/* Footer Content in 2nd + 3rd Columns (Spanning 6 Columns) */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {/* Left Column - Branding */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                  Learntute.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Join developers who are using Learntute <br />
                  and make your work incredibly easy.
                </Typography>
              </Grid>

              {/* Middle Column - Pages */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Pages
                </Typography>
                <Stack spacing={1}>
                  <Link href="/" color="inherit" underline="none">
                    Home
                  </Link>
                  <Link href="/about-us" color="inherit" underline="none">
                    About Us
                  </Link>
                  <Link href="/pricing" color="inherit" underline="none">
                    Pricing
                  </Link>
                  <Link href="/blogs" color="inherit" underline="none">
                    Blogs
                  </Link>
                </Stack>
              </Grid>

              {/* Middle Column - Help */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Help
                </Typography>
                <Stack spacing={1}>
                  <Link href="/privacy-policy" color="inherit" underline="none">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" color="inherit" underline="none">
                    Terms & Conditions
                  </Link>
                  <Link href="/disclaimer" color="inherit" underline="none">
                    Disclaimer
                  </Link>
                  <Link href="/contact" color="inherit" underline="none">
                    Contact Us
                  </Link>
                </Stack>
              </Grid>

              {/* Right Column - Social Media */}
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Social
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Link href="https://facebook.com" color="inherit" underline="none" display="flex" alignItems="center">
                    <FacebookIcon sx={{ mr: 1 }} /> Facebook
                  </Link>
                  <Link href="https://linkedin.com" color="inherit" underline="none" display="flex" alignItems="center">
                    <LinkedInIcon sx={{ mr: 1 }} /> LinkedIn
                  </Link>
                  <Link href="https://instagram.com" color="inherit" underline="none" display="flex" alignItems="center">
                    <InstagramIcon sx={{ mr: 1 }} /> Instagram
                  </Link>
                  <Link href="https://twitter.com" color="inherit" underline="none" display="flex" alignItems="center">
                    <TwitterIcon sx={{ mr: 1 }} /> Twitter
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          {/* Empty 4th Column */}
          <Grid item xs={0} md={3}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterLanding;
