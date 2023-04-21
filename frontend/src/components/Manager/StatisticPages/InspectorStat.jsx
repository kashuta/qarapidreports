import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
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
      flexDirection: 'column',
      width: '100%',
    }}>
      <Box sx={{ marginBottom: 5, display: 'flex', gap: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs>
            <DatePicker
              label="from"
              name="from"
              value={value1}
              onChange={(newValue) => setValue1(newValue)}
              sx={{ width: '100%' }}
                />
          </Grid>
          <Grid item xs>
            <DatePicker
              label="To"
              name="to"
              value={value2}
              minDate={value1}
              onChange={(newValue) => setValue2(newValue)}
              sx={{ width: '100%' }}
                />
          </Grid>
          <Grid item xs>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-label">Inspector</InputLabel>
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
          </Grid>
        </Grid>
        <Button
          onClick={handleSubmit}
          variant="contained"
          type="submit"
          sx={{ width: 150 }}>
          Submit
        </Button>
      </Box>
      <Box elevation={2}>
        <InspectorBar inspector={inspector} count={DATA[1]} />
        <InspectorTable inspector={inspector} Data={DATA[0]} />
      </Box>

    </Box>
  );
}

export default InspectorStat;
