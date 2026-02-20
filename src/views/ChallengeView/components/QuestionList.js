// src/components/QuestionList.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import axios from 'axios';

/**
 * @param {Function} onSelectQuestion - Function to handle question selection
 */
const QuestionList = ({ onSelectQuestion }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenges/questions`, {
          headers: {
            'x-auth-token': token
          }
        });
        setQuestions(res.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: '100px' }, py: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Your Questions
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        View and manage all questions you've created for challenges and hackathons.
      </Typography>

      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2c3e50' }}>
              <TableCell sx={{ color: '#fff' }}>Title</TableCell>
              <TableCell sx={{ color: '#fff' }}>Scenario</TableCell>
              <TableCell sx={{ color: '#fff' }}>Tags</TableCell>
              <TableCell sx={{ color: '#fff' }}>Visibility</TableCell>
              <TableCell sx={{ color: '#fff' }}>Level</TableCell>
              <TableCell sx={{ color: '#fff' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q) => (
              <TableRow
                key={q._id}
                hover
                onClick={() => onSelectQuestion?.(q._id)} // ⬅️ delegate handling to parent
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{q.title || '-'}</TableCell>
                <TableCell>{q.scenario || '-'}</TableCell>
                <TableCell>{q.tags?.join(', ') || '-'}</TableCell>
                <TableCell>{q.visibility}</TableCell>
                <TableCell>{q.difficultyLevel || 'Unknown'}</TableCell>
                <TableCell>{q.isPosted ? 'Posted' : 'Draft'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QuestionList;
