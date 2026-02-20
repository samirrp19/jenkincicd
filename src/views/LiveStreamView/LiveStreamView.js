import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import LiveStreamSidebar from './components/LiveStreamSidebar';
import VideoFilesContainer from './components/VideoFilesContainer';
import VideoPlayerModal from './components/VideoPlayerModal';
import axios from 'axios';

const LiveStreamView = ({ token, username }) => {
  const theme = useTheme();
  const [selectedMenuItem, setSelectedMenuItem] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/videos/${username}/videos`, {
          headers: { 'x-auth-token': token },
        });
        setVideos(response.data);
      } catch (error) {
        setError('Failed to load videos. Please try again later.');
      }
    };
    fetchVideos();
  }, [username, token]);

  const handleMenuItemClick = (key) => setSelectedMenuItem(key);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowPlayer(true);
  };

  const handleDeleteVideo = (videoId) => setVideos(videos.filter((video) => video._id !== videoId));

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setSelectedVideo(null);
  };

  const renderMainContent = () => {
    switch (selectedMenuItem) {
      case 'videos':
        return (
          <VideoFilesContainer
            videos={videos}
            onVideoClick={handleVideoClick}
            onDelete={handleDeleteVideo}
            username={username}
            token={token}
          />
        );
      default:
        return <Box><h2>Select a section from the sidebar</h2></Box>;
    }
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header isSidebarOpen={isSidebarOpen} />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', marginTop: '64px' }}>
        <LiveStreamSidebar onMenuItemClick={handleMenuItemClick} onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Box sx={{ flexGrow: 1, padding: 3, overflowY: 'auto', marginLeft: isSidebarOpen ? '240px' : '80px', transition: 'margin 0.3s ease' }}>
          {renderMainContent()}
        </Box>
      </Box>
      {selectedVideo && <VideoPlayerModal show={showPlayer} handleClose={handleClosePlayer} videoUrl={selectedVideo.videoUrl} videoName={selectedVideo.videoName} subtitleUrl={selectedVideo.subtitleUrl} />}
    </Box>
  );
};

export default LiveStreamView;
