import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Container,
  Box,
} from '@mui/material';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers';
import DialogForm from './DialogForm';

const questions = [
  'All vehicle lights are functioning',
  'Vehicle monitoring system (IVMS) is ok',
  'Brake fluid level is ok',
  'Engine oil level is ok',
  'Radiator coolant level is ok',
  'Windshield wiper/Washer fluid is ok',
  'Drinking water available inside',
  'Tire Pressure (including spare) is ok',
  'Fire extinguisher is available and pressurized',
  'First aid kit is available and contents not expired',
  'Reflective jacket is available',
  'Reflective triangle is available',
  'Jack and wheel wrench are available',
  'OXY inspection sticker is valid',
];

function FormGME0024() {
  const [values, setValues] = useState(
    questions.map((question, index) => ({
      inspected: question,
      choice: '',
      comments: '',
      id: index + 1,
    })),
  );

  const [open, setOpen] = useState(false);
  const [statusBtn, setStatusBtn] = useState('');

  const [location, setLocation] = useState('');
  const [vehicleRegNumber, setVehicleRegNumber] = useState('');
  const [date, setDate] = useState(null);
  const [mileageReading, setMileageReading] = useState('');
  const [nextMaintenanceMileage, setNextMaintenanceMileage] = useState('');
  const [nextOxyInspectionDate, setNextOxyInspectionDate] = useState('');

  const handleRadioChange = (index, event) => {
    const newValues = [...values];
    newValues[index].choice = event.target.value;
    setValues(newValues);
  };

  const handleCommentChange = (index, event) => {
    const newValues = [...values];
    newValues[index].comments = event.target.value;
    setValues(newValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusBtn(event.currentTarget.value);
    console.log(event.currentTarget.value);
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    const formData = {
      location,
      vehicleRegNumber,
      date,
      mileageReading,
      nextMaintenanceMileage,
      nextOxyInspectionDate,
      inspectionData: values,
    };
    console.log(formData);
  };

  const handleConfirmClear = () => {
    setOpen(false);
    setLocation('');
    setVehicleRegNumber('');
    setDate(null);
    setMileageReading('');
    setNextMaintenanceMileage('');
    setNextOxyInspectionDate('');
    setValues(
      questions.map((question, index) => ({
        inspected: question,
        choice: '',
        comments: '',
        id: index + 1,
      })),
    );

    console.log('All Clear');
  };

  const handleConfirmSave = () => {
    setOpen(false);
    console.log('SAVE');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
        mb={5}
        align="center">
        <h1>VEHICLE SAFETY INSPECTION CHECKLIST</h1>
        <div>
          <TextField
            required
            label="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <TextField
            required
            label="Vehicle Registration Number"
            value={vehicleRegNumber}
            onChange={(event) => setVehicleRegNumber(event.target.value)}
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <TextField
            label="Mileage reading (km):"
            value={mileageReading}
            onChange={(event) => setMileageReading(event.target.value)}
          />
          <TextField
            label="Next maintenance mileage (km)"
            value={nextMaintenanceMileage}
            onChange={(event) => setNextMaintenanceMileage(event.target.value)}
          />
          <TextField
            label="Next OXY inspection date (if applicable):"
            value={nextOxyInspectionDate}
            onChange={(event) => setNextOxyInspectionDate(event.target.value)}
          />
        </div>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ border: 1, alignContent: 'center' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#bfbfbf' }}>
              <TableCell sx={{ border: 1, padding: 1 }} align="center">
                #
              </TableCell>
              <TableCell sx={{ border: 1, padding: 1 }} align="center">
                <h2>Item Inspected</h2>
              </TableCell>
              <TableCell sx={{ border: 1, padding: 1 }} align="center">
                <h2>Yes</h2>
              </TableCell>
              <TableCell sx={{ border: 1, padding: 1 }} align="center">
                <h2>No</h2>
              </TableCell>
              <TableCell sx={{ border: 1, padding: 1 }} align="center">
                <h2>N/A</h2>
              </TableCell>
              <TableCell sx={{ border: 1, padding: 1 }} align="center">
                <h2>Comments</h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((value, index) => (
              <TableRow key={value.id}>
                <TableCell sx={{ border: 1, padding: 1 }} align="center">
                  <h3>{value.id}</h3>
                </TableCell>
                <TableCell sx={{ border: 1, padding: 1 }} align="center">
                  <h3>{value.inspected}</h3>
                </TableCell>
                <TableCell sx={{ border: 1, padding: 1 }} align="center">
                  <Box display="flex" justifyContent="center">
                    <RadioGroup
                      row
                      aria-label="yes"
                      name={`choice-${index}`}
                      value={value.choice}
                      onChange={(event) => handleRadioChange(index, event)}>
                      <FormControlLabel
                        sx={{ margin: 1 }}
                        value="yes"
                        control={<Radio />}
                        label=""
                      />
                    </RadioGroup>
                  </Box>
                </TableCell>
                <TableCell sx={{ border: 1, padding: 1 }} align="center">
                  <Box display="flex" justifyContent="center">
                    <RadioGroup
                      row
                      aria-label="no"
                      name={`choice-${index}`}
                      value={value.choice}
                      onChange={(event) => handleRadioChange(index, event)}>
                      <FormControlLabel
                        sx={{ margin: 1 }}
                        value="no"
                        control={<Radio />}
                        label=""
                      />
                    </RadioGroup>
                  </Box>
                </TableCell>
                <TableCell sx={{ border: 1, padding: 1 }} align="center">
                  <Box display="flex" justifyContent="center">
                    <RadioGroup
                      row
                      aria-label="na"
                      name={`choice-${index}`}
                      value={value.choice}
                      onChange={(event) => handleRadioChange(index, event)}>
                      <FormControlLabel
                        sx={{ margin: 1 }}
                        value="na"
                        control={<Radio />}
                        label=""
                      />
                    </RadioGroup>
                  </Box>
                </TableCell>
                <TableCell sx={{ border: 1, padding: 1 }} align="center">
                  <TextField
                    name={`comments-${index}`}
                    value={value.comments}
                    multiline
                    rows={2}
                    onChange={(event) => handleCommentChange(index, event)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} display="flex" justifyContent="center">
        <Button
          sx={{ height: 80, width: 220, margin: 3 }}
          size="large"
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
          value="submit">
          <h2>Submit</h2>
        </Button>
        <Button
          sx={{ height: 80, width: 250, margin: 3 }}
          size="large"
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="warning"
          value="save">
          <h2>Save</h2>
        </Button>
        <Button
          sx={{ height: 80, width: 250, margin: 3 }}
          size="large"
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="error"
          value="clear">
          <h2>Clear</h2>
        </Button>
      </Box>
      <DialogForm
        open={open}
        statusBtn={statusBtn}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleConfirmSave={handleConfirmSave}
        handleConfirmClear={handleConfirmClear}
      />
    </Container>
  );
}

export default FormGME0024;
