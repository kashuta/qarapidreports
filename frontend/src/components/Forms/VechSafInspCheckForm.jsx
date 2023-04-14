/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
  FormControl,
  FormHelperText,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import styles from './Form.module.css';
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
  'Maintenance status is ok',
];

const questionsValues = {};
for (const item of questions) {
  questionsValues[item] = {
    condition: '',
    actionsNeeded: '',
  };
}

const questionsValidation = {};
for (const item of questions) {
  questionsValidation[item] = yup.object({
    condition: yup.string().required('Please, select an option'),
    comments: yup
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

function VechSafInspCheckForm({ location }) {
  const [open, setOpen] = useState(false);
  const [statusBtn, setStatusBtn] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusBtn(event.currentTarget.value);
    if (event.currentTarget.value === 'submit') {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length) {
          formik.setErrors(errors);
          const touchedFields = Object.keys(errors).reduce((touched, key) => {
            if (typeof errors[key] === 'object') {
              for (const nested of Object.keys(errors[key])) {
                touched[key] = { [nested]: true };
              }
            } else {
              touched[key] = true;
            }
            return touched;
          }, {});
          formik.setTouched(touchedFields);
          setStatusBtn('validation-error');
          setOpen(true);
        } else {
          setOpen(true);
        }
      });
    } else {
      setOpen(true);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    formik.handleSubmit();
  };

  const handleConfirmClear = () => {
    setOpen(false);
    formik.handleReset();
  };

  const handleConfirmSave = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <h1 className={styles.form_h1}>VEHICLE SAFETY INSPECTION CHECKLIST</h1>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
          mb={5}
          align="center"
        >
          <TextField
            select
            align="left"
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
              <MenuItem key={index + 1} value={el}>
                {el}
              </MenuItem>
            ))}
          </TextField>

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
        <Box mb={5}>
          <TableContainer
            component={Paper}
            sx={{ border: 1, alignContent: 'center' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#bfbfbf' }}>
                  <TableCell sx={{ border: 1, padding: '10px' }} align="center"><h4 className={styles.form_h4}>№</h4></TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}><h4 className={styles.form_h4}>Item Inspected</h4></TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}><h4 className={styles.form_h4}>Condition</h4></TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}><h4 className={styles.form_h4}>Comments</h4></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions && questions?.map((elem, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: 1, padding: '0 10px' }} align="center">{index + 1}</TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>{elem}</TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }} align="center">
                      <FormControl sx={{ m: 0 }} error={formik.touched[`${elem}`]?.condition && Boolean(formik.errors[`${elem}`]?.condition)} variant="standard">
                        <RadioGroup
                          row
                          style={{ flexWrap: 'nowrap' }}
                          name={`${elem}.condition`}
                          value={formik.values[elem]?.condition}
                          onChange={formik.handleChange}
                        >
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="ok" control={<Radio />} label="OK" />
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="no" control={<Radio />} label="NO" />
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="na" control={<Radio />} label="N/A" />
                        </RadioGroup>
                        <FormHelperText sx={{ margin: '0 0 0 5px' }}>{formik.touched[`${elem}`]?.condition && formik.errors[`${elem}`]?.condition}</FormHelperText>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>
                      <TextField
                        fullWidth
                        inputProps={{
                          style: {
                            padding: '5px',
                          },
                        }}
                        name={`${elem}.comments`}
                        value={formik.values[elem]?.comments}
                        onChange={formik.handleChange}
                        onBlur={(e) => formik.setFieldTouched(e.target.name)}
                        error={formik.touched[`${elem}`]?.comments && Boolean(formik.errors[`${elem}`]?.comments)}
                        helperText={formik.touched[`${elem}`]?.comments && formik.errors[`${elem}`]?.comments}
                    />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box m={3} display="flex" justifyContent="center">
          <Button sx={{ height: 80, width: 220, margin: 3 }} size="large" onClick={handleSubmit} type="submit" variant="contained" color="primary" value="submit">
            <h2>Submit</h2>
          </Button>
          <Button sx={{ height: 80, width: 250, margin: 3 }} size="large" onClick={handleSubmit} type="submit" variant="contained" color="warning" value="save">
            <h2>Save</h2>
          </Button>
          <Button sx={{ height: 80, width: 250, margin: 3 }} size="large" onClick={handleSubmit} type="submit" variant="contained" color="error" value="clear">
            <h2>Clear</h2>
          </Button>
        </Box>
      </form>
      <DialogForm open={open} statusBtn={statusBtn} handleClose={handleClose} handleConfirm={handleConfirm} handleConfirmSave={handleConfirmSave} handleConfirmClear={handleConfirmClear} />
    </Container>
  );
}

export default VechSafInspCheckForm;
