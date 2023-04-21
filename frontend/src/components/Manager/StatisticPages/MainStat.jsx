import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Divider from '@mui/material/Divider';

import { useDispatch, useSelector } from 'react-redux';

import dayjs from 'dayjs';
import HseBar from '../ChartsComponents/HSE.Bar';
import MyDoughnut from '../ChartsComponents/MyDoughnut';
import MainBar from '../ChartsComponents/MainBar';
import { getFormResponseDataAction, getInspectorsNamesAction } from '../../../Redux/report.action';

function MainStat() {
  const [value1, setValue1] = useState(dayjs(new Date()));
  const [value2, setValue2] = useState(dayjs(new Date()));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = { from: value1, to: value2 };

  useEffect(() => {
    dispatch(getInspectorsNamesAction(navigate));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(getFormResponseDataAction(data, navigate));
  };
  //   общий объект с базы
  const totalForms = useSelector(
    (state) => state.ReportReducer.formResponseData,
  );
  console.log(totalForms?.allRepCount);
  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}>
      <Box
        sx={{
          width: 1,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px',
        }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DemoItem label="Date Range">
              <DatePicker
                label="from"
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
            </DemoItem>
          </DemoContainer>
          <Button onClick={handleSubmit} variant="contained" type="submit">
            Submit
          </Button>
        </LocalizationProvider>
      </Box>
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
            {totalForms?.allReportCount || 0}
          </p>
        </h2>
        <Divider orientation="vertical" flexItem />
        <h2>
          HSE Observation Safe
          <p style={{ color: '#911a1f', textAlign: 'center' }}>
            {totalForms?.allReportCount || 0}
          </p>
        </h2>
      </Box>
      <Divider />
      <Box sx={{ width: '800px' }}>
        <MainBar />
      </Box>
      <Divider />
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '10px',
        }}>
        <MyDoughnut />
        <HseBar />
      </Box>
    </Box>
  );
}

export default MainStat;
