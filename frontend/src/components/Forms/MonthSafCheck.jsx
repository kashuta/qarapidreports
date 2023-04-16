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
import InspectorMain from '../Inspector/InspectorMain';

const questions = [
  'All field service vehicles inspection completed as per schedule?',
  'All PPE is in good condition and suitable for task?',
  'All vehicles have OXY inspection tag up to date?',
  'All materials used for work are stored correctly?',
  'All H2S detectors are working properly?',
  'IVMS, blue key system are working without any problems?',
  'Are all HSE training cards for each employee are carried by employee and up to date?',
  'Do all employees have their own blue key?',
  'Is housekeeping in workshop and store acceptable?',
  'Are chemical ontainers identified and stored on top of spill retention pallets?',
  'Is preventive maintenance of PCM machines up to date?',
  'Is calibration for all measuring tools valid?',
  'Have you checked JSAs to ensure they are still valid?',
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
});

function VechSafInspCheckForm({ location }) {
  const [open, setOpen] = useState(false);
  const [statusBtn, setStatusBtn] = useState('');

  const formik = useFormik({
    initialValues: {
      ...questionsValues,
      location: '',
      date: dayjs(new Date()),
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
        <h1 className={styles.form_h1}>MONTHLY SAFETY CHECKLIST - FIELD SERVICES</h1>
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

          <DatePicker
            label="Date"
            name="date"
            value={formik.values.date}
            onChange={((value) => (formik.setValues({ ...formik.values, date: value })))}
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
                  <TableCell sx={{ border: 1, padding: '10px' }}><h4 className={styles.form_h4}>ASPECTS FOR INSPECTION</h4></TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}><h4 className={styles.form_h4}>CONDITION</h4></TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}><h4 className={styles.form_h4}>COMMENTS</h4></TableCell>
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
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="yes" control={<Radio />} label="YES" />
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
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
          mb={5}
          align="left"
        >
          <p>Field service manager Name & Sign:  __________________</p>
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
