import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import useAuth from "hooks/useAuth";
import axios from "axios";
import UserStories from "./UserStories";
import PostCard from "./PostCard";
import PostViewer from "./PostViewer/PostViewer";

const MainContent = () => {
  const { token, user } = useAuth();
  const username = user?.username || "";
  const apiUrl = process.env.REACT_APP_API_URL;

  const [posts, setPosts] = useState([]);
  const [commentMap, setCommentMap] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});
  const [focusMap, setFocusMap] = useState({});
  const [commentsMap, setCommentsMap] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!username || !token) return;
    axios
      .get(`${apiUrl}/api/posts/${username}/posts`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => setPosts(res.data.posts || []))
      .catch(console.error);
  }, [token, username]);

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

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      <UserStories />

      {posts.map((post) => (
        <PostCard
          key={post._id}
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
          onOpenViewer={() => setSelectedPost(post)} // Open PostViewer on click
        />
      ))}

      {/* Post Viewer Modal */}
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
        hasCodeAccess={selectedPost?.ownerId === user?._id} // Example condition
      />
    </Box>
  );
};

export default MainContent;
