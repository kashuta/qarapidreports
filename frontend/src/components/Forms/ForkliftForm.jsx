/* eslint-disable no-param-reassign */
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
  Box,
  Container,
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

function ForkliftForm() {
  const [open, setOpen] = useState(false);
  const [statusBtn, setStatusBtn] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formId = useLocation().pathname.split('/').at(-1);
  const reportsFields = useSelector((state) => state.ReportReducer.reportFields);
  const user = useSelector((state) => state.UserReducer.user);
  const locations = useSelector((state) => state.ReportReducer.locations);
  const locationsNames = locations.map((el) => el.name);

  useEffect(() => {
    dispatch(setReportFieldsAction(formId, navigate));
  }, []);

  const formFields = reportsFields.find((el) => el.formId === +formId);
  const questions = formFields?.questionFields.map((el) => {
    const obj = {};
    [obj.item, obj.hint] = el.question.split('; ');
    return obj;
  });
  const engineOffChecklist = questions?.slice(0, 12) || [];
  const engineOnChecklist = questions?.slice(12) || [];

  const engineOffValues = {};
  const engineOffValidation = {};

  const engineOnValues = {};
  const engineOnValidation = {};

  for (const item of engineOffChecklist) {
    engineOffValidation[item.item] = yup.object({
      condition: yup.string().required('Please, select an option'),
      actionsNeeded: yup
        .string()
        .when('condition', {
          is: 'nok',
          then: (schema) => schema.required('Please, fill this field'),
        }),
    });
  }

  for (const item of engineOffChecklist) {
    engineOffValues[item.item] = {
      condition: '',
      actionsNeeded: '',
    };
  }

  for (const item of engineOnChecklist) {
    engineOnValues[item.item] = {
      condition: '',
      actionsNeeded: '',
    };
  }

  for (const item of engineOnChecklist) {
    engineOnValidation[item.item] = yup.object({
      condition: yup
        .string()
        .required('Please, select an option'),
      actionsNeeded: yup
        .string()
        .when('condition', {
          is: 'nok',
          then: (schema) => schema.required('Please, fill this field'),
        }),
    });
  }

  const validationSchema = yup.object({
    ...engineOffValidation,
    ...engineOnValidation,
    location: yup
      .string('Enter location')
      .required('Please, fill this field'),
    operator: yup
      .string('Enter operator name')
      .required('Please, fill this field'),
    machineHours: yup
      .number('Enter number')
      .typeError('Value must be a number')
      .positive('Enter positive number')
      .required('Please, fill this field'),
    regNumber: yup
      .string()
      .required('Please, fill this field'),
    signature: yup
      .string()
      .required('Please, fill this field'),
  });

  const formik = useFormik({
    initialValues: {
      ...engineOffValues,
      ...engineOnValues,
      location: '',
      operator: '',
      date: dayjs(new Date()),
      machineHours: '',
      regNumber: '',
      signature: '',
    },
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
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <h1 className={`${styles.form_h1} ${styles.text_uppercase} ${styles.text_center}`}>Forklift safety inspection checklist</h1>
        <Box
          sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
          mb={5}
          align="center"
        >
          <h2 className={styles.form_h2}>A.&ensp;Truck and operator details</h2>
          <TextField
            sx={{
              '& .MuiFormHelperText-root.Mui-error': {
                position: 'absolute',
                bottom: '-25px',
                left: 0,
                width: '100%',
              },
            }}
            style={{ marginBottom: '20px', marginTop: '20px' }}
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
            {locationsNames.map((el, index) => (
              <MenuItem key={index + 1} value={el}>{el}</MenuItem>
            ))}
          </TextField>

          <DatePicker
            sx={{
              '&.MuiTextField-root': {
                mb: '20px',
                mt: '20px',
              },
            }}
            label="Date"
            name="date"
            value={formik.values.date}
            onChange={((value) => (formik.setValues({ ...formik.values, date: value })))}
          />

          <TextField
            sx={{
              '& .MuiFormHelperText-root.Mui-error': {
                position: 'absolute',
                bottom: '-25px',
                left: 0,
                width: '100%',
              },
            }}
            style={{ marginBottom: '20px', marginTop: '20px' }}
            id="operator"
            name="operator"
            label="Operator"
            value={formik.values.operator}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.operator && Boolean(formik.errors.operator)}
            helperText={formik.touched.operator && formik.errors.operator}
          />
          <TextField
            sx={{
              '& .MuiFormHelperText-root.Mui-error': {
                position: 'absolute',
                bottom: '-25px',
                left: 0,
                width: '100%',
              },
            }}
            style={{ marginBottom: '20px', marginTop: '20px' }}
            id="machineHours"
            name="machineHours"
            label="Machine hours"
            value={formik.values.machineHours}
            onChange={(e) => {
              formik.setFieldTouched(e.target.name);
              formik.handleChange(e);
            }}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.machineHours && Boolean(formik.errors.machineHours)}
            helperText={formik.touched.machineHours && formik.errors.machineHours}
          />
          <TextField
            sx={{
              '& .MuiFormHelperText-root.Mui-error': {
                position: 'absolute',
                bottom: '-25px',
                left: 0,
                width: '100%',
              },
            }}
            style={{ marginBottom: '20px', marginTop: '20px' }}
            id="regNumber"
            name="regNumber"
            label="Registration No."
            value={formik.values.regNumber}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.regNumber && Boolean(formik.errors.regNumber)}
            helperText={formik.touched.regNumber && formik.errors.regNumber}
          />
          <TextField
            sx={{
              '& .MuiFormHelperText-root.Mui-error': {
                position: 'absolute',
                bottom: '-25px',
                left: 0,
                width: '100%',
              },
            }}
            style={{ marginBottom: '20px', marginTop: '20px' }}
            id="signature"
            name="signature"
            label="Signature"
            value={formik.values.signature}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.signature && Boolean(formik.errors.signature)}
            helperText={formik.touched.signature && formik.errors.signature}
          />
        </Box>
        <Box mb={5}>
          <h2 className={styles.form_h2}>B.&ensp;Inspection</h2>
          <TableContainer component={Paper} sx={{ border: 1, alignContent: 'center' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#bfbfbf' }}>
                  <TableCell colSpan={6} sx={{ border: 1 }}>
                    <h3 className={styles.form_h3}>With Engine Off</h3>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ background: '#bfbfbf' }}>
                  <TableCell sx={{ border: 1, padding: '10px' }} align="center">№</TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}>
                    <h4 className={styles.form_h4}>What are you inspecting?</h4>
                  </TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}>
                    <h4 className={styles.form_h4}>What are you looking for?</h4>
                  </TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}>
                    <h4 className={styles.form_h4}>Condition</h4>
                  </TableCell>
                  <TableCell sx={{ border: 1, padding: '10px' }}>
                    <h4 className={styles.form_h4}>Action needed</h4>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {engineOffChecklist && engineOffChecklist?.map((elem, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: 1, padding: '0 10px' }} align="center">{index + 1}</TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>{elem.item}</TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>{elem.hint}</TableCell>
                    <TableCell sx={{ border: 1, padding: 0 }} align="center">
                      <FormControl sx={{ m: 0, mt: 2, mb: 2 }} error={formik.touched[`${elem.item}`]?.condition && Boolean(formik.errors[`${elem.item}`]?.condition)} variant="standard">
                        <RadioGroup
                          row
                          style={{ flexWrap: 'nowrap' }}
                          name={`${elem.item}.condition`}
                          value={formik.values[elem.item]?.condition ?? ''}
                          onChange={formik.handleChange}
                        >
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="ok" control={<Radio />} label="OK" />
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="nok" control={<Radio />} label="NOK" />
                        </RadioGroup>
                        <FormHelperText sx={{ margin: '0 0 0 5px', position: 'absolute', top: '80%' }}>{formik.touched[`${elem.item}`]?.condition && formik.errors[`${elem.item}`]?.condition}</FormHelperText>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>
                      <TextField
                        sx={{
                          '& .MuiFormHelperText-root.Mui-error': {
                            position: 'absolute',
                            bottom: '-25px',
                            left: 0,
                          },
                        }}
                        style={{ marginBottom: '20px', marginTop: '20px' }}
                        fullWidth
                        inputProps={{
                          style: {
                            padding: '5px',
                          },
                        }}
                        name={`${elem.item}.actionsNeeded`}
                        value={formik.values[elem.item]?.actionsNeeded ?? ''}
                        onChange={formik.handleChange}
                        onBlur={(e) => formik.setFieldTouched(e.target.name)}
                        error={formik.touched[`${elem.item}`]?.actionsNeeded && Boolean(formik.errors[`${elem.item}`]?.actionsNeeded)}
                        helperText={formik.touched[`${elem.item}`]?.actionsNeeded && formik.errors[`${elem.item}`]?.actionsNeeded}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ background: '#bfbfbf' }}>
                  <TableCell colSpan={6} sx={{ border: 1 }}>
                    <h3 className={styles.form_h3}>With Engine On</h3>
                  </TableCell>
                </TableRow>
                {engineOnChecklist && engineOnChecklist?.map((elem, index) => (
                  <TableRow key={index + engineOffChecklist.length}>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>{index + 1 + engineOffChecklist.length}</TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>{elem.item}</TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>{elem.hint}</TableCell>
                    <TableCell sx={{ border: 1, padding: 0 }} align="center">
                      <FormControl sx={{ m: 0, mt: 2, mb: 2 }} error={formik.touched[`${elem.item}`]?.condition && Boolean(formik.errors[`${elem.item}`]?.condition)} variant="standard">
                        <RadioGroup
                          row
                          style={{ flexWrap: 'nowrap' }}
                          name={`${elem.item}.condition`}
                          value={formik.values[elem.item]?.condition ?? ''}
                          onChange={formik.handleChange}
                        >
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="ok" control={<Radio />} label="OK" />
                          <FormControlLabel sx={{ margin: '0 8px 0 0' }} value="nok" control={<Radio />} label="NOK" />
                        </RadioGroup>
                        <FormHelperText sx={{ margin: '0 0 0 5px', position: 'absolute', top: '80%' }}>{formik.touched[`${elem.item}`]?.condition && formik.errors[`${elem.item}`]?.condition}</FormHelperText>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ border: 1, padding: '0 10px' }}>
                      <TextField
                        sx={{
                          '& .MuiFormHelperText-root.Mui-error': {
                            position: 'absolute',
                            bottom: '-25px',
                            left: 0,
                          },
                        }}
                        style={{ marginBottom: '20px', marginTop: '20px' }}
                        fullWidth
                        inputProps={{
                          style: {
                            padding: '5px',
                          },
                        }}
                        name={`${elem.item}.actionsNeeded`}
                        value={formik.values[elem.item]?.actionsNeeded ?? ''}
                        onChange={formik.handleChange}
                        onBlur={(e) => formik.setFieldTouched(e.target.name)}
                        error={formik.touched[`${elem.item}`]?.actionsNeeded && Boolean(formik.errors[`${elem.item}`]?.actionsNeeded)}
                        helperText={formik.touched[`${elem.item}`]?.actionsNeeded && formik.errors[`${elem.item}`]?.actionsNeeded}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mb={5}>
          <h2 className={styles.form_h2}>C.&ensp;Guide</h2>
          <div className={styles.form_image}>
            <div className={styles.img_container}>
              <div className={styles.img_wrapper}>
                <img src="../img/forklift.jpg" alt="guide" />
              </div>
            </div>
          </div>
        </Box>
        <Box m="30px 0 30px 0" display="flex" justifyContent="center">
          <Button
            sx={{
              height: 80, width: 250, margin: 3, ml: 0, mr: 1,
            }}
            size="large"
            onClick={(e) => handleSubmit(e)}
            type="submit"
            variant="contained"
            color="primary"
            value="submit">
            <h2>Submit</h2>
          </Button>
          {/* <Button
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
          </Button> */}
          <Button
            sx={{
              height: 80, width: 250, margin: 1, mb: 3, mt: 3,
            }}
            size="large"
            onClick={(e) => handleSubmit(e)}
            type="submit"
            variant="contained"
            color="error"
            value="clear">
            <h2>Clear</h2>
          </Button>
        </Box>
      </form>
      <DialogForm open={open} statusBtn={statusBtn} handleClose={handleClose} handleConfirm={handleConfirm} handleConfirmSave={handleConfirmSave} handleConfirmClear={handleConfirmClear} />
    </Container>
  );
}

export default ForkliftForm;
