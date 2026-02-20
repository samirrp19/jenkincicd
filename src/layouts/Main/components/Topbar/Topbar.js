import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import TerminalIcon from '@mui/icons-material/Terminal';
import ThemeModeToggler from 'components/ThemeModeToggler';
import { NavItem } from './components';

const Topbar = ({ onSidebarOpen, pages, colorInvert = false, user }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const {
    home: homePages,
    portfolio: portfolioPages,
    feeds: feedPages,
    openai: openaiPages,
    courses: coursePages,
  } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
      sx={{
        height: '56px', // Fixed height for the top bar
        padding: theme.spacing(0, 2),
        backgroundColor: mode === 'light' ? '#fff' : '#2c2c2c',
        boxShadow: `0 2px 10px ${alpha(theme.palette.common.black, 0.05)}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left Section: Logo or Fallback to "Learntute" */}
      <Box
        component="a"
        href="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          src={mode === 'light' && !colorInvert ? '/lt-logo.svg' : '/lt-logo.svg'}
          alt="Learntute Logo"
          sx={{
            height: '40px', // Adjust the logo size without changing top bar height
            width: 'auto', // Keep width auto to maintain aspect ratio
            objectFit: 'contain', // Ensures the image scales properly
          }}
        />
      </Box>

      {/* Middle Section: Navigation Items */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        <Box marginLeft={4}>
          <NavItem title="Home" id="home-pages" items={homePages} colorInvert={colorInvert} />
        </Box>
        <Box marginLeft={4}>
          <NavItem title="Feeds" id="feed-pages" items={feedPages} colorInvert={colorInvert} />
        </Box>
        <Box marginLeft={4}>
          <NavItem title="AI Tutor" id="openai-pages" items={openaiPages} colorInvert={colorInvert} />
        </Box>
        <Box marginLeft={4}>
          <NavItem title="Portfolio" id="portfolio-pages" items={portfolioPages} colorInvert={colorInvert} />
        </Box>
        <Box marginLeft={4}>
          <NavItem title="Courses" id="course-pages" items={coursePages} colorInvert={colorInvert} />
        </Box>
        <Box marginLeft={4}>
          <IconButton
            color="primary"
            component="a"
            target="_blank"
            href="/compiler"
            size="large"
          >
            <TerminalIcon />
          </IconButton>
        </Box>

        {/* Show Join Now and Sign In buttons only if user is not logged in */}
        {!user && (
          <Box marginLeft={4}>
            <Button
              variant="contained"
              color="primary"
              href="/register"
              size="large"
              sx={{
                ml: 2,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Join Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href="/login"
              size="large"
              sx={{
                ml: 2,
                borderColor: '#9c27b0',
                color: '#9c27b0',
                '&:hover': {
                  backgroundColor: '#f3e5f5',
                  borderColor: '#6a0080',
                  color: '#6a0080',
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        )}
        <Box marginLeft={4}>
          <ThemeModeToggler />
        </Box>
      </Box>

      {/* Sidebar Menu Icon for mobile view */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <IconButton
          onClick={onSidebarOpen}
          aria-label="Menu"
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
  user: PropTypes.object,
};

export default Topbar;
