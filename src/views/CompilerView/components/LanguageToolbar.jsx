// components/Language/LanguageToolbar.jsx
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  IconButton,
} from '@mui/material';
import { FaUpload, FaRobot, FaPlay, FaExpand, FaCompress } from 'react-icons/fa';
import { AiOutlineSave, AiOutlineBulb } from 'react-icons/ai';
import { MdTask } from 'react-icons/md';
import { supportedLanguages } from '../utils/languageOptions';

const LanguageToolbar = ({
  currentFile,
  selectedLanguage,
  handleLanguageChange,
  handleFileUpload,
  onAITutor,
  onSave,
  onPrompt,
  onTask,
  onRun,
  onToggleFullscreen,
  isFullscreen
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Button variant="contained" sx={{ mr: 1 }}>{currentFile}</Button>
      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel sx={{ color: '#fff' }}>Language</InputLabel>
        <Select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          sx={{ color: '#fff' }}
        >
          {supportedLanguages.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title="Upload File">
        <IconButton component="label">
          <FaUpload />
          <input
            hidden
            type="file"
            accept=".js,.py,.java,.go,.cs,.php,.sh"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="AI Tutor"><IconButton onClick={onAITutor}><FaRobot /></IconButton></Tooltip>
      <Tooltip title="Save"><IconButton onClick={onSave}><AiOutlineSave /></IconButton></Tooltip>
      <Tooltip title="Prompt"><IconButton onClick={onPrompt}><AiOutlineBulb /></IconButton></Tooltip>
      <Tooltip title="Tasks"><IconButton onClick={onTask}><MdTask /></IconButton></Tooltip>
      <Button variant="contained" color="error" onClick={onRun} sx={{ ml: 2 }}><FaPlay /> Run</Button>
      <Button variant="outlined" onClick={onToggleFullscreen} sx={{ ml: 1 }}>
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </Button>
    </Box>
  );
};

export default LanguageToolbar;