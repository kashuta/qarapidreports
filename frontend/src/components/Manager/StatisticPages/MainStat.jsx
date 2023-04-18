import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Divider from '@mui/material/Divider';

import { Bar, Doughnut } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';

import { dataForDoughnut } from '../ChartsComponents/Doughnut';
import { barData, barOptions } from '../ChartsComponents/Bar';
import { HSEbarData, HSEbarOptions } from '../ChartsComponents/HSE.Bar';
import authFetch from '../../../JWT/authFetch';
import { refreshAccessToken } from '../../../JWT/authActions';

function MainStat() {
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const fetchData = async () => {
    try {
      const data = { date: { from: value1, to: value2 } };
      const response = await authFetch(
        'http://localhost:3001/api/v2/form/upload',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        },
      );
      if (response.status === 401) {
        const newAccessToken = await dispatch(refreshAccessToken());
        if (!newAccessToken) {
          return;
          // Handle error, for example, redirect to the login page or show an error message
        }
        // Retry the request with the new access token
        fetchData();
      } else if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Process the data
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(value1.$d, value2.$d);

    await fetch('http://localhost:3001/api/v2/form/form_data_for_dashboard', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: { from: value1.$d, to: value2.$d } }),
    });
    // fetchData();
  };
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
        <h2>Total Reports: </h2>
        <Divider orientation="vertical" flexItem />
        <h2>HSE Observation Unsafe: </h2>
        <Divider orientation="vertical" flexItem />
        <h2>HSE Observation Safe: </h2>
      </Box>
      <Divider />
      <Box sx={{ width: '800px' }}>
        <Bar options={barOptions} data={barData} />
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
        <Doughnut data={dataForDoughnut} />
        <Bar options={HSEbarOptions} data={HSEbarData} />
      </Box>
      {/* <Divider />
      <Box sx={{ mt: 5 }}>
        <Bar options={HSEbarOptions} data={HSEbarData} />
      </Box> */}
    </Box>
  );
}

export default MainStat;
