import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const relatedProjects = [
  { title: 'Social App', description: 'A social media application.', image: 'https://via.placeholder.com/150' },
  { title: 'E-commerce', description: 'An online store platform.', image: 'https://via.placeholder.com/150' },
  { title: 'Project Manager', description: 'Manage your projects effectively.', image: 'https://via.placeholder.com/150' },
];

const RelatedProjectsCarousel = () => {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Related Projects
      </Typography>
      <Swiper spaceBetween={10} slidesPerView={3}>
        {relatedProjects.map((project, index) => (
          <SwiperSlide key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RelatedProjectsCarousel;
