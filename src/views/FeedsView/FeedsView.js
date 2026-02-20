import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Breadcrumbs,
  Typography,
  Box,
  Paper,
  Link,
  useTheme
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import CreatePost from '../../components/common/CreatePost';
import Post from '../../components/common/Post';
import WidgetCard from './components/WidgetCard';
import TrendingCard from 'components/common/Trending/TrendingCard';
// import ProfileCard from 'components/common/Profile/ProfileCard';
import FeedsSidebar from 'components/common/FeedsSidebar/FeedsSidebar';
import Header from 'components/Header';
import PostViewer from '../../components/common/Post/PostViewer';
// import ChatBox from 'components/common/ChatBox';
import useAuth from 'hooks/useAuth'; 

const apiUrl = process.env.REACT_APP_API_URL;

const FeedsView = () => {
  const theme = useTheme();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams();

  // Ensure user is always defined (Fixes ESLint hook error)
  const username = user?.username || '';
  const name = user?.name || '';

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostViewerOpen, setPostViewerOpen] = useState(false);

  // ✅ Move redirection logic outside of useEffect to prevent conditional hooks
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // ✅ Always define useEffect, even if username is undefined
  useEffect(() => {
    if (!username) return;

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/posts/${username}/posts`, {
          headers: { 'x-auth-token': token },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [token, username]);

  // ✅ Handle postId change and open PostViewer
  useEffect(() => {
    if (postId && posts.length > 0) {
      const post = posts.find((p) => p._id === postId);
      if (post) {
        setSelectedPost(post);
        setPostViewerOpen(true);
      }
    }
  }, [postId, posts]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const logPostView = async (postId) => {
    try {
      const post = posts.find((p) => p._id === postId);
      if (!post) return;

      const timestamp = new Date();
      await axios.post(
        `${apiUrl}/api/posts/${username}/views`,
        { postId, userId: username, timestamp, tags: post?.tags || [] },
        { headers: { 'x-auth-token': token } }
      );
    } catch (error) {
      console.error('Error logging post view:', error);
    }
  };

  const handlePostClick = (postId) => {
    const post = posts.find((p) => p._id === postId);
    if (!post) return;

    setSelectedPost(post);
    setPostViewerOpen(true);
    navigate(`/feeds/${postId}`);
    logPostView(postId);
  };

  const handlePostViewerClose = () => {
    setSelectedPost(null);
    setPostViewerOpen(false);
    navigate('/feeds');
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Header />

      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: 'flex',
          height: 'calc(100vh - 56px)',
          overflow: 'hidden',
        }}
      >
        <Grid container spacing={4} sx={{ flexGrow: 1, height: '100%' }}>
          
          {/* Left Sidebar - ProfileCard */}
          <Grid item xs={12} md={3} sx={{ height: '100%', overflow: 'hidden' }}>
            <Box sx={{ position: 'sticky', top: 70, height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
               <FeedsSidebar name={user.name}/>
              {/* {user && (
                <ProfileCard
                  user={{
                    name: user.name || 'Unknown',
                    role: 'Student',
                    username,
                    avatar: user.avatar || 'https://via.placeholder.com/150',
                  }}
                  token={token}
                />
              )} */}
            </Box>
          </Grid>

          {/* Middle Column - Posts */}
          <Grid item xs={12} md={6} sx={{ height: '100%', overflowY: 'auto', paddingRight: { md: 2 } }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link color="inherit" underline="hover" onClick={handlePostViewerClose} sx={{ cursor: 'pointer' }}>
                {/* Back to Feed */}
              </Link>
              {selectedPost && (
                <Typography color="textPrimary">{selectedPost.title}</Typography>
              )}
            </Breadcrumbs>

            <Box sx={{ mb: 3 }}>
              <CreatePost onPostCreated={handlePostCreated} username={username} token={token} />
            </Box>

            {posts.length > 0 ? (
              posts.map((post) => (
                <Box key={post._id} mb={2}>
                  <Paper elevation={3} sx={{ padding: 2, backgroundColor: theme.palette.background.paper }}>
                    <Post
                      post={post}
                      token={token}
                      username={username}
                      onPostClick={() => handlePostClick(post._id)}
                    />
                  </Paper>
                </Box>
              ))
            ) : (
              <Typography>No posts available.</Typography>
            )}
          </Grid>

          {/* Right Sidebar - Widgets & Trending */}
          <Grid item xs={12} md={3} sx={{ height: '100%', overflowY: 'auto' }}>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <WidgetCard />
            </Box>
            <Box sx={{ mt: 3 }}>
              <TrendingCard />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Post Viewer Modal */}
      {selectedPost && (
        <PostViewer
          post={selectedPost}
          token={token}
          username={username}
          open={isPostViewerOpen}
          onClose={handlePostViewerClose}
        />
      )}

      {/* ChatBox */}
      {/* <ChatBox token={token} username={username} /> */}
    </Box>
  );
};

export default FeedsView;
