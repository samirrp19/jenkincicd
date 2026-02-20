// src/pages/SignupCover.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const SignupCover = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowDialog(true);
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/auth/signup`, { username, name, email, password });
      setMessage(response.data.msg);
      setError('');
      setShowDialog(true);
    } catch (error) {
      setError(error.response ? error.response.data.msg : 'Error registering user');
      setShowDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    if (message) {
      navigate('/login');
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Side – Centered Card Signup Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: '#ffffff',
          px: 4,
          py: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create an Account
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '1rem', height: '45px', fontSize: '1rem' }}
            >
              Register
            </Button>
          </form>
        </Paper>

        <Dialog open={showDialog} onClose={handleCloseDialog}>
          <DialogTitle>{error ? 'Registration Error' : 'Registration Successful'}</DialogTitle>
          <DialogContent>
            <DialogContentText color={error ? 'error' : 'primary'}>
              {error || message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

      {/* Right Side – Header and Image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: '#f7f7f7',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header Tabs */}
        <Box
          sx={{
            px: 6,
            pt: 4,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 4,
            fontSize: '1rem',
            fontWeight: '500',
            color: '#444',
          }}
        >
          {[
            { label: 'Home', path: '/' },
            { label: 'About us', path: '/about-us' },
            { label: 'Blog', path: '/blogs' },
            { label: 'Pricing', path: '/pricing' },
          ].map(({ label, path }) => (
            <Typography
              key={label}
              onClick={() => handleTabClick(path)}
              sx={{
                borderBottom: path === '/' ? '2px solid #1976d2' : 'none',
                color: path === '/' ? '#1976d2' : '#444',
                pb: 0.5,
                cursor: 'pointer',
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {/* Illustration */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 4,
            mt: 4,
          }}
        >
          <img
            src="/assets/riding-bycycle.png"
            alt="Signup Illustration"
            style={{ maxWidth: '100%', maxHeight: '80%' }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignupCover;
