import React from 'react';
import { Grid, Box, Container } from '@mui/material';
import LeftSidebar from '../CommunityView/components/LeftSidebar';
import Header from '../CommunityView/components/Header';
import StatCards from './components/StatCards';
import TokenUsageChart from './components/TokenUsageChart';
import ActiveEvents from './components/ActiveEvents';
import MiniDonuts from './components/MiniDonuts';
import LineChartComponent from './components/LineChartComponent';
import PieChartComponent from './components/PieChartComponent';
import ActiveProjects from './components/ActiveProjects';
import RelatedProjectsCarousel from './components/RelatedProjectsCarousel';
import RightSidebar from './components/RightSidebar';
import useAuth from 'hooks/useAuth';

const DashbboardView = () => {
  const { user } = useAuth();
  const username = user?.username || "";

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#ecf0f1' }}>
      {/* Header */}
      <Box sx={{ flexShrink: 0 }}>
        <Header />
      </Box>

      {/* Body */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          pt: { xs: '60px', md: '70px' },
          boxSizing: 'border-box',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {/* Left Sidebar */}
            <Grid
              item
              xs={0}
              md={3}
              sx={{
                display: { xs: 'none', md: 'block' },
                bgcolor: '#f5f5f5',
                borderRadius: '12px',
                height: 'calc(100vh - 70px)',
                position: 'sticky',
                top: '70px',
                overflow: 'hidden',
              }}
            >
              <LeftSidebar />
            </Grid>

            {/* Main Content */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                height: 'calc(100vh - 70px)',
                overflowY: 'auto',
              }}
            >
              <Box p={{ xs: 2, md: 3 }}>
                <StatCards username={username} />

                {/* Token Usage + Active Events + Mini Donuts */}
                <Box mt={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TokenUsageChart />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ActiveEvents />
                    </Grid>
                  </Grid>
                  <Box mt={2}>
                    <MiniDonuts />
                  </Box>
                </Box>

                {/* Line Chart */}
                <Box mt={4}>
                  <LineChartComponent />
                </Box>

                {/* Pie Chart + Active Projects */}
                <Box mt={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <PieChartComponent />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ActiveProjects />
                    </Grid>
                  </Grid>
                </Box>

                {/* Related Projects */}
                <Box mt={4}>
                  <RelatedProjectsCarousel />
                </Box>
              </Box>
            </Grid>

            {/* Right Sidebar */}
            <Grid
              item
              xs={0}
              md={3}
              sx={{
                display: { xs: 'none', md: 'block' },
                bgcolor: '#f5f5f5',
                borderRadius: '12px',
                height: 'calc(100vh - 70px)',
                position: 'sticky',
                top: '70px',
                overflow: 'hidden',
              }}
            >
              <RightSidebar />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashbboardView;