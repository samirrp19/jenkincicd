import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Editor from '@monaco-editor/react';

const supportedLanguages = [
  { value: 'bash', label: 'Bash', extension: 'sh' },
  { value: 'python', label: 'Python', extension: 'py' },
  { value: 'javascript', label: 'JavaScript', extension: 'js' },
  { value: 'java', label: 'Java', extension: 'java' },
  { value: 'csharp', label: 'C#', extension: 'cs' },
  { value: 'go', label: 'Go', extension: 'go' },
  { value: 'php', label: 'PHP', extension: 'php' },
  { value: 'ruby', label: 'RUBY', extension: 'rb' },
];

const LanguageEditorPanel = ({
  language,
  setLanguage,
  code,
  setCode,
  currentFile,
  setCurrentFile,
  setFiles,
}) => {
  const ext = supportedLanguages.find(l => l.value === language)?.extension || 'txt';

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    const newExt = supportedLanguages.find(l => l.value === lang)?.extension || 'txt';
    const newFile = `main.${newExt}`;
    setLanguage(lang);
    setCurrentFile(newFile);
    setFiles([{ name: newFile, content: '' }]);
    setCode('');
  };

  return (
    <Box sx={{ width: '65%', backgroundColor: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Button variant="contained" sx={{ mr: 1 }}>{currentFile}</Button>
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel sx={{ color: '#fff' }}>Language</InputLabel>
          <Select value={language} onChange={handleLanguageChange} sx={{ color: '#fff' }}>
            {supportedLanguages.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(v) => setCode(v)}
        options={{ selectOnLineNumbers: true, automaticLayout: true }}
      />
    </Box>
  );
};

export default LanguageEditorPanel;
