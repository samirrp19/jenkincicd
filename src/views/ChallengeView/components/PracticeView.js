import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  CardContent,
  InputBase
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import CourseDetailsPage from './CourseDetailsPage';

const practicePaths = [
  {
    title: 'Practice C++',
    slug: 'cpp',
    description: 'Solve C++ Practice problems online with the Practice C++ path on CodeChef. Answer MCQS exercise...',
    problems: 206,
    level: 'Beginner level',
    icon: '/icons/cpp.png',
    color: '#1976D2'
  },
  {
    title: 'Practice Python',
    slug: 'python',
    description: 'Solve Python coding problems online with Practice Python on CodeChef. Write code for over 19...',
    problems: 192,
    level: 'Beginner level',
    icon: '/icons/python.png',
    color: '#F9A825'
  },
  {
    title: 'Practice Java',
    slug: 'java',
    description: 'Complete your Java coding practice with our online Java practice course on CodeChef. Solve over 180...',
    problems: 181,
    level: 'Beginner level',
    icon: '/icons/java.png',
    color: '#8D6E63'
  },
  {
    title: 'Practice C',
    slug: 'c',
    description: 'Improve your C programming skills with over 200 coding practice problems. Solve these beginner...',
    problems: 222,
    level: 'Beginner level',
    icon: '/icons/c.png',
    color: '#3F51B5'
  },
  {
    title: 'Practice JavaScript',
    slug: 'javascript',
    description: 'Practice JavaScript online with our set of coding problems selected for beginners. Solve these JavaScript...',
    problems: 169,
    level: 'Beginner level',
    icon: '/icons/js.png',
    color: '#FFEB3B'
  },
  {
    title: 'Projects using HTML / CSS',
    slug: 'html-css',
    description: 'Practice HTML and CSS with our on-site editor. Code 7 guided projects to build sites. Solve MCQ exercise...',
    problems: 183,
    level: 'Beginner level',
    icon: '/icons/html.png',
    color: '#FF7043'
  },
  {
    title: 'SQL Practice Queries',
    slug: 'sql',
    description: 'Practice queries on Select, Where, Limit, Order by, Aggregates, Group by, Joins, Sub-queries and Case...',
    problems: 93,
    level: 'Intermediate level',
    icon: '/icons/sql.png',
    color: '#2196F3'
  },
  {
    title: 'Practice PHP',
    slug: 'php',
    description: 'Enhance your PHP skills with our hands-on practice course. Master PHP syntax and real-world...',
    problems: 199,
    level: 'Beginner level',
    icon: '/icons/php.png',
    color: '#7986CB'
  }
];

const projectPaths = [
  {
    title: 'Python Projects for Beginners',
    slug: 'python-projects',
    description: 'Build 11 different Python projects from Calculator to URL shortening to Json / csv file processing...',
    problems: 88,
    level: 'Intermediate level',
    icon: '/icons/python.png',
    color: '#F9A825'
  },
  {
    title: 'Java Projects for Beginners',
    slug: 'java-projects',
    description: 'Build 6 different Java projects from Calculator to Rock Paper Scissors using our beginner friendly...',
    problems: 48,
    level: 'Intermediate level',
    icon: '/icons/java.png',
    color: '#8D6E63'
  },
  {
    title: 'C++ Projects for Beginners',
    slug: 'cpp-projects',
    description: 'Build 6 different Cpp projects from Calculator to Rock Paper Scissors using our beginner friendly...',
    problems: 48,
    level: 'Intermediate level',
    icon: '/icons/cpp.png',
    color: '#1976D2'
  },
  {
    title: 'Projects for Beginners in C',
    slug: 'c-projects',
    description: 'Build 6 different projects using C from Calculator to Rock Paper Scissors using our beginner friendly...',
    problems: 48,
    level: 'Intermediate level',
    icon: '/icons/c.png',
    color: '#3F51B5'
  }
];

const StyledCard = ({ title, description, problems, level, icon, color, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: 'pointer',
      borderRadius: 2,
      overflow: 'hidden',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }
    }}
  >
    <Box sx={{ height: '50px', backgroundColor: color }} />
    <Box sx={{ position: 'relative', mt: -3, px: 2 }}>
      <Box
        component="img"
        src={icon}
        alt="icon"
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          border: '2px solid white',
          backgroundColor: '#fff',
          padding: '4px'
        }}
      />
    </Box>
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', color: '#000' }}>
      <Typography variant="h6" fontWeight={600} mb={1}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>{description}</Typography>
      <Box mt="auto">
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          <BarChartIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle', color: '#555' }} />
          {problems} Problems
        </Typography>
        <Typography variant="caption" color="text.secondary">{level}</Typography>
      </Box>
    </CardContent>
  </Box>
);

const PracticeView = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {selectedCourse ? (
        <CourseDetailsPage course={selectedCourse} onBack={() => setSelectedCourse(null)} />
      ) : (
        <Box sx={{ px: '100px', py: 6 }}>
          {/* Search */}
          <Box mb={4} display="flex" alignItems="center">
            <SearchIcon sx={{ color: '#000' }} />
            <InputBase
              placeholder="Browse practice paths"
              sx={{
                ml: 2,
                flex: 1,
                color: '#000',
                borderBottom: '1px solid #ccc',
                pb: 0.5
              }}
            />
          </Box>

          {/* Practice Paths */}
          <Typography variant="h5" color="black" mb={2}>Programming Languages</Typography>
          <Grid container spacing={3} mb={6}>
            {practicePaths.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard {...item} onClick={() => setSelectedCourse(item)} />
              </Grid>
            ))}
          </Grid>

          {/* Project Paths */}
          <Typography variant="h5" color="black" mb={2}>Projects</Typography>
          <Grid container spacing={3}>
            {projectPaths.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard {...item} onClick={() => setSelectedCourse(item)} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default PracticeView;
