import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TabPanel from './StatisticPages/Tabs';
import {
  // getInspectorsNamesAction,
  getLocationsAction,
  setFormsNameAction,
} from '../../Redux/report.action';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setFormsNameAction(navigate));
    // dispatch(getInspectorsNamesAction(navigate));
    dispatch(getLocationsAction(navigate));
  }, []);
  return (
    <Container>
      <TabPanel />
    </Container>
  );
}

export default Dashboard;
