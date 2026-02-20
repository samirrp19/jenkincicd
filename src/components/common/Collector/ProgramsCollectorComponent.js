import React, { useState, useEffect } from 'react';
import fetchUserPrograms from 'services/programsCollectorService';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
  Tooltip,
  useTheme,
  CircularProgress,
} from '@mui/material';

const ProgramsCollectorComponent = ({ username, token, onProgramSelect }) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const theme = useTheme();

  // Handle program card click
  const handleProgramClick = (program) => {
    onProgramSelect(program);  // Call the parent component's handler with selected program
  };

  // Load programs on mount
  useEffect(() => {
    const loadPrograms = async () => {
      setLoading(true);
      setError(''); // Reset error before loading
      try {
        const fetchedPrograms = await fetchUserPrograms(username, token);
        setPrograms(fetchedPrograms);
      } catch (err) {
        setError('Failed to load programs. Please try again later.');
        console.error(err.message);
      }
      setLoading(false);
    };

    loadPrograms();
  }, [username, token]);

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" gutterBottom color="text.primary" fontWeight="bold">
        Dashboard - Programs
      </Typography>

      {/* Display error message if any */}
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {/* Show loading spinner */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : programs.length > 0 ? (
        <Grid container spacing={4}>
          {programs.map((program) => (
            <Grid item xs={12} key={program._id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  },
                  backgroundColor: theme.palette.background.paper,
                  cursor: 'pointer',
                }}
                onClick={() => handleProgramClick(program)}
              >
                {/* Program thumbnail with fallback image */}
                <Box
                  component="img"
                  src={program.thumbnailUrl || '/default-thumbnail.png'}
                  alt={program.title}
                  sx={{
                    width: '150px',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px 0 0 12px',
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <CardContent>
                    <Typography variant="h6" color="text.primary" fontWeight="bold">
                      {program.title}
                    </Typography>

                    {/* Tooltip for long descriptions */}
                    <Tooltip title={program.description}>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {program.description.length > 100
                          ? `${program.description.substring(0, 100)}...`
                          : program.description}
                      </Typography>
                    </Tooltip>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {program.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            marginRight: 1,
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No programs available
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(ProgramsCollectorComponent);
