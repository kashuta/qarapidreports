/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
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
  MenuItem,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

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
  'Maintenance status is ok',
];

const location = [
  'Dubai',
  'Miami',
];

const questionsValues = {};
for (const item of questions) {
  questionsValues[item] = {
    condition: 'yes',
    actionsNeeded: '',
  };
}

const questionsValidation = {};
for (const item of questions) {
  questionsValidation[item] = yup.object({
    condition: yup.string(),
    actionsNeeded: yup
      .string()
      .when('condition', {
        is: 'na',
        then: (schema) => schema.required('Please, fill this field'),
      })
      .when('condition', {
        is: 'no',
        then: (schema) => schema.required('Please, fill this field'),
      }),
  });
}
console.log('!!!!!!', questionsValidation);

const validationSchema = yup.object({
  ...questionsValidation,
  location: yup
    .string('Enter location')
    .required('Please, fill this field'),
  regNumber: yup
    .string()
    .required('Please, fill this field'),
  MileageReading: yup
    .number('Enter number')
    .typeError('Value must be a number')
    .positive('Enter positive number')
    .required('Please, fill this field'),
  NextMileage: yup
    .number('Enter number')
    .typeError('Value must be a number')
    .positive('Enter positive number')
    .required('Please, fill this field'),
  NextOxyInspect: yup
    .number('Enter number')
    .typeError('Value must be a number')
    .positive('Enter positive number')
    .required('Please, fill this field'),
});

function VechSafInspCheckForm() {
  const formik = useFormik({
    initialValues: {
      ...questionsValues,
      location: '',
      regNumber: '',
      date: dayjs(new Date()),
      MileageReading: '',
      NextMileage: '',
      NextOxyInspect: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container>
      <h2>VEHICLE SAFETY INSPECTION CHECKLIST</h2>
      <form onSubmit={formik.handleSubmit}>
        <Box
          component="form"
          sx={{
            width: '40%',
            marginTop: '50px',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <TextField
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          >
            {location.map((el, index) => (
              <MenuItem key={index}>
                {el}
              </MenuItem>
            ))}
          </TextField>
          {/* <TextField
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          /> */}
          <TextField
            id="regNumber"
            name="regNumber"
            label="Vehicle Registration Number"
            value={formik.values.regNumber}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.regNumber && Boolean(formik.errors.regNumber)}
            helperText={formik.touched.regNumber && formik.errors.regNumber}
          />
          <DatePicker
            label="Date"
            name="date"
            value={formik.values.date}
            onChange={((value) => (formik.setValues({ ...formik.values, date: value })))}
          />
          <TextField
            id="MileageReading"
            name="MileageReading"
            label="Mileage reading (km)"
            value={formik.values.MileageReading}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.MileageReading && Boolean(formik.errors.MileageReading)}
            helperText={formik.touched.MileageReading && formik.errors.MileageReading}
          />
          <TextField
            id="NextMileage"
            name="NextMileage"
            label="Next maintenance mileage (km)"
            value={formik.values.NextMileage}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.NextMileage && Boolean(formik.errors.NextMileage)}
            helperText={formik.touched.NextMileage && formik.errors.NextMileage}
          />
          <TextField
            id="NextOxyInspect"
            name="NextOxyInspect"
            label="Next OXY inspection date (if applicable)"
            value={formik.values.NextOxyInspect}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.NextOxyInspect && Boolean(formik.errors.NextOxyInspect)}
            helperText={formik.touched.NextOxyInspect && formik.errors.NextOxyInspect}
          />
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            border: 1, borderRadius: 4, marginTop: '50px', alignContent: 'center',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ border: 1 }}><h2>#</h2></TableCell>
                <TableCell sx={{ border: 1 }}><h2>Item Inspected</h2></TableCell>
                <TableCell sx={{ border: 1 }}><h2>Yes</h2></TableCell>
                <TableCell sx={{ border: 1 }}><h2>No</h2></TableCell>
                <TableCell sx={{ border: 1 }}><h2>N/A</h2></TableCell>
                <TableCell sx={{ border: 1 }}><h2>Comments</h2></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions && questions?.map((elem, index) => (
                <TableRow key={index}>
                  <TableCell align="center" sx={{ border: 1 }}>{index + 1}</TableCell>
                  <TableCell sx={{ border: 1 }}>{elem}</TableCell>
                  <TableCell sx={{ border: 1 }}>
                    <RadioGroup
                      row
                      aria-label="yes"
                      name={`${elem}.condition`}
                      value={formik.values[elem]?.condition}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="" />
                    </RadioGroup>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    <RadioGroup
                      row
                      aria-label="no"
                      name={`${elem}.condition`}
                      value={formik.values[elem]?.condition}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel value="no" control={<Radio />} label="" />
                    </RadioGroup>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    <RadioGroup
                      row
                      aria-label="na"
                      name={`${elem}.condition`}
                      value={formik.values[elem]?.condition}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel value="na" control={<Radio />} label="" />
                    </RadioGroup>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    <TextField
                      name={`${elem}.actionsNeeded`}
                      value={formik.values[elem]?.actionsNeeded}
                      onChange={formik.handleChange}
                      onBlur={(e) => formik.setFieldTouched(e.target.name)}
                      error={formik.touched[`${elem}`]?.actionsNeeded && Boolean(formik.errors[`${elem}`]?.actionsNeeded)}
                      helperText={formik.touched[`${elem}`]?.actionsNeeded && formik.errors[`${elem}`]?.actionsNeeded}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} mb={3}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default VechSafInspCheckForm;
