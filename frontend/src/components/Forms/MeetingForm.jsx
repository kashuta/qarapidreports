/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import {
  FieldArray, Form, Formik,
} from 'formik';
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
  TextField,
  Button,
  Box,
  Container,
  MenuItem,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './Form.module.css';
import DialogForm from './DialogForm';
import { createReportAction } from '../../Redux/report.action';
import FileUpload from '../FileUpload/FileUpload';

function MeetingForm({ location }) {
  const [open, setOpen] = useState(false);
  const [statusBtn, setStatusBtn] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formId = useLocation().pathname.split('/').at(-1);
  const user = useSelector((state) => state.UserReducer.user);
  const [singleFile, setSingleFile] = useState([]);
  const [fileList, setFileList] = useState([]);

  const validationSchema = yup.object().shape({
    country: yup
      .string('Enter operator name')
      .required('Please, fill this field'),
    location: yup
      .string('Enter location')
      .required('Please, fill this field'),
    description: yup
      .string()
      .required('Please, fill this field'),
    points: yup
      .string()
      .required('Please, fill this field'),
    supervisor: yup.object({
      name: yup
        .string()
        .required('Please, fill this field'),
      company: yup
        .string()
        .required('Please, fill this field'),
      position: yup
        .string()
        .required('Please, fill this field'),
    }),
    participants: yup.array().of(yup.object().shape({
      name: yup
        .string()
        .required('Please, fill this field'),
      company: yup
        .string()
        .required('Please, fill this field'),
      position: yup
        .string()
        .required('Please, fill this field'),
    })),
  });

  const initialValues = {
    country: '',
    date: dayjs(new Date()),
    location: '',
    description: '',
    points: '',
    supervisor: {
      name: '',
      company: '',
      position: '',
    },
    participants: [
      {
        name: '',
        company: '',
        position: '',
      },
    ],
  };

  const handleSubmit = (event, formik) => {
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

  const handleConfirm = (formik) => {
    setOpen(false);
    formik.handleSubmit();
  };

  const handleConfirmClear = (formik) => {
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          const imgNames = fileList.map((el) => el.name).join(', ');
          const data = new FormData();
          data.append('formData', JSON.stringify(values));
          data.append('formId', formId);
          data.append('userId', user.id);
          data.append('status', 'submit');
          data.append('images', imgNames);

          if (fileList.length > 0) {
            fileList.forEach((file) => {
              data.append('file', file);
            });
          }
          dispatch(createReportAction(data, navigate));
          resetForm();
          setFileList([]);
          setSingleFile([]);
        }}
        >
        {(formik) => (
          <>
            <Form>
              <h1 className={`${styles.form_h1} ${styles.text_uppercase} ${styles.text_center}`}>TOOL BOX SAFETY MEETING FORM</h1>
              <Grid container spacing={1} mb={5}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    id="country"
                    name="country"
                    label="Country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={(e) => formik.setFieldTouched(e.target.name)}
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <DatePicker
                    label="Date"
                    name="date"
                    value={formik.values.date}
                    onChange={((value) => (formik.setValues({ ...formik.values, date: value })))}
                    sx={{ width: '100%' }}
                />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
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
                </Grid>
              </Grid>

              <Box mb={5}>
                <h4 className={`${styles.text_center} ${styles.form_h4}`} style={{ background: '#bfbfbf', marginBottom: '24px' }}>Description of the job</h4>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
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

              <Box mb={5}>
                <h4 className={`${styles.text_center} ${styles.form_h4}`} style={{ background: '#bfbfbf', marginBottom: '24px' }}>HSE points discussed</h4>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  id="points"
                  name="points"
                  label=""
                  value={formik.values.points}
                  onChange={formik.handleChange}
                  onBlur={(e) => formik.setFieldTouched(e.target.name)}
                  error={formik.touched.points && Boolean(formik.errors.points)}
                  helperText={formik.touched.points && formik.errors.points}
                />

                <FileUpload multiple name="images" singleFile={singleFile} setSingleFile={setSingleFile} fileList={fileList} setFileList={setFileList} />
              </Box>

              <Box
                mb={5}
                align="center"
              >
                <h4 className={`${styles.text_center} ${styles.form_h4}`} style={{ background: '#bfbfbf', marginBottom: '24px' }}>Supervisor</h4>

                <Grid container spacing={1} mb={5}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      id="supervisor.name"
                      name="supervisor.name"
                      label="First Name / Last Name"
                      value={formik.values.supervisor.name}
                      onChange={formik.handleChange}
                      onBlur={(e) => formik.setFieldTouched(e.target.name)}
                      error={formik.touched.supervisor?.name && Boolean(formik.errors.supervisor?.name)}
                      helperText={formik.touched.supervisor?.name && formik.errors.supervisor?.name}
                  />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      id="supervisor.company"
                      name="supervisor.company"
                      label="Company"
                      value={formik.values.supervisor.company}
                      onChange={formik.handleChange}
                      onBlur={(e) => formik.setFieldTouched(e.target.name)}
                      error={formik.touched.supervisor?.company && Boolean(formik.errors.supervisor?.company)}
                      helperText={formik.touched.supervisor?.company && formik.errors.supervisor?.company}
                  />

                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      id="supervisor.position"
                      name="supervisor.position"
                      label="Position"
                      value={formik.values.supervisor.position}
                      onChange={formik.handleChange}
                      onBlur={(e) => formik.setFieldTouched(e.target.name)}
                      error={formik.touched.supervisor?.position && Boolean(formik.errors.supervisor?.position)}
                      helperText={formik.touched.supervisor?.position && formik.errors.supervisor?.position}
                  />
                  </Grid>
                </Grid>
              </Box>

              <Box
                mb={5}
                align="center"
              >
                <h4 className={`${styles.text_center} ${styles.form_h4}`} style={{ background: '#bfbfbf', border: '2px solid black', borderBottom: 0 }}>Staff who participated in the meeting</h4>
                <FieldArray name="participants">
                  {(arrayHelpers) => (
                    <>
                      <TableContainer component={Paper} sx={{ border: 1, alignContent: 'center', boxSizing: 'border-box' }}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ background: '#bfbfbf' }}>
                              <TableCell sx={{ border: 1, padding: '10px' }} align="center">№</TableCell>
                              <TableCell sx={{ border: 1, padding: '10px' }}>
                                <h4 className={styles.form_h4}>First Name / Last Name</h4>
                              </TableCell>
                              <TableCell sx={{ border: 1, padding: '10px' }}>
                                <h4 className={styles.form_h4}>Company</h4>
                              </TableCell>
                              <TableCell sx={{ border: 1, borderRight: 0, padding: '10px' }}>
                                <h4 className={styles.form_h4}>Position</h4>
                              </TableCell>
                              <TableCell sx={{ border: 1, borderLeft: 0, padding: '10px' }} />
                            </TableRow>
                          </TableHead>
                          <TableBody>

                            {formik.values.participants.map((elem, index) => (
                              <TableRow key={index}>
                                <TableCell sx={{ border: 1, padding: '10px' }} align="center">{index + 1}</TableCell>
                                <TableCell sx={{ border: 1, padding: '10px' }}>
                                  <TextField
                                    fullWidth
                                    inputProps={{
                                      style: {
                                        padding: '5px',
                                      },
                                    }}
                                    name={`participants.${index}.name`}
                                    value={formik.values.participants[`${index}`]?.name}
                                    onChange={formik.handleChange}
                                    onBlur={(e) => formik.setFieldTouched(e.target.name)}
                                    error={formik.touched.participants?.[`${index}`]?.name && Boolean(formik.errors.participants?.[`${index}`]?.name)}
                                    helperText={formik.touched.participants?.[`${index}`]?.name && formik.errors.participants?.[`${index}`]?.name}
                            />
                                </TableCell>
                                <TableCell sx={{ border: 1, padding: '10px' }}>
                                  <TextField
                                    fullWidth
                                    inputProps={{
                                      style: {
                                        padding: '5px',
                                      },
                                    }}
                                    name={`participants.${index}.company`}
                                    value={formik.values.participants[`${index}`]?.company}
                                    onChange={formik.handleChange}
                                    onBlur={(e) => formik.setFieldTouched(e.target.name)}
                                    error={formik.touched.participants?.[`${index}`]?.company && Boolean(formik.errors.participants?.[`${index}`]?.company)}
                                    helperText={formik.touched.participants?.[`${index}`]?.company && formik.errors.participants?.[`${index}`]?.company}
                            />
                                </TableCell>
                                <TableCell sx={{
                                  border: 1, borderRight: 0, padding: '10px',
                                }}>
                                  <TextField
                                    inputProps={{
                                      style: {
                                        padding: '5px',
                                      },
                                    }}
                                    name={`participants.${index}.position`}
                                    value={formik.values.participants[`${index}`]?.position}
                                    onChange={formik.handleChange}
                                    onBlur={(e) => formik.setFieldTouched(e.target.name)}
                                    error={formik.touched.participants?.[`${index}`]?.position && Boolean(formik.errors.participants?.[`${index}`]?.position)}
                                    helperText={formik.touched.participants?.[`${index}`]?.position && formik.errors.participants?.[`${index}`]?.position}
                            />
                                </TableCell>
                                <TableCell sx={{ border: 1, borderLeft: 0, padding: '10px' }}>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                      if (formik.values.participants.length > 1) {
                                        arrayHelpers.remove(index);
                                      }
                                    }}>
                                    <DeleteIcon />
                                  </IconButton>

                                </TableCell>
                              </TableRow>
                            ))}

                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Box mt={3} align="center">
                        <Button
                          variant="contained"
                          onClick={() => {
                            arrayHelpers.push({
                              name: '',
                              company: '',
                              position: '',
                            });
                          }}>
                          Add participant

                        </Button>
                      </Box>
                    </>
                  )}
                </FieldArray>
              </Box>

              <Box m="30px 0 30px 0" display="flex" justifyContent="center">
                <Button
                  sx={{
                    height: 80, width: 250, margin: 3, ml: 0, mr: 1,
                  }}
                  size="large"
                  onClick={(e) => handleSubmit(e, formik)}
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
                  onClick={(e) => handleSubmit(e, formik)}
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
                  onClick={(e) => handleSubmit(e, formik)}
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
            </Form>
            <DialogForm open={open} statusBtn={statusBtn} handleClose={handleClose} handleConfirm={() => handleConfirm(formik)} handleConfirmSave={handleConfirmSave} handleConfirmClear={() => handleConfirmClear(formik)} />
          </>
        )}
      </Formik>
    </Container>
  );
}

export default MeetingForm;
