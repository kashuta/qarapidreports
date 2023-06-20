/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserLoaderAction, loginUserAction } from '../../Redux/user.action';
// import DialogForm from '../Forms/DialogForm';

function SignInFormTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
      password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(getUserLoaderAction(false));
      console.log(values, '!!!values!!!');
      dispatch(loginUserAction(values, navigate));
      alert(JSON.stringify(values, null, 2));
      resetForm();
      navigate('/');
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Box
      component="form"
      container="true"
      display="flex"
      alignItems="center"
      justify="center"
      flexDirection="column"
      margin="100px 400px">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          required
          label="Email"
          name="email"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            marginBottom: '1rem',
            width: '100%',
          }}
        />

        <TextField
          required
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            marginBottom: '1rem',
            width: '100%',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          sx={{
            width: '100%',
          }}>
          Login
        </Button>
        {/* <DialogForm
        open={open}
        statusBtn={statusBtn}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleConfirmSave={handleConfirmSave}
        handleConfirmClear={handleConfirmClear}
      /> */}
      </form>
    </Box>
  );
}

export default SignInFormTest;
