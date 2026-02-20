import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Projects from './Projects';
import Prompts from './Prompts';
import DocStoreContainer from './DocStoreContainer';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const MainContent = ({ activeSection, username, token, userId }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      if (activeSection === 'documents') {
        setLoading(true);
        try {
          const response = await axios.get(`${apiUrl}/api/store/${username}/documents`, {
            headers: { 'x-auth-token': token },
          });
          setFiles(response.data);
          setError('');
        } catch (error) {
          console.error('Error fetching files:', error);
          setError('Failed to load files.');
        } finally {
          setLoading(false);
        }
      }
    };

    if (activeSection !== 'documents') {
      setFiles([]);
    }

    fetchFiles();
  }, [activeSection, username, token, userId]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {activeSection === 'projects' && <Projects username={username} token={token} userId={userId}/>}
      {activeSection === 'prompts' && <Prompts username={username} token={token} />}

      {activeSection === 'documents' && (
        <>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <DocStoreContainer files={files} username={username} token={token} />
          )}
        </>
      )}

      {!['projects', 'prompts', 'documents'].includes(activeSection) && (
        <Typography>Select a section to view content</Typography>
      )}
    </Box>
  );
};

export default MainContent;
