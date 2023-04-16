import { Box } from '@mui/material';
import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

function Dashboard() {
  const [value, setValue] = useState([]);
  console.log(value);
  return (
    <div className="container">
      <Box>
        <input type="date" name="date" id="" />
        <input type="month" name="moth" id="" />
        <input type="year" name="year" id="" />
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DatePicker']}>
              <DemoItem label="Controlled calendar">
                <DatePicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
