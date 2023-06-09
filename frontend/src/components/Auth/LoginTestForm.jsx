/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserLoaderAction, setUserAction } from '../../Redux/user.action';
// import DialogForm from '../Forms/DialogForm';

function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(getUserLoaderAction(false));
      fetch('http://localhost:3001/api/v2/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
            dispatch(getUserLoaderAction(true));
            navigate('/login');
          } else {
            const token = data.accessToken;
            localStorage.setItem('accessToken', token);
            dispatch(setUserAction(data.userFront));
            dispatch(getUserLoaderAction(true));
          }
        })
        .catch(console.log);

      navigate('/');
      resetForm();
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(getUserLoaderAction(false));
  //   fetch('http://localhost:3001/api/v2/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(form),
  //     credentials: 'include',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.message) {
  //         alert(data.message);
  //         dispatch(getUserLoaderAction(true));
  //         navigate('/login');
  //       } else {
  //         const token = data.accessToken;
  //         localStorage.setItem('accessToken', token);
  //         dispatch(setUserAction(data.userFront));
  //         dispatch(getUserLoaderAction(true));
  //       }
  //     })
  //     .catch(console.log);

  //   navigate('/');
  // };

  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
      <TextField
        required
        label="Email"
        name="email"
        variant="outlined"
        onChange={handleInput}
        value={form.email}
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
        onChange={handleInput}
        value={form.password}
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
        onClick={handleSubmit}
        variant="contained"
        type="submit"
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
    </Box>
  );
}

export default SignInForm;