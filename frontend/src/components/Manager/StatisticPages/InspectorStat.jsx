/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
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
  const [status, setStatus] = useState(false);

  const data = { from: value1, to: value2 };

  const inspectorNames = useSelector(
    (state) => state.ReportReducer.inspectorsNames,
  );
  const [choiceInspector, setChoiceInspector] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = choiceInspector;
    setStatus(true);
    dispatch(getInspectorStat(navigate, email, data));
  };

  const handleChangeInspector = (event) => {
    event.preventDefault();
    setChoiceInspector(event.target.value);
  };

  const inspectorData = useSelector(
    (state) => state.ReportReducer.inspectorStat,
  );

  return (
    <Box
      sx={{
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
              <InputLabel id="demo-simple-select-label">Inspectors</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Inspector"
                onChange={handleChangeInspector}>
                {inspectorNames
                  && inspectorNames?.map((el) => (
                    <MenuItem value={el.email}>{el.userName}</MenuItem>
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
      {inspectorData.length !== 0
      && Object.keys(inspectorData?.responseObject).length > 0 ? (
        <Box>
          <InspectorBar
            name={choiceInspector}
            count={inspectorData.responseObject.countMap}
            total={inspectorData.responseObject.total}
          />
          <Divider sx={{ marginBottom: 2 }} />
          <InspectorTable
            name={choiceInspector}
            Data={Object.values(inspectorData.responseObject.responseObject)}
          />
        </Box>
        ) : status !== false ? (
          <p style={{ textAlign: 'center', fontSize: '30px' }}>No data</p>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '30px' }}>
            Please choose date range and inspector
            {' '}
          </p>
        )}
    </Box>
  );
}

export default InspectorStat;
