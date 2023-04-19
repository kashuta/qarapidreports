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
  FormGroup,
  Checkbox,
} from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import styles from './Form.module.css';
import DialogForm from './DialogForm';
import FileUpload from '../FileUpload/FileUpload';
import { createReportAction } from '../../Redux/report.action';

const validationSchema = yup.object().shape({
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
  observationType: yup
    .string()
    .required('Please, select an option'),
  healthHazard: yup.boolean().when('observationType', {
    is: 'Unsafe act',
    then: (schema) => schema.test(
      'at-least-one-required',
      'At least one checkbox is required',
      (value, context) => value || context.parent.environmentalRisk || context.parent.unsafeCondition
      ,
    ),
  }),
  environmentalRisk: yup.boolean().when('observationType', {
    is: 'Unsafe act',
    then: (schema) => schema.test(
      'at-least-one-required',
      'At least one checkbox is required',
      (values, context) => values || context.parent.healthHazard || context.parent.unsafeCondition
      ,
    ),
  }),
  unsafeCondition: yup.boolean().when('observationType', {
    is: 'Unsafe act',
    then: (schema) => schema.test(
      'at-least-one-required',
      'At least one checkbox is required',
      (value, context) => value || context.parent.healthHazard || context.parent.environmentalRisk
      ,
    ),
  }),
});

function HSEObservationForm({ location }) {
  const [open, setOpen] = useState(false);
  const [statusBtn, setStatusBtn] = useState('');
  const formId = useLocation().pathname.split('/').at(-1);
  const user = useSelector((state) => state.UserReducer.user);
  const [singleFile, setSingleFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      location: '',
      observer: '',
      date: dayjs(new Date()),
      time: dayjs((new Date()).toTimeString()),
      description: '',
      action: '',
      improvement: '',
      observationType: '',
      healthHazard: false,
      environmentalRisk: false,
      unsafeCondition: false,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      const isSafe = values.observationType === 'Safe observation';
      const imgNames = fileList.map((el) => el.name).join(', ');

      const data = new FormData();
      data.append('formData', JSON.stringify(values));
      data.append('formId', formId);
      data.append('userId', user.id);
      data.append('status', 'submit');
      data.append('images', imgNames);
      data.append('isSafe', isSafe);

      if (fileList.length > 0) {
        fileList.forEach((file) => {
          data.append('file', file);
        });
      }
      dispatch(createReportAction(data, navigate));
      resetForm();
      setFileList([]);
      setSingleFile([]);
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
    setFileList([]);
    setSingleFile([]);
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
        <h1 className={`${styles.form_h1} ${styles.text_uppercase} ${styles.text_center}`}>HSE observation (stop) card</h1>
        <Box
          sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
          mb={5}
          align="center"
        >
          <h2 className={`${styles.form_h2} ${styles.text_uppercase} ${styles.text_center}`}>Observer</h2>

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
          <h2 className={`${styles.form_h2} ${styles.text_uppercase} ${styles.text_center}`}>Observation type</h2>
          <Box display="flex" alignItems="flex-start">
            <FormControl sx={{ m: 0 }} error={formik.touched.observationType && Boolean(formik.errors.observationType)} variant="standard">
              <RadioGroup
                name="observationType"
                value={formik.values.observationType}
                onChange={(e) => {
                  formik.setFieldValue(e.target.name, e.target.value);
                  if (e.target.value === 'Safe observation') {
                    formik.setFieldValue('healthHazard', false);
                    formik.setFieldValue('environmentalRisk', false);
                    formik.setFieldValue('unsafeCondition', false);
                  }
                }}
                          >
                <FormControlLabel sx={{ margin: 1 }} value="Unsafe act" control={<Radio />} label="Unsafe act" />
                <FormControlLabel sx={{ margin: 1 }} value="Safe observation" control={<Radio />} label="Safe observation" />
              </RadioGroup>
              <FormHelperText sx={{ margin: 1 }}>{formik.touched.observationType && formik.errors.observationType}</FormHelperText>
            </FormControl>
            <FormControl component="fieldset" error={formik.touched.healthHazard && Boolean(formik.errors.healthHazard)}>
              <FormGroup row>
                <FormControlLabel
                  disabled={formik.values.observationType !== 'Unsafe act'}
                  sx={{ margin: 1 }}
                  name="healthHazard"
                  value={formik.values.healthHazard}
                  onChange={formik.handleChange}
                  checked={formik.values.healthHazard}
                  control={<Checkbox />}
                  label="Health hazard"
                />
                <FormControlLabel
                  disabled={formik.values.observationType !== 'Unsafe act'}
                  sx={{ margin: 1 }}
                  name="environmentalRisk"
                  value={formik.values.environmentalRisk}
                  checked={formik.values.environmentalRisk}
                  onChange={formik.handleChange}
                  control={<Checkbox />}
                  label="Environmental risk"
                />
                <FormControlLabel
                  disabled={formik.values.observationType !== 'Unsafe act'}
                  sx={{ margin: 1 }}
                  name="unsafeCondition"
                  value={formik.values.unsafeCondition}
                  checked={formik.values.unsafeCondition}
                  onChange={formik.handleChange}
                  control={<Checkbox />}
                  label="Unsafe condition"
                />
              </FormGroup>
              <FormHelperText sx={{ margin: 1, ml: 3 }}>{formik.touched.healthHazard && formik.errors.healthHazard}</FormHelperText>
            </FormControl>
          </Box>

        </Box>
        <Box mb={5} fullWidth>
          <h2 className={`${styles.form_h2} ${styles.text_uppercase} ${styles.text_center}`}>Observation description</h2>
          <p className={styles.text_center}>Please describe your observation with a picture attached if possible:</p>
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
          <FileUpload multiple name="images" singleFile={singleFile} setSingleFile={setSingleFile} fileList={fileList} setFileList={setFileList} />
        </Box>

        <Box mb={5} fullWidth>
          <h2 className={`${styles.form_h2} ${styles.text_uppercase} ${styles.text_center}`}>Containment action</h2>
          <p className={styles.text_center}>What did you do to correct the situation and eliminate the risk?</p>
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
          <h2 className={`${styles.form_h2} ${styles.text_uppercase} ${styles.text_center}`}>Proposed improvement</h2>
          <p className={styles.text_center}>If you are unable to correct the situation, what do you suggest as a sotution?</p>
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
          <Button
            sx={{
              height: 80, width: 250, margin: 3, ml: 1, mr: 0,
            }}
            size="large"
            type="button"
            variant="outlined"
            color="primary"
            value="print">
            <h2>Print</h2>
          </Button>
        </Box>
      </form>
      <DialogForm open={open} statusBtn={statusBtn} handleClose={handleClose} handleConfirm={handleConfirm} handleConfirmSave={handleConfirmSave} handleConfirmClear={handleConfirmClear} />
    </Container>
  );
}

export default HSEObservationForm;
