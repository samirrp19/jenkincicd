import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, IconButton, Typography, TextField,
  FormControl, InputLabel, Select, MenuItem, Tooltip, Modal
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { FaPlay, FaExpand, FaCompress, FaRobot, FaUpload } from 'react-icons/fa';
import { AiOutlineSave, AiOutlineBulb } from 'react-icons/ai';
import { MdTask } from 'react-icons/md';
import Editor from '@monaco-editor/react';
import compilerService from '../../../../services/compilerService';
import useAuth from 'hooks/useAuth';
import axios from 'axios';
import { io } from 'socket.io-client';

const apiUrl = process.env.REACT_APP_API_URL;
const wsUrl = process.env.REACT_APP_WS_URL;

const supportedLanguages = [
  { value: 'bash', label: 'Bash', extension: 'sh' },
  { value: 'python', label: 'Python', extension: 'py' },
  { value: 'javascript', label: 'JavaScript', extension: 'js' },
  { value: 'java', label: 'Java', extension: 'java' },
  { value: 'csharp', label: 'C#', extension: 'cs' },
  { value: 'go', label: 'Go', extension: 'go' },
  { value: 'php', label: 'PHP', extension: 'php' },
  { value: 'ruby', label: 'Ruby', extension: 'rb' },
];

const LanguagePage = ({ code: initialCode, language, toggleFullscreen, isFullscreen }) => {
  const { user, token } = useAuth();
  const username = user?.username;
  const [selectedLanguage, setSelectedLanguage] = useState(language || 'bash');
  const [workspace, setWorkspace] = useState('default');
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState({ stdout: '', stderr: '', error: '' });
  const [standardInput, setStandardInput] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [taskNotes, setTaskNotes] = useState('');
  const [programTitle, setProgramTitle] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [visibility, setVisibility] = useState('private');
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);
  const programBuffer = useRef("");
  const editorTheme = isDarkTheme ? 'vs-dark' : 'light';

  useEffect(() => {
    if (!token || !user?.id) return;
    const socket = io(wsUrl, { transports: ['websocket'], query: { token } });
    socketRef.current = socket;
    socket.on('connect', () => console.log('✅ Connected:', socket.id));
    socket.on('program_file_stream', ({ file }) => {
      if (file?.content) {
        programBuffer.current += file.content;
        setCode(programBuffer.current);
      }
    });
    socket.on('stream_complete', () => setLoading(false));
    socket.on('stream_error', ({ error }) => {
      console.error('Stream error:', error);
      setLoading(false);
    });
    return () => socket.disconnect();
  }, [token, user]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode('');
  };

  const executeCode = async () => {
    try {
      const response = await compilerService.executeCode(code, selectedLanguage);
      const { stdout, stderr } = response;
      setOutput({ stdout, stderr, error: '' });
    } catch (error) {
      setOutput({ stdout: '', stderr: '', error: error.message });
    }
  };

  const handleAITutor = () => {
    if (!aiPrompt.trim() || !socketRef.current?.connected) return;
    programBuffer.current = "";
    setCode('');
    setLoading(true);
    socketRef.current.emit('generate_program_prompt', {
      user_id: user.id,
      prompt: aiPrompt,
      framework: selectedLanguage
    });
  };

  const handleSaveProgram = async () => {
    try {
      const payload = {
        title: programTitle || 'Untitled',
        description: programDescription,
        code,
        language: selectedLanguage,
        framework: selectedLanguage,
        frameworkType: 'programming',
        workspace,
        tags,
        visibility,
        userId: user.id,
      };
      
      console.log('📤 Save Payload:', payload);
      
      await axios.post(`${apiUrl}/api/projects/${username}/projects/programs/save`, {
        title: programTitle || 'Untitled',
        description: programDescription,
        code,
        language: selectedLanguage,
        framework: selectedLanguage,
        frameworkType: 'programming',
        workspace,
        tags,
        visibility,
        userId: user.id,
      }, { headers: { 'x-auth-token': token } });
      setSaveModalOpen(false);
    } catch (error) {
      console.error('❌ Error saving program:', error);
    }
  };

  const inputStyle = {
    backgroundColor: isDarkTheme ? '#2a2a2a' : '#fff',
    color: isDarkTheme ? '#fff' : '#000',
    '& .MuiInputBase-input': {
      color: isDarkTheme ? '#fff' : '#000',
    },
    '& .MuiInputLabel-root': {
      color: isDarkTheme ? '#ccc' : '#333',
    },
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: isDarkTheme ? '#1e1e1e' : '#fafafa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: isDarkTheme ? '#121212' : '#f5f5f5', borderBottom: '1px solid', borderColor: isDarkTheme ? '#333' : '#ccc' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/icon.svg" alt="Codex Logo" style={{ height: 32, marginRight: 8 }} />
          <Typography variant="h6">Codex</Typography>
        </Box>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: isDarkTheme ? '#fff' : '#000' }}>{programTitle || 'Untitled'}</Typography>
        <Box>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={() => setIsDarkTheme(!isDarkTheme)} sx={{ bgcolor: '#fff', mx: 0.5 }}>{isDarkTheme ? <Brightness7 /> : <Brightness4 />}</IconButton>
          </Tooltip>
          <Tooltip title="Save">
            <IconButton onClick={() => setSaveModalOpen(true)} sx={{ bgcolor: '#fff', mx: 0.5 }}><AiOutlineSave /></IconButton>
          </Tooltip>
          <Tooltip title="Run">
            <IconButton onClick={executeCode} sx={{ bgcolor: '#fff', mx: 0.5 }}><FaPlay /></IconButton>
          </Tooltip>
          <Tooltip title="Fullscreen">
            <IconButton onClick={toggleFullscreen} sx={{ bgcolor: '#fff', mx: 0.5 }}>{isFullscreen ? <FaCompress /> : <FaExpand />}</IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Box sx={{ width: '65%', borderRight: '1px solid', borderColor: isDarkTheme ? '#444' : '#ddd' }}>
          <Box sx={{ p: 2 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: isDarkTheme ? '#ccc' : '#333' }}>Language</InputLabel>
              <Select value={selectedLanguage} onChange={handleLanguageChange} label="Language" sx={inputStyle}>
                {supportedLanguages.map((lang) => (<MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>))}
              </Select>
            </FormControl>
          </Box>
          <Editor height="calc(100% - 90px)" language={selectedLanguage} theme={editorTheme} value={code} onChange={(v) => setCode(v)} options={{ selectOnLineNumbers: true, automaticLayout: true }} />
        </Box>

        <Box sx={{ flexGrow: 1, px: 3, pb: 3, pt: 2, overflowY: 'auto', borderRight: '1px solid', borderColor: isDarkTheme ? '#333' : '#ccc' }}>
          <Typography variant="h6">Standard Input</Typography>
          <TextField fullWidth multiline rows={4} value={standardInput} onChange={(e) => setStandardInput(e.target.value)} sx={{ mb: 3, ...inputStyle }} />
          <Typography variant="h6">Output</Typography>
          <Box sx={{ backgroundColor: isDarkTheme ? '#222' : '#e0e0e0', color: isDarkTheme ? '#fff' : '#000', p: 2, borderRadius: 1 }}>
            {output.error ? (<Typography color="error" component="pre">{output.error}</Typography>) : (<><Typography component="pre">{output.stdout}</Typography><Typography color="error" component="pre">{output.stderr}</Typography></>)}
          </Box>
          <Typography variant="h6" sx={{ mt: 4 }}>AI Prompt</Typography>
          <TextField fullWidth multiline rows={3} placeholder="Ask AI to generate..." value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} sx={inputStyle} />
          <Button onClick={handleAITutor} variant="contained" sx={{ mt: 1 }} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</Button>
          <Typography variant="h6" sx={{ mt: 4 }}>Task Notes</Typography>
          <TextField fullWidth multiline rows={3} placeholder="Write tasks or notes..." value={taskNotes} onChange={(e) => setTaskNotes(e.target.value)} sx={inputStyle} />
        </Box>

        <Box sx={{ width: 60, pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: '1px solid', borderColor: isDarkTheme ? '#444' : '#ccc' }}>
          <Tooltip title="Upload File">
            <IconButton component="label" sx={{ bgcolor: '#fff', mb: 1 }}>
              <FaUpload />
              <input hidden type="file" accept=".js,.py,.java,.go,.cs,.php,.sh" />
            </IconButton>
          </Tooltip>
          <Tooltip title="AI Tutor"><IconButton sx={{ bgcolor: '#fff', mb: 1 }}><FaRobot /></IconButton></Tooltip>
          <Tooltip title="Prompt"><IconButton sx={{ bgcolor: '#fff', mb: 1 }}><AiOutlineBulb /></IconButton></Tooltip>
          <Tooltip title="Tasks"><IconButton sx={{ bgcolor: '#fff', mb: 1 }}><MdTask /></IconButton></Tooltip>
        </Box>
      </Box>

      <Modal open={saveModalOpen} onClose={() => setSaveModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6">Save Program</Typography>
          <TextField fullWidth label="Title" value={programTitle} onChange={(e) => setProgramTitle(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Description" value={programDescription} onChange={(e) => setProgramDescription(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value.split(','))} sx={{ mt: 2 }} />
          <TextField
            fullWidth
            label="Framework"
            value={selectedLanguage}
            InputProps={{ readOnly: true }}
            sx={{ mt: 2 }}
          />
          
          <TextField
            fullWidth
            label="Framework Type"
            value="programming"
            InputProps={{ readOnly: true }}
            sx={{ mt: 2 }}
          />
          
          <TextField
            fullWidth
            label="Workspace"
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            sx={{ mt: 2 }}
          />
          
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Visibility</InputLabel>
            <Select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="public">Public</MenuItem>
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleSaveProgram}>Save</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LanguagePage;