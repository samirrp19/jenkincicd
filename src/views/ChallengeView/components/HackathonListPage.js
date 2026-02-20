// src/views/HackathonListPage.js
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';
import axios from 'axios';

const skillTests = [
  { name: 'Python Online Test & Quiz', duration: '1 Hrs 30 Min', questions: 30, participants: 40480 },
  { name: 'Java Online Test & Quiz', duration: '1 Hrs 30 Min', questions: 30, participants: 36880 },
  { name: 'C language online test', duration: '1 Hrs 30 Min', questions: 30, participants: 29228 },
  { name: 'C++ Online Test and Quiz', duration: '1 Hrs 30 Min', questions: 30, participants: 23939 },
  { name: 'SQL Online Test and Quiz', duration: '1 Hrs', questions: 17, participants: 11458 },
  { name: 'Operating Systems Skill Test', duration: '45 Min', questions: 30, participants: 7458 },
  { name: 'DSA in C test', duration: '2 Hrs', questions: 28, participants: 6096 }
];

const HackathonListPage = ({ onSelectHackathon }) => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/challenges/hackathons/public`);
        setHackathons(res.data.results);
      } catch (err) {
        console.error('Failed to fetch hackathons', err);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 0 }, py: 3 }}>

      <Typography variant="h5" gutterBottom>Upcoming Contests</Typography>
      <TableContainer component={Paper} sx={{ mb: 6 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2c3e50' }}>
              <TableCell sx={{ color: '#fff' }}>Code</TableCell>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Start</TableCell>
              <TableCell sx={{ color: '#fff' }}>Duration</TableCell>
              <TableCell sx={{ color: '#fff' }}>Starts in</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hackathons.map((hackathon, index) => {
              const durationHours = Math.round((new Date(hackathon.endDate) - new Date(hackathon.startDate)) / (1000 * 60 * 60));
              const timeDiff = Math.max(0, new Date(hackathon.startDate) - new Date());
              const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
              return (
                <TableRow
                  key={index}
                  hover
                  onClick={() => onSelectHackathon?.(hackathon)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{hackathon._id.slice(-6).toUpperCase()}</TableCell>
                  <TableCell>{hackathon.title}</TableCell>
                  <TableCell>{new Date(hackathon.startDate).toLocaleString()}</TableCell>
                  <TableCell>{durationHours} Hrs</TableCell>
                  <TableCell>{days} Days {hours} Hrs</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Top Skill Tests <span style={{ backgroundColor: '#ffc107', borderRadius: 5, padding: '2px 6px', fontSize: '0.75rem', marginLeft: 6 }}>New</span>
      </Typography>
      <Typography variant="body2" mb={2}>
        Test your knowledge in Python, C, C++, and Java and DSA concepts. Skill tests help you check your industry readiness.
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2c3e50' }}>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Duration</TableCell>
              <TableCell sx={{ color: '#fff' }}>Questions</TableCell>
              <TableCell sx={{ color: '#fff' }}>Participants</TableCell>
              <TableCell sx={{ color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skillTests.map((test, index) => (
              <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
                <TableCell>{test.name}</TableCell>
                <TableCell>{test.duration}</TableCell>
                <TableCell>{test.questions}</TableCell>
                <TableCell>{test.participants}</TableCell>
                <TableCell>→</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box textAlign="center">
        <Button variant="contained" color="primary">View all skill tests</Button>
      </Box>
    </Box>
  );
};

export default HackathonListPage;
