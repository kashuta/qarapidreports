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
  Box,
  Container,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import styles from './Form.module.css';
import DialogForm from './DialogForm';

const validationSchema = yup.object({
  location: yup
    .string('Enter location')
    .required('Please, fill this field'),
  observer: yup
    .string('Enter observer name')
    .required('Please, fill this field'),
  description: yup
    .string('Enter description')
    .required('Please, fill this field'),
  action: yup
    .string('Enter action')
    .required('Please, fill this field'),
  improvement: yup
    .string('Enter improvement')
    .required('Please, fill this field'),
});

function HSEObservationForm({ location }) {
  const [open, setOpen] = useState(false);
  const [statusBtn, setStatusBtn] = useState('');

  const formik = useFormik({
    initialValues: {
      location: '',
      observer: '',
      date: dayjs(new Date()),
      time: dayjs((new Date()).toTimeString()),
      description: '',
      action: '',
      improvement: '',
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
        <h1 className={styles.form_h1}>HSE OBSERVATION (STOP) CARD</h1>
        <Box
          sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
          mb={5}
          align="center"
        >
          <h2 className={styles.form_h2}>Observer</h2>

          <DatePicker
            label="Date"
            name="date"
            value={formik.values.date}
            onChange={((value) => (formik.setValues({ ...formik.values, date: value })))}
          />

          <TimeField
            label="Time"
            value={formik.values.date}
            onChange={formik.handleChange}
            format="HH:mm"
          />
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
              <MenuItem key={index + 1} value={el}>{el}</MenuItem>
            ))}
          </TextField>

          <TextField
            id="observer"
            name="observer"
            label="Observer's name"
            value={formik.values.observer}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.observer && Boolean(formik.errors.observer)}
            helperText={formik.touched.observer && formik.errors.observer}
          />

        </Box>
        <Box mb={5}>
          <h2 className={styles.form_h2}>Observation type</h2>

        </Box>
        <Box mb={5} fullWidth>
          <h2 className={styles.form_h2}>Observation description</h2>
          <p>Please describe your observation with a picture attached if possible:</p>
          <TextField
            fullWidth
            multiline
            rows={5}
            id="description"
            name="description"
            label=""
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>

        <Box mb={5} fullWidth>
          <h2 className={styles.form_h2}>Containment action</h2>
          <p>What did you do to correct the situation and eliminate the risk?</p>
          <TextField
            fullWidth
            multiline
            rows={5}
            id="action"
            name="action"
            label=""
            value={formik.values.action}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.action && Boolean(formik.errors.action)}
            helperText={formik.touched.action && formik.errors.action}
          />

        </Box>

        <Box mb={5} fullWidth>
          <h2 className={styles.form_h2}>Proposed improvement</h2>
          <p>If you are unable to correct the situation, what do you suggest as a sotution?</p>
          <TextField
            fullWidth
            multiline
            rows={5}
            id="improvement"
            name="improvement"
            label=""
            value={formik.values.improvement}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.improvement && Boolean(formik.errors.improvement)}
            helperText={formik.touched.improvement && formik.errors.improvement}
          />

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

export default HSEObservationForm;
