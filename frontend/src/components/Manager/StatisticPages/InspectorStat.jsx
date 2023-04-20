import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import InspectorTable from './InspectorTable';
import InspectorBar from '../ChartsComponents/Inspector.Bar';

function InspectorStat() {
  const [value1, setValue1] = useState(dayjs(new Date()));
  const [value2, setValue2] = useState(dayjs(new Date()));
  const [inspector, setInspector] = useState('Inspectors');
  const [location, setLocation] = useState('');

  const inspectors = ['Inspectors'];
  const locations = ['Locations'];

  const inspectorsNames = useSelector(
    (state) => state.ReportReducer.inspectorsNames,
  );

  // const FormsDate = useSelector(
  //   (state) => state.ReportReducer.getFormResponseDataAction,
  // );
  console.log(location);
  inspectorsNames.forEach((el) => {
    inspectors.push(el.userName);
  });

  const DATA = [[
    {
      FormName: 'MONTHLY SAFETY CHECKLIST',
      InspectorName: 'Said',
      Location: 'Dubai',
      Date: '12/04/23',
      Form_id: 13,
    },
    {
      FormName: 'VEHICLE SAFETY INSPECTION',
      InspectorName: 'Habib',
      Location: 'Oman',
      Date: '10/04/23',
      Form_id: 11,
    },
    {
      FormName: 'FORKLIFT SAFETY INSPECTION',
      InspectorName: 'Al-React-js ibn Redux',
      Location: 'Dubai',
      Date: '7/04/23',
      Form_id: 22,
    },

    {
      FormName: 'TOOL BOX SAFETY MEETING',
      InspectorName: 'Ivan',
      Location: 'Miami',
      Date: '3/04/23',
      Form_id: 43,
    }],
  [15, 19, 10, 5, 11, 60],
  ];
  locations.push('Dubai', 'Moscow', 'Miami');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(value1, value2);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInspector(event.target.value);
  };
  const handleChange2 = (event) => {
    event.preventDefault();
    setLocation(event.target.value);
  };
  console.log(value1);
  console.log(value2);

  console.log('inspespecorrinspectorin', inspector);
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2px',
    }}>
      <Box sx={{
        m: 2, marginBottom: 10, justifyContent: 'center', alignItems: 'center',
      }}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          sx={{ m: 1, width: 200 }}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="from"
              name="from"
              value={value1}
              onChange={(newValue) => setValue1(newValue)}
              sx={{ width: 50 }}
            />
            <DatePicker
              label="To"
              name="to"
              value={value2}
              minDate={value1}
              onChange={(newValue) => setValue2(newValue)}
              sx={{ width: 50 }}
            />
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">Inspectors</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Inspector"
                onChange={handleChange}>
                {inspectors?.map((insp) => (
                  <MenuItem value={insp}>{insp}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Inspector"
                onChange={handleChange2}>
                {locations?.map((insp) => (
                  <MenuItem value={insp}>{insp}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              sx={{ width: 150 }}>
              Submit
            </Button>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box component={Paper} elevation={2}>
        <InspectorBar inspector={inspector} count={DATA[1]} />
        <Divider sx={{ marginBottom: 2 }} />
        <InspectorTable inspector={inspector} Data={DATA[0]} />
      </Box>

    </Box>
  );
}

export default InspectorStat;
