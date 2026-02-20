import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import HtmlEditor from 'plugins/editor/html/HtmlEditor';
import CssEditor from 'plugins/editor/css/CssEditor';
import JavascriptEditor from 'plugins/editor/javascript/JavascriptEditor';
import Viewer from 'plugins/viewer/Viewer';
import BuilderToolbar from './BuilderToolbar'; // Vertical toolbar component
import Split from 'react-split';
import { fetchTemplateContent, saveTemplate } from 'services/templateService'; // Assuming saveTemplate is defined here

const TemplateBuilder = ({ templateId, username, token }) => {
  const theme = useTheme();

  // State for editor contents
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  // Function to load the template content
  const loadTemplate = useCallback(async (templateId) => {
    if (templateId) {
      try {
        const { htmlContent, cssContent, jsContent } = await fetchTemplateContent(templateId, username, token);
        setHtmlCode(htmlContent || '');
        setCssCode(cssContent || '');
        setJsCode(jsContent || '');
      } catch (error) {
        console.error('Error loading template:', error);
      }
    }
  }, [username, token]);

  // Load template when templateId changes
  useEffect(() => {
    loadTemplate(templateId);
  }, [templateId, loadTemplate]);

  // Function to save the template
  const handleSaveTemplate = async () => {
    try {
      await saveTemplate({
        htmlContent: htmlCode,
        cssContent: cssCode,
        jsContent: jsCode,
        username,
        token,
      });
      alert('Template saved successfully');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template');
    }
  };

  const editorHeight = '200px';

  return (
    <Box display="flex" height="100vh" bgcolor={'alternate.main'}>
      {/* First Column: Vertical Toolbar */}
      <Box
        sx={{
          width: '60px',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '20px',
          paddingBottom: '20px',
          boxShadow: 2,
        }}
      >
        <BuilderToolbar onSave={handleSaveTemplate} />
      </Box>

      {/* Second Column: Editors */}
      <Box
        sx={{
          flex: 3,
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          overflowY: 'auto',
          height: '100vh', // Ensure it occupies full height
        }}
      >
        <Split
          direction="vertical"
          sizes={[33, 33, 33]} // Each editor gets equal space
          minSize={100}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Editors take full height
          }}
          gutterSize={10} // Space between editors
        >
          {/* HTML Editor */}
          <Box
            sx={{
              height: editorHeight,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              flex: 'none',
            }}
          >
            <HtmlEditor value={htmlCode} onChange={setHtmlCode} editorHeight={editorHeight} />
          </Box>

          {/* CSS Editor */}
          <Box
            sx={{
              height: editorHeight,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              flex: 'none',
            }}
          >
            <CssEditor value={cssCode} onChange={setCssCode} editorHeight={editorHeight} />
          </Box>

          {/* JavaScript Editor */}
          <Box
            sx={{
              height: editorHeight,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              flex: 'none',
            }}
          >
            <JavascriptEditor value={jsCode} onChange={setJsCode} editorHeight={editorHeight} />
          </Box>
        </Split>
      </Box>

      {/* Third Column: Viewer */}
      <Box
        sx={{
          flex: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
          overflowY: 'auto',
          height: '100vh', // Occupy full height
        }}
      >
        <Viewer htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
      </Box>
    </Box>
  );
};

export default TemplateBuilder;
