import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InspectorTable from './InspectorTable';

function InspectorStat() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [inspector, setInspector] = useState('All Inspectors');

  const inspectors = ['All Inspectors'];

  useEffect(() => {
    console.log('Updated inspector state:', inspector);
  }, [inspector]);

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
      <Box sx={{ minWidth: 120, marginTop: 10 }}>
        <FormControl fullWidth>
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
