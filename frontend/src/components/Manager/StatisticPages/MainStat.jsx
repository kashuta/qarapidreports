import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';

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
    <Box
      sx={{
        width: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}>
      <Grid container spacing={2} mt="10px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="From"
              name="from"
              value={value1}
              onChange={(newValue) => setValue1(newValue)}
            />
            <DatePicker
              label="To"
              name="to"
              value={value2}
              onChange={(newValue) => setValue2(newValue)}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              sx={{ width: 150 }}>
              Submit
            </Button>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Box
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '30px',
        }}>
        <h2>
          Total Reports
          <p style={{ color: '#911a1f', textAlign: 'center' }}>
            {totalForms?.allReportCount || 0}
          </p>
        </h2>
        <Divider orientation="vertical" flexItem />
        <h2>
          HSE Observation Unsafe
          <p style={{ color: '#911a1f', textAlign: 'center' }}>
            {totalForms?.hseForm.false || 0}
          </p>
        </h2>
        <Divider orientation="vertical" flexItem />
        <h2>
          HSE Observation Safe
          <p style={{ color: '#911a1f', textAlign: 'center' }}>
            {totalForms?.hseForm.true || 0}
          </p>
        </h2>
      </Box>
      <Divider />
      <Grid container>
        <Grid item xs={12}>
          <MainBar />
        </Grid>
      </Grid>
      <Divider />
      <Grid
        spacing={1}
        container
        direction="column"
        // justifyContent="flex-start"
        // alignItems="center"
        >
        <Grid item>
          <MainHorizontBar />
          <HseBar />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainStat;
