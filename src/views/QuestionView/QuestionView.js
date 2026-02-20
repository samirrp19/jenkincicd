import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Paper,
  Button,
  MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import TabSection from './components/question/TabSection';
import MonacoEditorComponent from './components/page/MonacoEditorComponent';
import ChatPromptContainer from 'components/common/ChatPromptContainer/ChatPromptContainer';
import compilerService from 'services/compilerService';

const supportedLanguages = [
  { value: 'bash', label: 'Bash' },
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

const QuestionView = ({ questionId, onBack }) => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [editorCode, setEditorCode] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenges/questions/${questionId}`);
        setQuestionData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch the question');
      } finally {
        setLoading(false);
      }
    };

    if (questionId) fetchData();
  }, [questionId]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>Loading question...</Typography>
      </Box>
    );
  }

  if (error || !questionData) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
        {error || 'No question data available'}
      </Typography>
    );
  }

  const questionShortId = `Q-${questionData._id.slice(-4)}`;

  const handleSubmitCode = async () => {
    try {
      const result = await compilerService.executeCode(editorCode, selectedLanguage);
      alert(`Output:\n${result.stdout || result.stderr || result.error}`);
    } catch (err) {
      alert(`Error:\n${err.message}`);
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed Header */}
      <Box position="fixed" top={0} width="100%" zIndex={10} bgcolor="white" p={2} boxShadow={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Left: Back Button + Metadata */}
          <Box display="flex" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
              sx={{ mr: 2 }}
            >
              Back to Question List
            </Button>
            <Typography variant="h5" sx={{ mr: 2, fontWeight: 'bold' }}>
              {questionShortId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Difficulty: {questionData.difficultyLevel || 'Unknown'}
            </Typography>
            <IconButton size="small">
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          {/* Right: Nav buttons */}
          <Box>
            <IconButton size="small">
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Main Grid Layout */}
      <Grid container spacing={2} sx={{ mt: '64px', height: 'calc(100vh - 64px)' }}>
        {/* Left Column: Tab content */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            height: '100%',
            overflowY: 'auto',
            borderRight: '1px solid #ddd',
            px: 2,
          }}
        >
          <TabSection
            tabContent={[
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={600}>{questionData.title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {questionData.description}
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} mt={2}>
                  Scenario:
                </Typography>
                <Typography variant="body1">{questionData.scenario}</Typography>
              </Paper>,
              'No hints available.',
              'No submissions yet.',
              'No solutions submitted.',
              'No doubts raised.',
              <Box sx={{ height: '100%' }}>
                <ChatPromptContainer
                  language={selectedLanguage}
                  onCodeGenerated={(code) => setEditorCode(code)}
                />
              </Box>
            ]}
          />
        </Grid>

        {/* Right Column: Code Editor */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            px: 2
          }}
        >
          <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
            <MonacoEditorComponent
              code={editorCode}
              language={selectedLanguage}
              onChange={setEditorCode}
              onLanguageChange={setSelectedLanguage}
              languages={supportedLanguages}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, alignSelf: 'flex-start' }}
            onClick={handleSubmitCode}
          >
            Submit Code
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionView;
