import React, { useState } from 'react';
import {
  Box, Button, Grid, Paper,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Divider from '@mui/material/Divider';

import { useDispatch, useSelector } from 'react-redux';

import dayjs from 'dayjs';
import HseBar from '../ChartsComponents/HSE.Bar';
// import MyDoughnut from '../ChartsComponents/MyDoughnut';
import MainBar from '../ChartsComponents/MainBar';
import { getFormResponseDataAction } from '../../../Redux/report.action';
import MainHorizontBar from '../ChartsComponents/MainHorizontBar';

function MainStat() {
  const [value1, setValue1] = useState(dayjs(new Date()));
  const [value2, setValue2] = useState(dayjs(new Date()));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = { from: value1, to: value2 };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(getFormResponseDataAction(data, navigate));
  };
  //   общий объект с базы
  const totalForms = useSelector(
    (state) => state.ReportReducer.formResponseData,
  );
  // console.log(totalForms.hseForm.true);
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        // gap: '20px',
        width: '100%',
      }}>
      <Grid container spacing={2} mb={5}>
        <Grid item xs={4}>
          <DatePicker
            label="From"
            name="from"
            value={value1}
            onChange={(newValue) => setValue1(newValue)}
            />

        </Grid>
        <Grid item xs={4}>
          <DatePicker
            label="To"
            name="to"
            value={value2}
            onChange={(newValue) => setValue2(newValue)}
            />

        </Grid>
        <Grid item xs={4} sx={{ display: 'flex' }}>

          <Button
            onClick={handleSubmit}
            variant="contained"
            type="submit"
            sx={{ width: '100%', alignSelf: 'stretch' }}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'stretch' }} mb={5}>
        <Grid item xs={4} sx={{ minHeight: '150px', display: 'flex', flexDirection: 'column' }}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center', padding: '20px 10px',
            }}>
            <h2 style={{ textAlign: 'center', margin: 0 }}>
              Total Reports
            </h2>
            <p style={{
              color: '#911a1f', textAlign: 'center', fontSize: '30px', margin: 0,
            }}>
              {totalForms?.allReportCount || 0}
            </p>
          </Paper>
        </Grid>
        {/* <Divider orientation="vertical" flexItem /> */}
        <Grid item xs={4} sx={{ minHeight: '150px', display: 'flex', flexDirection: 'column' }}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center', padding: '20px 10px',
            }}>
            <h2 style={{ textAlign: 'center', margin: 0 }}>
              HSE Observation Unsafe
            </h2>
            <p style={{
              color: '#911a1f', textAlign: 'center', fontSize: '30px', margin: 0,
            }}>
              {totalForms?.hseForm.false || 0}
            </p>
          </Paper>
        </Grid>
        {/* <Divider orientation="vertical" flexItem /> */}
        <Grid item xs={4} sx={{ minHeight: '150px', display: 'flex', flexDirection: 'column' }}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center', padding: '20px 10px',
            }}>
            <h2 style={{ textAlign: 'center', margin: 0 }}>
              HSE Observation Safe
            </h2>
            <p style={{
              color: '#911a1f', textAlign: 'center', fontSize: '30px', margin: 0,
            }}>
              {totalForms?.hseForm.true || 0}
            </p>
          </Paper>
        </Grid>
      </Grid>

      <Box mb={5} sx={{ width: '100%' }}>
        <MainBar />
      </Box>
      <Box mb={5} sx={{ width: '100%' }}>
        <MainHorizontBar />
      </Box>
      <Box mb={5} sx={{ width: '100%' }}>
        <HseBar />
      </Box>

    </Box>
  );
}

export default MainStat;
