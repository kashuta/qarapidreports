/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setAuthToken } from '../ProtectedRoute/SetAuthToken';
import { getUserLoaderAction, setUserAction } from '../../Redux/user.action';

function SignInForm() {
  // const user = useSelector((state) => state.UserReducer.user);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.accessToken;
        localStorage.setItem('accessToken', token);
        // setAuthToken(token);
        dispatch(setUserAction(data.userFront));
        dispatch(getUserLoaderAction(true));
      })
      .catch(console.log);

    // dispatch(setUserAction(form));

    navigate('/');
  };

  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Box
      component="form"
      sx={{
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 35,
        marginTop: 10,
      }}>
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
        onClick={handleSubmit}
        variant="contained"
        type="submit"
        sx={{
          width: '100%',
        }}>
        Login
      </Button>
    </Box>
  );
}

export default SignInForm;
