import React from 'react';
import { Box } from '@mui/material';
import WelcomeCard from '../components/WelcomeCard';

function Home() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" px={2}>
      <WelcomeCard />
    </Box>
  );
}

export default Home;