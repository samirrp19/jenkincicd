import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const CodeComponent = ({ code }) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = () => {
    if (!code) return;

    // ✅ Clean up and format the code before copying
    const formattedCode = String(code || '')
      .replace(/\\n/g, '\n') // ✅ Convert `\n` to actual newlines
      .replace(/\\t/g, '\t') // ✅ Convert `\t` to actual tabs
      .replace(/\\"/g, '"') // ✅ Fix escaped double quotes
      .replace(/\\\\/g, '\\') // ✅ Fix backslashes
      .replace(/^"|"$/g, '') // ✅ Remove leading and trailing double quotes
      .replace(/\\'/g, "'"); // ✅ Fix single quotes escape

    navigator.clipboard.writeText(formattedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!code) return null;

  // ✅ Clean up and format code for display
  let formattedCode = String(code || '')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/^"|"$/g, '')
    .replace(/\\'/g, "'");

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: '#282c34',
        color: '#fff',
        padding: 2,
        whiteSpace: 'pre-wrap',
        fontSize: '14px',
        lineHeight: '1.5',
        position: 'relative',
        overflowX: 'auto', // ✅ Ensure overflow works for long lines
      }}
    >
      <pre>
        <code ref={codeRef} className="language-javascript">
          {formattedCode || '// No code available'}
        </code>
      </pre>

      {/* ✅ Copy Button */}
      <Tooltip title={copied ? "Copied!" : "Copy to clipboard"} arrow>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#fff',
            backgroundColor: '#444',
            '&:hover': { backgroundColor: '#666' },
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CodeComponent;
