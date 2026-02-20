// pages/community/AppCommunityView.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, Container, Stack } from "@mui/material";
import axios from "axios";

import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import MenuSection from "../components/MenuSection";
import ToolsSection from "../components/ToolsSection";
import RightSidebar from "../components/RightSidebar";
import PostCard from "../components/PostCard";
import PostViewer from "../components/PostViewer/PostViewer";
import AppStatCards from "../components/AppStatCards";

import ChatBox from "components/common/ChatBox";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;
const HEADER_HEIGHT = 45;

const HackathonCommunityView = () => {
  const { token, user } = useAuth();
  const username = user?.username || "";

  const [posts, setPosts] = useState([]);
  const [commentMap, setCommentMap] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});
  const [focusMap, setFocusMap] = useState({});
  const [commentsMap, setCommentsMap] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!username || !token) return;
    axios
      .get(`${apiUrl}/api/posts/${username}/posts?postType=app`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => setPosts(res.data.posts || []))
      .catch(console.error);
  }, [token, username]);

  const handleCommentSubmit = async (postId) => {
    const comment = commentMap[postId];
    if (!comment?.trim()) return;
    try {
      const { data } = await axios.post(`${apiUrl}/api/comments/${username}/posts/${postId}`, { text: comment }, {
        headers: { "x-auth-token": token },
      });
      setCommentsMap((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data],
      }));
      setCommentMap((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Comment error:", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await axios.put(`${apiUrl}/api/likes/${postId}`, {}, {
        headers: { "x-auth-token": token },
      });
      setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, likes: data.likes } : p)));
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ecf0f1" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
          mx: { xs: 1, md: 2 },
          mt: 4,
          mb: 2,
          px: 2,
          py: 1,
        }}
      >
        <Header />
      </Box>

      <Box sx={{ px: { xs: 1, md: 2 }, pb: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            {/* Left Sidebar */}
            <Grid item xs={12} md={3} sx={{ mt: 2 }}>
              <Stack spacing={2} sx={{
                height: `calc(100vh - ${HEADER_HEIGHT + 38}px)`,
                position: "sticky",
                top: `${HEADER_HEIGHT + 38}px`,
                overflowY: "auto",
                p: 2,
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)"
              }}>
                <ProfileCard />
                <MenuSection />
                <ToolsSection />
              </Stack>
            </Grid>

            {/* Middle Feed */}
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
                  mt: 2,
                  p: { xs: 2, md: 3 },
                }}
              >
                <AppStatCards />
              </Box>
              <Stack spacing={3}>
                {posts.map((post) => (
                  <Box
                    key={post._id}
                    sx={{
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
                      p: { xs: 2, md: 3 },
                    }}
                  >
                    <PostCard
                      post={post}
                      username={username}
                      comment={commentMap[post._id] || ""}
                      comments={commentsMap[post._id] || []}
                      isVisible={commentsVisible[post._id]}
                      focus={focusMap[post._id] || false}
                      onCommentChange={(val) => setCommentMap((prev) => ({ ...prev, [post._id]: val }))}
                      onCommentSubmit={() => handleCommentSubmit(post._id)}
                      onFocusChange={(val) => setFocusMap((prev) => ({ ...prev, [post._id]: val }))}
                      onToggleComments={() =>
                        setCommentsVisible((prev) => ({ ...prev, [post._id]: !prev[post._id] }))
                      }
                      onLike={() => handleLike(post._id)}
                      onOpenViewer={() => setSelectedPost(post)}
                    />
                  </Box>
                ))}
              </Stack>

              {/* Viewer Modal */}
              <PostViewer
                open={Boolean(selectedPost)}
                onClose={() => setSelectedPost(null)}
                post={selectedPost}
                username={username}
                comment={commentMap[selectedPost?._id] || ""}
                comments={commentsMap[selectedPost?._id] || []}
                isVisible={commentsVisible[selectedPost?._id]}
                focus={focusMap[selectedPost?._id]}
                onCommentChange={(val) =>
                  setCommentMap((prev) => ({ ...prev, [selectedPost._id]: val }))
                }
                onCommentSubmit={() => handleCommentSubmit(selectedPost._id)}
                onFocusChange={(val) =>
                  setFocusMap((prev) => ({ ...prev, [selectedPost._id]: val }))
                }
                onToggleComments={() =>
                  setCommentsVisible((prev) => ({
                    ...prev,
                    [selectedPost._id]: !prev[selectedPost._id],
                  }))
                }
                onLike={() => handleLike(selectedPost._id)}
                hasCodeAccess={selectedPost?.ownerId === user?._id}
              />
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={12} md={3} sx={{ mt: 2 }}>
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
                  height: `calc(100vh - ${HEADER_HEIGHT + 48}px)`,
                  overflowY: "auto",
                  p: 2,
                  position: "sticky",
                  top: `${HEADER_HEIGHT + 48}px`
                }}
              >
                <RightSidebar />
              </Box>
            </Grid>
          </Grid>
        </Container>

        <ChatBox token={token} username={username} />
      </Box>
    </Box>
  );
};

export default HackathonCommunityView;
