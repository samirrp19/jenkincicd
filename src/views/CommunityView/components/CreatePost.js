import React, { useState } from 'react';
import { Paper, Box, Avatar, Grid, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import CreatePostModal from 'components/common/CreatePost/components/CreatePostModal'; // Import the modal component
import TabsComponent from 'components/common/CreatePost/components/TabsComponent'; // Tabs for different post types
import PostContentSection from 'components/common/CreatePost/components/PostContentSection'; // Content display based on tabs
import PostInputForm from 'components/common/CreatePost/components/PostInputForm'; // The input form with icons for Program, Project, Template, etc.
import axios from 'axios';
import { LanguagePage } from 'views/CompilerView/components/LanguagePage'; // Code editor for program content
import TemplateBuilder from 'components/common/TemplateBuilder/TemplateBuilder'; // Template builder

const apiUrl = process.env.REACT_APP_API_URL;

const CreatePost = ({ onPostCreated, username, token }) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // Active tab based on the icon clicked in PostInputForm
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postContent, setPostContent] = useState(''); // Handles selected code/content
  const [language, setLanguage] = useState('javascript'); // Selected language of the program
  const [visibility, setVisibility] = useState('private');
  const [selectedProgram, setSelectedProgram] = useState(null); // Track selected program
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Track selected template
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project
  const [selectedChallenge, setSelectedChallenge] = useState(null); // Track selected challenge
  const [isMaximized, setIsMaximized] = useState(false); // Handle modal full-screen state

  const handleShowModal = (tabIndex) => {
    setActiveTab(tabIndex); // Set the tab based on the icon clicked in PostInputForm
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
    setSelectedTemplate(null);
    setSelectedProject(null);
    setSelectedChallenge(null);
    setTitle('');
    setDescription('');
    setPostContent(''); // Clear code content
    setIsMaximized(false); // Reset full-screen state
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized); // Toggle between full-screen and normal view
  };

  const handleBuilderRedirect = () => {
    switch (activeTab) {
      case 0:
        window.location.href = `/compiler/`;
        break;
      case 1:
      case 2:
        window.location.href = `${username}/builder?${token}`;
        break;
      case 3:
        window.location.href = `${username}/challenges/`;
        break;
      case 4:
        window.location.href = `${username}/documents/`;
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        title,
        description,
        postType:
          activeTab === 0
            ? 'program'
            : activeTab === 1
            ? 'project'
            : activeTab === 2
            ? 'template'
            : activeTab === 3
            ? 'challenge'
            : 'document',
        visibility,
      };

      if (postData.postType === 'program') {
        postData.programId = selectedProgram?._id;
        postData.code = postContent;
        postData.language = language;
      } else if (postData.postType === 'project') {
        postData.projectId = selectedProject?._id;
        postData.code = postContent;
      } else if (postData.postType === 'challenge') {
        postData.challengeId = selectedChallenge?._id;
        postData.code = postContent;
      } else if (postData.postType === 'document') {
        postData.code = postContent;
      }

      if (postData.postType === 'template') {
        postData.templateId = selectedTemplate?._id;
        postData.title = selectedTemplate?.templateName || 'Untitled Template';
        postData.description = `Documentation for ${selectedTemplate?.templateName}`;
        postData.htmlContent = selectedTemplate?.htmlCode || '';
        postData.cssContent = selectedTemplate?.cssCode || '';
        postData.jsContent = selectedTemplate?.jsCode || '';
      }

      const response = await axios.post(`${apiUrl}/api/posts/${username}/posts`, postData, {
        headers: {
          'x-auth-token': token,
        },
      });

      onPostCreated(response.data);
      handleCloseModal(); // Reset modal after submission
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setPostContent(program.code);
    setTitle(program.title);
    setDescription(program.description);
    setLanguage(program.language || language);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <>
      {/* Post Input Form with the icons */}
      <PostInputForm username={username} token={token} handleShowModal={handleShowModal} />

      <CreatePostModal
        open={showModal}
        handleCloseModal={handleCloseModal}
        isMaximized={isMaximized}
        toggleMaximize={toggleMaximize}
        username={username}
        handleSubmit={handleSubmit}
        activeTab={activeTab}
        handleBuilderRedirect={handleBuilderRedirect}
      >
        {selectedProgram ? (
          <>
            <IconButton onClick={() => setSelectedProgram(null)} sx={{ position: 'absolute', top: 10, left: 10 }}>
              <ArrowBack />
            </IconButton>
            <LanguagePage
              code={selectedProgram.code}
              language={selectedProgram.language || language}
              toggleFullscreen={toggleMaximize}
              isFullscreen={isMaximized}
            />
          </>
        ) : selectedTemplate ? (
          <>
            <IconButton onClick={() => setSelectedTemplate(null)} sx={{ position: 'absolute', top: 10, left: 10 }}>
              <ArrowBack />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <TemplateBuilder templateId={selectedTemplate._id} username={username} token={token} />
            </Box>
          </>
        ) : (
          <Grid container spacing={2}>
            <TabsComponent activeTab={activeTab} handleTabChange={handleTabChange} />
            <PostContentSection
              activeTab={activeTab}
              username={username}
              token={token}
              handleProgramSelect={handleProgramSelect}
              setSelectedTemplate={handleTemplateSelect}
            />
          </Grid>
        )}
      </CreatePostModal>
    </>
  );
};

export default CreatePost;
