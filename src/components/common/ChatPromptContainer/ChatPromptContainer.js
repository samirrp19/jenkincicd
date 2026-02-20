import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, IconButton, Tooltip, CircularProgress, Select, MenuItem, FormControl, InputLabel, Paper, TextareaAutosize, Collapse
} from '@mui/material';
import { FaUpload, FaPaperPlane, FaPlay } from 'react-icons/fa';
import { io } from 'socket.io-client';
import useAuth from 'hooks/useAuth';
import Editor from '@monaco-editor/react';
import compilerService from 'services/compilerService';

const wsUrl = process.env.REACT_APP_WS_URL;

const supportedLanguages = [
  { value: 'bash', label: 'Bash' },
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' }
];

const ChatPromptContainer = ({ language: initialLanguage = 'python', onCodeGenerated }) => {
  const { user, token } = useAuth();
  const socketRef = useRef(null);
  const programBuffer = useRef('');
  const endRef = useRef(null);

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (!token || !user?.id) return;

    const socket = io(wsUrl, {
      transports: ['websocket'],
      query: { token }
    });

    socketRef.current = socket;

    socket.on('connect', () => console.log('✅ Socket connected:', socket.id));
    socket.on('program_file_stream', ({ file }) => {
      if (file?.content) {
        programBuffer.current += file.content;
        setCode(programBuffer.current);
        if (onCodeGenerated) onCodeGenerated(programBuffer.current);
        scrollToBottom();
      }
    });
    socket.on('stream_complete', () => setLoading(false));
    socket.on('stream_error', ({ error }) => {
      console.error('❌ Stream error:', error);
      setLoading(false);
    });

    return () => socket.disconnect();
  }, [token, user]);

  const handlePromptSubmit = () => {
    if (!prompt.trim() || !socketRef.current?.connected) return;
    programBuffer.current = '';
    setCode('');
    setLoading(true);
    if (onCodeGenerated) onCodeGenerated('');

    setChatMessages((prev) => [...prev, { role: 'user', content: prompt }]);

    socketRef.current.emit('generate_program_prompt', {
      user_id: user.id,
      prompt,
      framework: selectedLanguage
    });
    setPrompt('');
    scrollToBottom();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadedCode = event.target.result;
        setCode(uploadedCode);
        programBuffer.current = uploadedCode;
        if (onCodeGenerated) onCodeGenerated(uploadedCode);
      };
      reader.readAsText(file);
    }
  };

  const handleRunCode = async () => {
    try {
      const result = await compilerService.executeCode(code, selectedLanguage);
      setOutput(result);
      setShowOutput(true);
      scrollToBottom();
    } catch (err) {
      setOutput({ stdout: '', stderr: '', error: err.message });
      setShowOutput(true);
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Paper elevation={4} sx={{ width: '700px', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #eee' }}>
            <Typography variant="h6" fontWeight={600}>What can I help with?</Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Language</InputLabel>
              <Select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} label="Language">
                {supportedLanguages.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ maxHeight: '250px', overflowY: 'auto', p: 2, borderBottom: '1px solid #eee' }}>
            {chatMessages.map((msg, idx) => (
              <Box key={idx} sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{msg.role === 'user' ? 'You:' : 'AI:'}</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{msg.content}</Typography>
              </Box>
            ))}
          </Box>

          {code && (
            <Box sx={{ height: `${lineCount * 20}px`, borderTop: '1px solid #eee', borderBottom: '1px solid #eee', position: 'relative' }}>
              <Editor
                height="100%"
                language={selectedLanguage}
                theme="vs-dark"
                value={code}
                onChange={(v) => setCode(v)}
                options={{ minimap: { enabled: false }, fontSize: 14 }}
              />
              <Tooltip title="Run Code">
                <IconButton
                  onClick={handleRunCode}
                  sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, backgroundColor: '#fff', color: 'red' }}
                  size="small"
                >
                  <FaPlay size={12} />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          <Collapse in={showOutput}>
            <Box sx={{ borderTop: '1px solid #eee', p: 2, backgroundColor: '#f7f7f7' }}>
              <Typography variant="subtitle2">Output:</Typography>
              {output?.error && <Typography color="error" component="pre">{output.error}</Typography>}
              {output?.stdout && <Typography component="pre">{output.stdout}</Typography>}
              {output?.stderr && <Typography color="error" component="pre">{output.stderr}</Typography>}
            </Box>
          </Collapse>

          <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
            <TextareaAutosize
              minRows={1}
              maxRows={10}
              placeholder="Ask anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ width: '100%', resize: 'none', padding: 10, borderRadius: 20, border: '1px solid #ccc', fontFamily: 'inherit' }}
            />
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
              <IconButton component="label">
                <FaUpload />
                <input hidden type="file" accept=".js,.py,.java,.go,.cs,.php,.sh,.rb" onChange={handleFileUpload} />
              </IconButton>
              <IconButton onClick={handlePromptSubmit} disabled={loading} sx={{ backgroundColor: '#000', color: '#fff' }}>
                <FaPaperPlane />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
      <div ref={endRef} />
    </Box>
  );
};

export default ChatPromptContainer;