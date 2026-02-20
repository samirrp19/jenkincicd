// src/pages/SigninCover.jsx
import React, { useState } from 'react';
import {
  Grid, Box, Typography, TextField, Button, Divider, Link as MuiLink, Paper
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import axios from 'axios';
import { connectSocket } from '../../socket';

const apiUrl = process.env.REACT_APP_API_URL;

const SigninCover = () => {
  const navigate = useNavigate();
  const { handleSetToken } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { token, user } = response.data;
      handleSetToken(token, user);
      connectSocket(user.id, token);
      navigate(`/${user.username}/community`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Side – Login Form Card with Content */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: '#ffffff',
          px: { xs: 4, md: 10 },
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
          Learntute
        </Typography>

        <Typography variant="h5" fontWeight="bold" mt={2}>
          Build. Learn. Launch. All with AI.
          <br />
          From prompt to production — your next project starts here.
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={2}>
          Welcome back! Please login to your account.
        </Typography>

        <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />

            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" style={{ marginRight: '5px' }} />
                <Typography variant="body2">Remember Me</Typography>
              </Box>
              <MuiLink href="#" variant="body2" underline="hover">
                Forgot Password?
              </MuiLink>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, height: '45px', fontWeight: 'bold' }}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              sx={{ mt: 2, textTransform: 'none', height: '45px' }}
            >
              Sign in with Google
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/register')}
              sx={{
                mt: 2,
                height: '45px',
                textTransform: 'none',
                borderColor: '#1976d2',
                color: '#1976d2',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
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
            alt="Login Illustration"
            style={{ maxWidth: '100%', maxHeight: '80%' }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SigninCover;