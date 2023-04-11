/* eslint-disable import/no-extraneous-dependencies */
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setUserAction } from '../../redux/user.action';

function SignInForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const url = 'http://localhost:3000/api/auth/login';
  //     dispatch(setUserAction(form, url, navigate));
  //   };

  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Box
      component="form"
      sx={{
        width: '40%',
        margin: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TextField
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
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        onChange={handleInput}
        value={form.password}
        sx={{
          marginBottom: '1rem',
          width: '100%',
        }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: '100%',
        }}
      >
        Login
      </Button>
    </Box>
  );
}

export default SignInForm;
