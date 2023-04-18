import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Bar, Doughnut } from 'react-chartjs-2';
import InspectorTable from './InspectorTable';

import { dataForDoughnut } from '../ChartsComponents/Doughnut';
import { barData, barOptions } from '../ChartsComponents/Bar';
import { HSEbarData, HSEbarOptions } from '../ChartsComponents/HSE.Bar';

function InspectorStat() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [inspector, setInspector] = useState('All Inspectors');

  const inspectors = ['All Inspectors'];

  for (let i = 1; i <= 10; i += 1) {
    inspectors.push(`Inspector${i}`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInspector(event.target.value);
  };

  return (
    <Box sx={{
      width: 1,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ maxWidth: 100 }}>
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit">
              Submit
            </Button>
          </DemoItem>
          <Box sx={{ width: '800px' }}>
            <Bar options={barOptions} data={barData} />
          </Box>

        </DemoContainer>
      </LocalizationProvider>
      <Box sx={{ minWidth: 120, marginTop: 10 }}>
        <FormControl sx={{ m: 1, width: 500 }}>
          <InputLabel id="demo-simple-select-label">Inspectors</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inspector}
            label="Inspector"
            onChange={handleChange}>
            {inspectors?.map((insp) => (
              <MenuItem value={insp}>{insp}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <InspectorTable inspector={inspector} />
    </Box>
  );
}

export default InspectorStat;
