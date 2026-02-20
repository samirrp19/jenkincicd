import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Badge,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadModal from 'components/common/Modals/UploadModal'; 
import NewFileModal from 'components/common/Modals/NewFileModal';
import FileViewerModal from 'components/common/Modals/FileViewerModal';
import StoreAlert from 'components/common/Alerts/StoreAlert'; 
import fetchUserDocuments from 'services/documentCollector'; // Import service for fetching documents

const DocStoreContainer = ({ token, username }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');

  // Modal state for Upload and New File modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNewFileModal, setShowNewFileModal] = useState(false);

  // Fetch files when component mounts
  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true); 
      try {
        const fetchedFiles = await fetchUserDocuments(username, token);
        setFiles(fetchedFiles);
        setError(''); // Clear any previous error
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    loadFiles();
  }, [username, token]);

  const handleViewFile = (file, editMode = false) => {
    setSelectedFile(file);
    setIsEditMode(editMode);
    setShowViewer(true);
  };

  const handleCloseViewer = () => {
    setShowViewer(false);
    setSelectedFile(null);
    setIsEditMode(false);
  };

  const toggleViewMode = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const renderFileTitle = (documentName) => {
    if (!documentName || documentName.trim() === '') return 'Untitled';
    return documentName.split('.').slice(0, -1).join('.');
  };

  // Handle upload action
  const handleUpload = (document) => {
    if (document) {
      setFiles([document, ...files]);
      setAlert({ show: true, variant: 'success', message: 'File uploaded successfully' });
    } else {
      setAlert({ show: true, variant: 'error', message: 'Upload error' });
    }
  };

  // Handle new file creation action
  const handleNewFileCreate = (newFile) => {
    if (newFile) {
      setFiles([newFile, ...files]);
      setAlert({ show: true, variant: 'success', message: 'New file created successfully' });
    } else {
      setAlert({ show: true, variant: 'error', message: 'Error creating file' });
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      {alert.show && (
        <StoreAlert variant={alert.variant} message={alert.message} onClose={handleAlertClose} />
      )}

      {/* Action Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<CreateNewFolderIcon />}
            onClick={() => setShowNewFileModal(true)} 
            sx={{
              opacity: 0.6,
              '&:hover': {
                backgroundColor: '#f2f6f7',
                opacity: 1,
              },
              transition: 'opacity 0.3s',
            }}
          >
            Create
          </Button>

          <Button
            startIcon={<CloudUploadIcon />}
            onClick={() => setShowUploadModal(true)} 
            sx={{
              opacity: 0.6,
              '&:hover': {
                backgroundColor: '#f2f6f7',
                opacity: 1,
              },
              transition: 'opacity 0.3s',
            }}
          >
            Upload
          </Button>
        </Box>

        <Box>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={toggleViewMode}
            aria-label="view mode"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {files.map((file, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{renderFileTitle(file.documentName)}</Typography>
                  <Badge>{file.mimeType}</Badge>
                  <Typography variant="body2" color="textSecondary">
                    Last modified: {new Date(file.uploadedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleViewFile(file)}>
                    View
                  </Button>
                  <Button size="small" onClick={() => handleViewFile(file, true)}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {files.map((file, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <Box>
                <Typography variant="h6">{renderFileTitle(file.documentName)}</Typography>
                <Badge>{file.mimeType}</Badge>
                <Typography variant="body2" color="textSecondary">
                  Last modified: {new Date(file.uploadedAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Button size="small" onClick={() => handleViewFile(file)}>
                  View
                </Button>
                <Button size="small" onClick={() => handleViewFile(file, true)}>
                  Edit
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {selectedFile && (
        <FileViewerModal
          show={showViewer}
          handleClose={handleCloseViewer}
          documentId={selectedFile._id}
          documentName={selectedFile.documentName}
          mimeType={selectedFile.mimeType}
          token={token}
          username={username}
          editMode={isEditMode}
        />
      )}

      {/* Upload Modal */}
      <UploadModal
        show={showUploadModal}
        handleClose={() => setShowUploadModal(false)}
        handleUpload={handleUpload}
        username={username}
        token={token}
      />

      {/* New File Modal */}
      <NewFileModal
        show={showNewFileModal}
        handleClose={() => setShowNewFileModal(false)}
        handleSave={handleNewFileCreate}
        username={username}
        token={token}
      />
    </Box>
  );
};

export default DocStoreContainer;
