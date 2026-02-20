import React, { useState, useEffect } from 'react';
import fetchUserPosts from 'services/postCollectorService'; // Import the service
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Chip,
  Box,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';

const PostCollectorComponent = ({ username, token }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchUserPosts(username, token);
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err.message);
      }
    };

    loadPosts();
  }, [username, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" gutterBottom color="text.primary" fontWeight="bold">
        Dashboard - Posts
      </Typography>

      <Grid container spacing={4}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  },
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                {/* Card Header */}
                <CardHeader
                  title={
                    <Typography variant="h6" color="text.primary" fontWeight="bold">
                      {post.title}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2" color="text.secondary">
                      {new Date(post.date).toLocaleDateString()}
                    </Typography>
                  }
                  sx={{ paddingBottom: 0, paddingTop: 2 }}
                />

                {/* Card Content */}
                <CardContent sx={{ paddingBottom: 2 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.description.length > 100
                      ? `${post.description.substring(0, 100)}...`
                      : post.description}
                  </Typography>
                </CardContent>

                <Divider />

                {/* Card Footer (Tags) */}
                <CardActions
                  disableSpacing
                  sx={{
                    paddingLeft: 2,
                    paddingBottom: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  {post.tags.length > 0 ? (
                    post.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        sx={{
                          marginRight: 1,
                          marginBottom: 1,
                          backgroundColor: theme.palette.secondary.light,
                          color: theme.palette.secondary.contrastText,
                        }}
                      />
                    ))
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      No tags available
                    </Typography>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              No posts available
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PostCollectorComponent;
