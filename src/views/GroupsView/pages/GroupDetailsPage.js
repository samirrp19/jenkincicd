import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Breadcrumbs,
    Typography,
    Box,
    Paper,
    useTheme
  } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from 'components/Header';
import Post from 'components/common/Post';
// import CreateGroupPost from '../components/CreateGroupPost';
import CreatePost from '../components/CreatePost';
import ChatBox from 'components/common/ChatBox';
import useAuth from 'hooks/useAuth'; 
import GroupDetailsSidebar from "../components/GroupDetailsSidebar";
import WidgetCard from 'views/FeedsView/components/WidgetCard';
import TrendingCard from 'components/common/Trending/TrendingCard';
import PostViewer from 'components/common/Post/PostViewer';

const apiUrl = process.env.REACT_APP_API_URL;

const GroupDetailsPage = () => {
    const theme = useTheme();
    const { token, user } = useAuth();
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isPostViewerOpen, setPostViewerOpen] = useState(false);
    const navigate = useNavigate();
    const username = user?.username; 


  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/groups/${groupId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setGroup(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    const fetchGroupPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/posts/${username}/groups/${groupId}/posts`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setPosts(response.data);
        setSelectedPost(null);  // Reset selected post when fetching all posts
      } catch (error) {
        console.error('Error fetching group posts:', error);
      }
    };

    fetchGroupDetails();
    fetchGroupPosts();
  }, [groupId, token, username]);

  const handleBreadcrumbClick = () => {
      navigate(`/${username}/groups/${groupId}`);
      setSelectedPost(null);
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostClick = (postId) => {
    const post = posts.find((p) => p._id === postId);
    setSelectedPost(post);
  };

  const handlePostViewerClose = () => {
    setSelectedPost(null);
    setPostViewerOpen(false);
    navigate(`/${username}/groups/${groupId}`);
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default, 
        color: theme.palette.text.primary,
        height: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Prevent page scrolling
      }}
    >
      <Header />

      {/* Main layout for content */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: 'flex',
          height: 'calc(100vh - 56px)', // Full viewport height minus the Topbar height (assuming 56px)
          overflow: 'hidden', // Prevent the whole page from scrolling
        }}
      >
        <Grid container spacing={4} sx={{ flexGrow: 1, height: '100%' }}>
          
          {/* Left Sidebar - ProfileCard fixed */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              height: '100%', // Full height
              overflow: 'hidden', // No scroll
            }}
          >
            <Box
              sx={{
                position: 'sticky',
                top: 70, // Fixed at 70px from top (below the Topbar)
                height: 'calc(100vh - 70px)', // Full viewport height minus the topbar height
                overflow: 'hidden', // No scrolling here
              }}
            >
              {group && <GroupDetailsSidebar group={group} />}
            </Box>
          </Grid>

          {/* Middle column for posts - Scrollable */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: '100%',
              overflowY: 'auto', // Make this column scrollable
              paddingRight: { md: 2 },
            }}
          >
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link
                color="inherit"
                underline="hover"
                onClick={handleBreadcrumbClick}
                sx={{ cursor: 'pointer' }}
              >
                Feeds
              </Link>
              {selectedPost && (
                <Typography color="textPrimary">{selectedPost.title}</Typography>
              )}
            </Breadcrumbs>
            <Typography variant="h4">{group ? group.name : 'Loading...'}</Typography>
            <Box sx={{ mb: 3 }}>
              <CreatePost onPostCreated={handlePostCreated} username={username} token={token} groupId={groupId} />
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

          {/* Right Sidebar - Widgets fixed, Trending scrollable */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              height: '100%',
              overflowY: 'auto', // Scrollable third column
            }}
          >
            <Box
              sx={{
                position: 'sticky',
                top: 0, // Fix the widgets just below the Topbar
                zIndex: 1,
              }}
            >
              <WidgetCard />
            </Box>
            <Box
              sx={{
                mt: 3,
              }}
            >
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

      {/* ChatBox component */}
      <ChatBox token={token} username={username} />
    </Box>
  )
};

export default GroupDetailsPage;
