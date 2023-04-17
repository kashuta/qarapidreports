import React from 'react';
import { Container } from '@mui/material';
import TabPanel from './StatisticPages/Tabs';

function Dashboard() {
  return (
    <Container maxWidth="xl">
      <TabPanel />
    </Container>
  );
}

export default Dashboard;
