import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress, Card, CardMedia, CardActions, IconButton, Button, Modal,
  FormControl, MenuItem, Select, InputLabel, Tooltip
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchUserTemplates } from 'services/templateService';

const TemplateContainer = ({ username, token }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState({}); // Store group for each template
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openDocModal, setOpenDocModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null); // Store the currently viewed template

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

  const handleOpenPreviewModal = (template) => {
    setCurrentTemplate(template);
    setOpenPreviewModal(true);
  };

  const handleOpenDocModal = (template) => {
    setCurrentTemplate(template);
    setOpenDocModal(true);
  };

  const handleOpenShareModal = (template) => {
    setCurrentTemplate(template);
    setOpenShareModal(true);
  };

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const handleShare = (templateId) => {
    console.log('Shared Template ID:', templateId, 'in group:', selectedGroup[templateId]);
    // Implement the logic to share the template in the selected group.
    setOpenShareModal(false); // Close share modal after sharing
  };

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
                onClick={() => handleOpenPreviewModal(template)}
              >
                View
              </Button>
            </Box>
            {/* Template Information */}
            <CardActions sx={{ justifyContent: 'space-between', padding: 1 }}>
              {/* Share Icon and Download Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Share Icon - Opens Share Modal */}
                <Tooltip title="Share Template" arrow>
                  <IconButton size="small" color="primary" onClick={() => handleOpenShareModal(template)}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>

                {/* Download Icon - Downloads HTML Template */}
                <Tooltip title="Download HTML Template" arrow>
                  <IconButton size="small" color="primary" onClick={() => handleDownload(template.fileUrl)}>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* View Document */}
              <Button size="small" onClick={() => handleOpenDocModal(template)}>
                View Document
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      {/* Template Preview Modal */}
      <Modal open={openPreviewModal} onClose={() => setOpenPreviewModal(false)}>
        <Box sx={{ width: '80%', height: '80%', bgcolor: 'background.paper', p: 4, margin: 'auto', mt: 5 }}>
          {currentTemplate && (
            <img
              src={currentTemplate.thumbnailUrl} // Render the image directly using an img tag
              alt={currentTemplate.templateName}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Adjust image styling for the modal
            />
          )}
        </Box>
      </Modal>

      {/* Document Viewer Modal */}
      <Modal open={openDocModal} onClose={() => setOpenDocModal(false)}>
        <Box sx={{ width: '80%', height: '80%', bgcolor: 'background.paper', p: 4, margin: 'auto', mt: 5 }}>
          {currentTemplate && (
            <>
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(currentTemplate.documentationUrl)}`} // Open DOCX in Microsoft Office viewer
                style={{ width: '100%', height: '100%' }}
                title={`${currentTemplate.templateName} - Documentation`}
                frameBorder="0"
              ></iframe>
              {/* Footer with Download Button */}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownload(currentTemplate.documentationUrl)}
                >
                  Download Document
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Share Modal */}
      <Modal open={openShareModal} onClose={() => setOpenShareModal(false)}>
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, margin: 'auto', mt: 5, borderRadius: '8px' }}>
          {currentTemplate && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Share {currentTemplate.templateName}
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Group</InputLabel>
                <Select
                  value={selectedGroup[currentTemplate._id] || ''}
                  onChange={(e) =>
                    setSelectedGroup((prev) => ({
                      ...prev,
                      [currentTemplate._id]: e.target.value,
                    }))
                  }
                  displayEmpty
                  autoWidth
                  label="Group"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="group1">Group 1</MenuItem>
                  <MenuItem value="group2">Group 2</MenuItem>
                  <MenuItem value="group3">Group 3</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleShare(currentTemplate._id)}
                >
                  Share
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default TemplateContainer;
