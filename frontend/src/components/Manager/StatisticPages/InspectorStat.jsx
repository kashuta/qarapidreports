import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import InspectorTable from './InspectorTable';
import InspectorBar from '../ChartsComponents/Inspector.Bar';
import { getInspectorStat } from '../../../Redux/report.action';

function InspectorStat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value1, setValue1] = useState(dayjs(new Date()).subtract(1, 'day'));
  const [value2, setValue2] = useState(dayjs(new Date()));

  const data = { from: value1, to: value2 };

  const inspectorNames = useSelector((state) => state.ReportReducer.inspectorsNames);
  const [choiceInspector, setChoiceInspector] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = choiceInspector;
    dispatch(getInspectorStat(navigate, email, data));
  };

  const handleChangeInspector = (event) => {
    event.preventDefault();
    setChoiceInspector(event.target.value);
  };

  const inspectorData = useSelector((state) => state.ReportReducer.inspectorStat);

  console.log('----------inspectorData---------------', inspectorData);

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
              <InputLabel id="demo-simple-select-label">Inspector</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Inspector"
                onChange={handleChangeInspector}>
                {inspectorNames && inspectorNames?.map((el) => (
                  <MenuItem value={el.email}>{el.userName}</MenuItem>
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
      { inspectorData?.length !== 0 && (
      <Box component={Paper} elevation={2}>
        <InspectorBar
          name={choiceInspector}
          count={inspectorData.responseObject.countMap}
          total={inspectorData.responseObject.total} />
        <Divider sx={{ marginBottom: 2 }} />
        <InspectorTable
          name={choiceInspector}
          Data={Object.values(inspectorData.responseObject.responseObject)} />
      </Box>
      )}

    </Box>
  );
}

export default InspectorStat;
