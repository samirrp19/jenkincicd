import React, { useState } from 'react';
import axios from "axios";

import {
  Modal, Box, Typography, TextField, Button, IconButton, Avatar,
  Divider, List, ListItem, ListItemAvatar, ListItemText,
  Radio, RadioGroup, FormControlLabel, Checkbox
} from '@mui/material';
import {
  Close, PhotoCamera, ArrowBack, Videocam, People,
  Person, Public, Group, Lock, ZoomOutMap
} from '@mui/icons-material';

import MediaFolderTabs from './MediaFolderTabs';
import MediaSliderModal from './MediaSliderModal';
import SelectedScreenshotGrid from './SelectedScreenshotGrid';
import SelectedMediaGrid from './SelectedMediaGrid';
import PostPreviewModal from './PostPreviewModal';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  height: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle = {
  p: 2,
  borderBottom: '1px solid #eee',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const topFixed = {
  px: 3,
  pt: 2,
  pb: 1,
  borderBottom: '1px solid #f0f0f0',
};

const mediaScrollable = {
  flex: 1,
  overflowY: 'auto',
  px: 3,
  py: 2,
};

const footerStyle = {
  borderTop: '1px solid #eee',
  px: 3,
  pt: 2,
  pb: 3,
};

const audienceOptions = [
  { value: 'public', label: 'Public', description: 'Anyone on or off platform', icon: <Public /> },
  { value: 'friends', label: 'Friends', description: 'Your friends on platform', icon: <People /> },
  { value: 'groups', label: 'Groups', description: 'Specific groups on platform', icon: <Group /> },
  { value: 'specific_friends', label: 'Specific friends', description: 'Only selected friends', icon: <Person /> },
  { value: 'only_me', label: 'Only Me', description: 'Only you can see this post', icon: <Lock /> },
];

const CreatePostModal = ({ open, handleClose, token, userId, projectId, templateId , username, workspace}) => {
  const [description, setDescription] = useState('');
  const [modalState, setModalState] = useState('default');
  const [audience, setAudience] = useState('public');
  const [defaultAudience, setDefaultAudience] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState({ screenshots: [], recordings: [] });

  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleAddMedia = () => setMediaModalOpen(true);
  const resetMedia = () => setSelectedMedia({ screenshots: [], recordings: [] });

  const handleTagSelect = (friend) => {
    setSelectedTags((prev) =>
      prev.includes(friend) ? prev.filter((f) => f !== friend) : [...prev, friend]
    );
  };

  const hasMedia = selectedMedia.screenshots.length > 0 || selectedMedia.recordings.length > 0;
  const isValid = description.trim().length > 0 && hasMedia;
  
  const handleCreatePost = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/${username}/post/create`;
  
      const payload = {
        projectId,
        workspace,
        description,
        overrideThumbnail: selectedMedia?.screenshots?.[0]?.url || '',
        screenshots: selectedMedia?.screenshots?.map(s => s.url),
        recordings: selectedMedia?.recordings?.map(r => r.url),
        tags: selectedTags,
        visibility: audience, // ✅ include visibility explicitly
      };
  
      const response = await axios.post(url, payload, {
        headers: { 'x-auth-token': token }
      });
  
      console.log('✅ Post created:', response.data.post);
      handleClose(); // Close modal
      // Optional: trigger refresh
    } catch (err) {
      console.error('❌ Post creation failed:', err);
    }
  };    

  return (
    <>
      <Modal open={open} onClose={handleClose} sx={{ zIndex: 10000 }}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Box sx={headerStyle}>
            {modalState !== 'default' ? (
              <IconButton onClick={() => setModalState('default')}><ArrowBack /></IconButton>
            ) : <Box />}
            <Typography variant="h6">
              {modalState === 'audience' ? 'Post Audience' : modalState === 'tag' ? 'Tag People' : 'Create Post'}
            </Typography>
            <Box>
              <IconButton><ZoomOutMap /></IconButton>
              <IconButton onClick={handleClose}><Close /></IconButton>
            </Box>
          </Box>

          {modalState === 'default' && (
            <>
              {/* Fixed Top: Avatar + Text Input */}
              <Box sx={topFixed}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>Your Name</Typography>
                    <Button
                      startIcon={<Person />}
                      size="small"
                      onClick={() => setModalState('audience')}
                    >
                      {audienceOptions.find(opt => opt.value === audience)?.label}
                    </Button>
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={10}
                  sx={{ mt: 2 }}
                  placeholder="What's on your mind?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>

              {/* Scrollable Media */}
              <Box sx={mediaScrollable}>
                <SelectedMediaGrid
                  media={[
                    ...selectedMedia.screenshots,
                    ...selectedMedia.recordings,
                  ]}
                  onClickImage={(index) => {
                    setSliderStartIndex(index);
                    setSliderOpen(true);
                  }}
                  onReset={resetMedia}
                  onAdd={handleAddMedia}
                />
              </Box>
              {/* Footer */}
              <Box sx={footerStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
                  <Button startIcon={<PhotoCamera />} onClick={handleAddMedia}>Photo</Button>
                  <Button startIcon={<Videocam />} onClick={handleAddMedia}>Video</Button>
                  <Button startIcon={<People />} onClick={() => setModalState('tag')}>Tag People</Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    disabled={!isValid}
                    onClick={() => setPreviewOpen(true)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!isValid}
                    onClick={handleCreatePost}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </>
          )}

          {/* Audience View */}
          {modalState === 'audience' && (
            <Box sx={mediaScrollable}>
              <Typography sx={{ mt: 2, mb: 1 }}>Who can see your post?</Typography>
              <RadioGroup value={audience} onChange={(e) => setAudience(e.target.value)}>
                {audienceOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {option.icon}
                          <Typography sx={{ ml: 1 }}>{option.label}</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ ml: 4 }}>{option.description}</Typography>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <FormControlLabel
                  control={<Checkbox checked={defaultAudience} onChange={() => setDefaultAudience(!defaultAudience)} />}
                  label="Set as default audience"
                />
                <Button variant="contained" onClick={() => setModalState('default')}>Done</Button>
              </Box>
            </Box>
          )}

          {/* Tagging View */}
          {modalState === 'tag' && (
            <Box sx={mediaScrollable}>
              <List sx={{ mt: 2 }}>
                {["John Doe", "Jane Smith", "Bob Johnson"].map((friend) => (
                  <ListItem button key={friend} onClick={() => handleTagSelect(friend)}>
                    <ListItemAvatar><Avatar /></ListItemAvatar>
                    <ListItemText primary={friend} />
                    <Checkbox checked={selectedTags.includes(friend)} />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => setModalState('default')}>
                Done
              </Button>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Media Viewer */}
      {sliderOpen && (
        <MediaSliderModal
          open={sliderOpen}
          onClose={() => setSliderOpen(false)}
          items={selectedMedia.screenshots}
          startIndex={sliderStartIndex}
        />
      )}

      {/* Media Picker Modal */}
      <Modal open={mediaModalOpen} onClose={() => setMediaModalOpen(false)} sx={{ zIndex: 11000 }}>
        <Box sx={{ ...modalStyle, width: 700 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Select Media</Typography>
          <MediaFolderTabs
            userId={userId}
            projectId={projectId}
            templateId={templateId}
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
          />
          <Box sx={{ textAlign: 'right', mt: 3 }}>
            <Button variant="contained" onClick={() => setMediaModalOpen(false)}>Done</Button>
          </Box>
        </Box>
      </Modal>

      {/* Preview Modal */}
      <PostPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        description={description}
        screenshots={selectedMedia.screenshots}
        recordings={selectedMedia.recordings}
        audienceLabel={audienceOptions.find((a) => a.value === audience)?.label}
        taggedUsers={selectedTags}
      />

    </>
  );
};

export default CreatePostModal;
