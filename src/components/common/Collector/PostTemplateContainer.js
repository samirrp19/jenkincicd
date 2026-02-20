import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress, Card, CardMedia, Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchUserTemplates } from 'services/templateService';

const PostTemplateContainer = ({ username, token, onTemplateSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedTemplates = await fetchUserTemplates(username, token);
        setTemplates(fetchedTemplates);
        setError(null); // Clear any previous error
      } catch (err) {
        setError('Failed to fetch templates');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadTemplates();
  }, [username, token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 3 }}>
      {templates.length === 0 ? (
        <Typography>No templates found</Typography>
      ) : (
        templates.map((template) => (
          <Card
            key={template._id}
            sx={{
              maxWidth: 345,
              boxShadow: 3,
              position: 'relative',
              overflow: 'hidden',
              '&:hover .hover-content': {
                opacity: 1,
              },
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }
            }}
          >
            {/* Display template thumbnail */}
            <CardMedia
              component="img"
              height="200"
              image={template.thumbnailUrl} // Thumbnail URL of the template
              alt={template.templateName}
            />

            {/* Hover content */}
            <Box
              className="hover-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<VisibilityIcon />}
                onClick={() => onTemplateSelect(template)} // Send the selected template to parent component
              >
                Edit Template
              </Button>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
};

export default PostTemplateContainer;
