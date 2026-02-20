import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import HtmlEditor from 'plugins/editor/html/HtmlEditor';
import CssEditor from 'plugins/editor/css/CssEditor';
import JavascriptEditor from 'plugins/editor/javascript/JavascriptEditor';
// import Viewer from 'plugins/viewer/Viewer';
import Split from 'react-split';
import ToolbarHeader from './ToolbarHeader';
import { saveTemplate } from 'services/templateService'; 
import useAuth from 'hooks/useAuth'; 
import { Modal, Typography, TextField, Button } from '@mui/material';

const ProjectBuilderApp = () => {
  const theme = useTheme();
  const { token, user } = useAuth(); 
  const username = user?.username;

  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleSaveTemplate = async () => {
    if (!templateName) {
      alert('Please provide a template name.');
      return;
    }

    try {
      await saveTemplate(templateName, htmlCode, cssCode, jsCode, token, username);
      alert('Template saved successfully!');
      setSaveModalOpen(false); 
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save the template.');
    }
  };

  return (
    <>
      <ToolbarHeader
        onAiTutorClick={() => console.log('AI Tutor clicked')}
        onTemplatesClick={() => console.log('Templates clicked')}
        onSaveClick={() => setSaveModalOpen(true)} 
        onEditClick={() => console.log('Edit clicked')}
        onPromptsClick={() => console.log('Prompts clicked')}
        onTasksClick={() => console.log('Tasks clicked')}
        setHtmlCode={setHtmlCode}  
        setCssCode={setCssCode}    
        setJsCode={setJsCode}      
        htmlCode={htmlCode}        
        cssCode={cssCode}          
        jsCode={jsCode}            
      />

      <Box
        bgcolor={'alternate.main'}
        position={'relative'}
        padding={4}
        sx={{
          minHeight: 'calc(100vh - 100px)', 
          overflowY: 'auto', 
        }}
      >
        <Split
          direction="vertical"
          sizes={[50, 50]}  
          minSize={100}  
          style={{ minHeight: '100%' }}  
          gutterSize={10}  
          gutterAlign="center"
        >
          <Split
            sizes={[33, 33, 33]}  
            minSize={100}  
            direction="horizontal"
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '400px', 
              flex: 'none', 
            }}
            gutterSize={10}  
          >
            <Box sx={{ height: '100%' }}>
              <HtmlEditor value={htmlCode} onChange={setHtmlCode} editorHeight={'400px'} />
            </Box>

            <Box sx={{ height: '100%' }}>
              <CssEditor value={cssCode} onChange={setCssCode} editorHeight={'400px'} />
            </Box>

            <Box sx={{ height: '100%' }}>
              <JavascriptEditor value={jsCode} onChange={setJsCode} editorHeight={'400px'} />
            </Box>
          </Split>

          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 3,
              padding: 2,
              height: '400px',  
              overflowY: 'auto', 
            }}
          >
            {/* <Viewer htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} /> */}
          </Box>
        </Split>
      </Box>

      <Modal open={isSaveModalOpen} onClose={() => setSaveModalOpen(false)}>
        <Box sx={{ padding: 3, backgroundColor: 'white', margin: '20% auto', maxWidth: 400, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Save Template</Typography>
          <TextField
            label="Template Name"
            fullWidth
            variant="outlined"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button onClick={() => setSaveModalOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectBuilderApp;
