import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ChallengeRightSidebar = ({ questions }) => (
  <Box p={2} pt={10}>
    <Typography variant="h6" mb={2}>Your Questions</Typography>
    <Typography variant="body2" color="textSecondary" mb={2}>
      View and manage all questions you've created for challenges and hackathons.
    </Typography>

    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Title</Typography>
        <Box sx={{ mt: 1, maxHeight: 200, overflowY: 'auto' }}>
          {questions.map((q) => (
            <Typography
              key={q._id}
              variant="body2"
              sx={{
                my: 0.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {q.title}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default ChallengeRightSidebar;
