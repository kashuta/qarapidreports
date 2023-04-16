import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Bar, Doughnut } from 'react-chartjs-2';

import { dataForDoughnut } from '../ChartsComponents/Doughnut';
import { barData, barOptions } from '../ChartsComponents/Bar';

function MainStat() {
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ from: value1, to: value2 });
  };
  return (
    <>
      <Box>
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              sx={{
                width: '100%',
              }}>
              Submit
            </Button>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box>
        <h2>Total Reports: </h2>
        <h2>HSE Observation Unsafe: </h2>
        <h2>HSE Observation Safe: </h2>
      </Box>

      <Box sx={{ width: 600 }}>
        <Bar options={barOptions} data={barData} />
        <Doughnut data={dataForDoughnut} width="300px" />
      </Box>
    </>
  );
}

export default MainStat;
