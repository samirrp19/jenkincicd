import React from 'react';
import {
  Box, Typography, Button, Grid, LinearProgress, Divider, Card, CardContent, Avatar,
  List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import languageCourseContent from '../data/languageCourseContent';

const CourseDetailsPage = ({ course, onBack }) => {
  const content = languageCourseContent[course.slug];

  if (!content) return <Typography>Course content not found.</Typography>;

  return (
    <Box sx={{ backgroundColor: '#fff', px: '100px', py: 4 }}>
      {/* Breadcrumb */}
      <Typography variant="body2" color="text.secondary" mb={1}>
        {content.breadcrumb}
      </Typography>

      {/* Course Header */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar src={content.icon} sx={{ width: 50, height: 50 }} />
        <Box>
          <Typography variant="h4">{content.title}</Typography>
          <Typography color="text.secondary">{content.description}</Typography>
        </Box>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={2} mb={3}>
        <Grid item>
          <Typography>
            <StarIcon sx={{ verticalAlign: 'middle', color: 'gold' }} /> {content.stats.rating}
            <span style={{ color: 'gray' }}> ({content.stats.reviews} reviews)</span>
          </Typography>
        </Grid>
        <Grid item><Typography>{content.stats.problems} Problems</Typography></Grid>
        <Grid item><Typography>{content.stats.level}</Typography></Grid>
        <Grid item><Typography>{content.stats.learners} Learners</Typography></Grid>
      </Grid>

      {/* Action Button */}
      <Button variant="contained" size="large" sx={{ mb: 3 }}>Start Practice</Button>

      {/* Progress */}
      <Box mb={2}>
        <Typography variant="body1">Your Progress :</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress variant="determinate" value={0} />
          </Box>
          <Typography>0%</Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Problem List */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" mb={2}>Problems</Typography>
          {content.problemsList.map((section, index) => (
            <Card variant="outlined" key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>{index + 1}. {section.sectionTitle}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>{section.sectionDescription}</Typography>
                <Divider />
                <List>
                  {section.problems.map((problem, i) => (
                    <ListItem key={i} divider>
                      <ListItemText primary={problem} />
                      <Typography variant="body2">Easy</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Prerequisite */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" mb={1}>Prerequisite course</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={content.prerequisite.icon} />
                <Box>
                  <Typography variant="subtitle1">{content.prerequisite.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{content.prerequisite.rating}</Typography>
                  <Typography variant="caption">{content.prerequisite.meta}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Roadmap */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" mb={2}>
                This path is a part of <b>{content.roadmap.title}</b>
              </Typography>
              {content.roadmap.tracks.map((track, idx) => (
                <React.Fragment key={idx}>
                  <Accordion disableGutters elevation={0} square>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight={600}>{track.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">{track.courses} courses</Typography>
                    </AccordionDetails>
                  </Accordion>
                  {idx !== content.roadmap.tracks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              <Divider sx={{ my: 1 }} />
              <Button size="small" fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                View Roadmap <ChevronRightIcon sx={{ ml: 1 }} />
              </Button>
            </CardContent>
          </Card>

          {/* Testimonial */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2" mb={1}>{content.testimonial.text}</Typography>
              <Typography variant="caption">{content.testimonial.name}</Typography>
              <Typography variant="caption" sx={{ display: 'block' }}>{content.testimonial.role}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <StarIcon sx={{ fontSize: 16, verticalAlign: 'middle', color: 'gold' }} /> {content.testimonial.rating}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetailsPage;
