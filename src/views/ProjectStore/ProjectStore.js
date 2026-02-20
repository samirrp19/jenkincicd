import React, { useState } from 'react';
import { Grid, Button, TextField, Box, Card, CardContent, Typography, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Topbar from 'components/Topbar';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import useAuth from 'hooks/useAuth'; 
import { useTheme } from '@mui/material/styles'; // Import useTheme

// Dummy Data for the projects (this will be dynamic later)
const projects = [
  {
    title: 'React',
    description: 'React example starter project',
    icon: '🔵',
    stars: '7.6M',
    template: 'react',
  },
  {
    title: 'JavaScript',
    description: 'The JavaScript template',
    icon: '🟡',
    stars: '3.2M',
    template: 'node',
  },
  {
    title: 'HTML + CSS',
    description: 'A template for HTML and CSS',
    icon: '🟠',
    stars: '2.3M',
    template: 'html-css',
  },
  {
    title: 'React (TS)',
    description: 'React and TypeScript example starter project',
    icon: '🔵',
    stars: '734.6k',
    template: 'react-ts',
  },
  {
    title: 'Vanilla Typescript',
    description: 'JavaScript and TypeScript example starter',
    icon: '🟦',
    stars: '297.1k',
    template: 'typescript',
  },
  {
    title: 'Angular',
    description: 'The quickest way to get started with Angular!',
    icon: '🔴',
    stars: '267.7k',
    template: 'angular',
  },
];

const categories = ['Popular', 'Server', 'Browser', 'Frontend', 'Backend', 'TypeScript', 'Playground'];

const ProjectStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user ? user.username : null;

  // Use the theme
  const theme = useTheme();

  const handleHomeClick = () => {
    if (username) {
      navigate(`/${username}/community`);
    }
  };


  const projectStoreNavItems = [
    {
      icon: <HomeIcon />, // Removed the wrapping IconButton
      onClick: handleHomeClick,
      label: "Home",
    },
    { icon: <PeopleIcon />, link: '/friends' },
    { icon: <MessageIcon />, link: '/messages' },
  ];

  const rightSectionItems = {
    search: false,
    notifications: true,
  };

  const handleCardClick = (template) => {
    if (username) {
      navigate(`/${username}/project?template=${template}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Topbar Component */}
      <Topbar navItems={projectStoreNavItems} rightSectionItems={rightSectionItems} user={user} />

      {/* Main Content */}
      <Box
        sx={{
          padding: '20px',
          backgroundColor: theme.palette.background.default, // Use theme background color
          color: theme.palette.text.primary, // Use theme text color
          minHeight: '100vh', // Ensure it covers the viewport height
        }}
      >
        {/* Filter Buttons */}
        <Box sx={{ display: 'flex', gap: '10px', mb: 4 }}>
          {categories.map((category) => (
            <Button
              key={category}
              sx={{
                backgroundColor: theme.palette.background.paper, // Use theme paper color for buttons
                color: theme.palette.text.primary, // Theme-based text color
                borderRadius: '20px',
                padding: '8px 20px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover, // Use theme hover effect
                },
              }}
            >
              {category}
            </Button>
          ))}
          {/* Search Bar */}
          <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="What are you looking for?"
              sx={{
                backgroundColor: theme.palette.background.paper, // Theme-based background
                borderRadius: '20px',
                minWidth: '250px',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <Search style={{ color: theme.palette.text.primary }} />
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: theme.palette.text.primary },
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>

        {/* Project Cards Grid */}
        <Grid container spacing={2}>
          {projects
            .filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  onClick={() => handleCardClick(project.template)}
                  sx={{
                    backgroundColor: theme.palette.background.paper, // Theme-based background for cards
                    color: theme.palette.text.primary, // Theme-based text color
                    height: '150px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)', // Hover effect
                      backgroundColor: theme.palette.action.hover, // Use hover background
                    },
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ fontSize: '50px', marginRight: '20px' }}>{project.icon}</Box>
                    <Box>
                      <Typography variant="h6" noWrap>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {project.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#fdd835' }}>
                        {project.stars} ⭐
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

          {/* Empty State if no projects found */}
          {projects.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
                No projects found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ProjectStore;
