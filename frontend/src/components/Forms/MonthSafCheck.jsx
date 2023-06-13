/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './Form.module.css';
import DialogForm from '../UI/DialogForm';
import { createReportAction, setReportFieldsAction } from '../../Redux/report.action';

function VechSafInspCheckForm() {
  const [open, setOpen] = useState(false);
  const [statusBtn, setStatusBtn] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formId = useLocation().pathname.split('/').at(-1);
  const reportsFields = useSelector((state) => state.ReportReducer.reportFields);
  const inspectLocation = useSelector((state) => state.ReportReducer.locations);
  const user = useSelector((state) => state.UserReducer.user);

  const storagedValues = JSON.parse(localStorage.getItem(formId));
  const savedValues = storagedValues ? { ...storagedValues, date: dayjs(storagedValues.date) } : null;

  useEffect(() => {
    dispatch(setReportFieldsAction(formId, navigate));
  }, []);

  const nameLocation = inspectLocation.map((el) => el.name);

  const formFields = reportsFields.find((el) => el.formId === +formId);

  const checklist = [];
  formFields?.questionFields.forEach((el) => {
    checklist.push(el);
  });

  const questionsValues = {};
  for (const item of checklist) {
    questionsValues[item.question] = {
      condition: '',
      actionsNeeded: '',
    };
  }

  const questionsValidation = {};
  for (const item of checklist) {
    questionsValidation[item.question] = yup.object({
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

  const initialValues = {
    ...questionsValues,
    location: '',
    date: dayjs(new Date()),
  };

  const formik = useFormik({
    initialValues: savedValues || initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      const data = new FormData();
      data.append('formData', JSON.stringify(values));
      data.append('formId', formId);
      data.append('userId', user.id);
      data.append('status', 'submit');
      data.append('images', '');
      dispatch(createReportAction(data, navigate));
      resetForm();
    },
  });

  if (!reportsFields) {
    return (
      <div>Loading...</div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusBtn(event.currentTarget.value);
    if (event.currentTarget.value === 'submit') {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length) {
          formik.setErrors(errors);
          const touchedFields = Object.keys(errors).reduce((touched, key) => {
            if (typeof errors[key] === 'object') {
              touched[key] = {};
              for (const nested of Object.keys(errors[key])) {
                if (typeof errors[key][nested] === 'object') {
                  touched[key][nested] = {};
                  for (const el of Object.keys(errors[key][nested])) {
                    touched[key][nested][el] = true;
                  }
                } else {
                  touched[key][nested] = true;
                }
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
    localStorage.setItem(formId, JSON.stringify(formik.values));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <h1 className={`${styles.form_h1} ${styles.text_center}`}>
          MONTHLY SAFETY CHECKLIST - FIELD SERVICES
        </h1>
        <Box
          sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
          mb={5}
          align="center">
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
            helperText={formik.touched.location && formik.errors.location}>
            {nameLocation.map((el, index) => (
              <MenuItem key={index + 1} value={el}>
                {el}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            label="Date"
            name="date"
            value={formik.values.date}
            onChange={(value) => formik.setValues({ ...formik.values, date: value })}
          />
        </Box>
        <Box mb={5}>
          <TableContainer
            component={Paper}
            sx={{ border: 1, alignContent: 'center' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#bfbfbf' }}>
                  <TableCell sx={{ border: 1, padding: '10px' }} align="center">
                    <h4 className={styles.form_h4}>№</h4>
                  </TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}>
                    <h4 className={styles.form_h4}>ASPECTS FOR INSPECTION</h4>
                  </TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}>
                    <h4 className={styles.form_h4}>CONDITION</h4>
                  </TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}>
                    <h4 className={styles.form_h4}>COMMENTS</h4>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checklist && checklist?.map((elem, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: 1, padding: '0 10px' }} align="center">{index + 1}</TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>{elem.question}</TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }} align="center">
                      <FormControl sx={{ m: 0 }} error={formik.touched[`${elem.question}`]?.condition && Boolean(formik.errors[`${elem.question}`]?.condition)} variant="standard">
                        <RadioGroup
                          row
                          style={{ flexWrap: 'nowrap' }}
                          name={`${elem.question}.condition`}
                          value={formik.values[elem.question]?.condition ?? ''}
                          onChange={formik.handleChange}
                        >
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="yes" control={<Radio />} label="YES" />
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="no" control={<Radio />} label="NO" />
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="na" control={<Radio />} label="N/A" />
                        </RadioGroup>
                        <FormHelperText sx={{ margin: '0 0 0 5px' }}>{formik.touched[`${elem.question}`]?.condition && formik.errors[`${elem.question}`]?.condition}</FormHelperText>
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
                        name={`${elem.question}.comments`}
                        value={formik.values[elem.question]?.comments ?? ''}
                        onChange={formik.handleChange}
                        onBlur={(e) => formik.setFieldTouched(e.target.name)}
                        error={formik.touched[`${elem.question}`]?.comments && Boolean(formik.errors[`${elem.question}`]?.comments)}
                        helperText={formik.touched[`${elem.question}`]?.comments && formik.errors[`${elem.question}`]?.comments}
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
          align="left">
          <p>
            <b> Field service manager Name & Sign:</b>
            {' '}
            <b>{user.userName}</b>
          </p>
        </Box>
        <Box m={3} display="flex" justifyContent="center">
          <Button
            sx={{ height: 80, width: 250, margin: 3 }}
            size="large"
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            value="submit">
            <h2>Submit</h2>
          </Button>

          <Button
            sx={{
              height: 80, width: 250, margin: 1, mb: 3, mt: 3,
            }}
            size="large"
            onClick={(e) => handleSubmit(e)}
            type="submit"
            variant="outlined"
            color="primary"
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
      </form>
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

export default VechSafInspCheckForm;
