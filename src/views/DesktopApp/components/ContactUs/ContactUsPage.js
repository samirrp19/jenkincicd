// src/pages/ContactUsPage.jsx
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactUsPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#4b3b72' }}>
      {/* Left Section */}
      <Box
        sx={{
          width: '40%',
          color: 'white',
          padding: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" mb={4}>
          Not sure what you need? The team at Square Events will be happy to listen to
          you and suggest event ideas you hadn't considered
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <MailOutlineIcon sx={{ mr: 1 }} />
          <Typography>codex@learntute.com</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography>Support: (+91) 8527465766</Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: '60%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          padding: 6
        }}
      >
        <Paper elevation={0} sx={{ width: '100%' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            We’d love to hear from you!
            <br />Let’s get in touch
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Full Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Company" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Phone number" variant="outlined" placeholder="+1 (555) 000-0000" />
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
              <Button variant="contained" sx={{ backgroundColor: '#4b3b72' }}>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
