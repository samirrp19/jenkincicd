import React, { useState, useRef, useEffect } from 'react';
import { Button, MenuItem, FormControl, InputLabel, Select, TextField, Typography, Box } from '@mui/material';
import Editor, { loader } from '@monaco-editor/react';
import compilerService from '../../../../services/compilerService';

const languageOptions = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
];

const CodeEditor = ({
  question,
  code,
  setCode,
  language,
  setLanguage,
  // suggestions,
  // setSuggestions,
  // handleSuggestionClick,
  // fetchSuggestions,
}) => {
  const [output, setOutput] = useState({ stdout: '', stderr: '', error: '' });
  const [fileName, setFileName] = useState('');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    loader.init().then((monaco) => {
      monacoRef.current = monaco;
    });
  }, []);

  const executeCode = async () => {
    try {
      const response = await compilerService.executeCode(code, language);
      const { stdout, stderr } = response;
      setOutput({ stdout, stderr, error: '' });
      validateAnswer(stdout);
    } catch (error) {
      setOutput({ stdout: '', stderr: '', error: error.message });
    }
  };

  const validateAnswer = (stdout) => {
    if (question && question.expectedAnswer && stdout.trim() === question.expectedAnswer.trim()) {
      alert('Correct Answer!');
    } else if (question && question.expectedAnswer) {
      alert('Incorrect Answer, please try again.');
    } else {
      console.warn('No expected answer available for validation.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <Box className="code-editor" sx={{ p: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Language</InputLabel>
        <Select value={language} label="Language" onChange={(e) => setLanguage(e.target.value)}>
          {languageOptions.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              {lang.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          type="file"
          inputProps={{ accept: '.js,.py,.java,.go,.cs,.php' }}
          onChange={handleFileUpload}
          label="Upload Script"
          InputLabelProps={{ shrink: true }}
        />
        {fileName && <Typography variant="body2">Loaded file: {fileName}</Typography>}
      </FormControl>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Code</Typography>
        <Editor
          height="300px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
          }}
          editorDidMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </Box>

      <Button variant="contained" color="primary" onClick={executeCode}>
        Run Code
      </Button>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Output</Typography>
        <TextField
          fullWidth
          multiline
          rows={5}
          value={output.stdout || output.error}
          variant="outlined"
          InputProps={{ readOnly: true }}
          sx={{ mb: output.stderr ? 2 : 0 }}
        />
        {output.stderr && (
          <TextField
            fullWidth
            multiline
            rows={5}
            value={output.stderr}
            variant="outlined"
            InputProps={{ readOnly: true }}
          />
        )}
      </Box>
    </Box>
  );
};

export default CodeEditor;
