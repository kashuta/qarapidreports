/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Button, MenuItem, Select, TextField,
} from '@mui/material';
import { Box } from '@mui/system';

import { useDispatch } from 'react-redux';
import { setUserAction } from '../Redux/user.action';
// import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
  });
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(setUserAction(form));
  };

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
        label="First Name"
        name="name"
        variant="outlined"
        onChange={handleInput}
        value={form.name}
        sx={{
          marginBottom: '1rem',
          width: '100%',
        }}
      />
      <TextField
        label="Last Name"
        name="surname"
        variant="outlined"
        onChange={handleInput}
        value={form.surname}
        sx={{
          marginBottom: '1rem',
          width: '100%',
        }}
      />
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
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="role"
        value={form.role}
        label="Role"
        onChange={handleInput}
        sx={{
          marginBottom: '1rem',
          width: '100%',
        }}
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
        <MenuItem value="Inspector">Inspector</MenuItem>
      </Select>
      <Button
        variant="contained"
        component="label"
        sx={{
          marginBottom: '1rem',
          width: '100%',
        }}
      >
        Upload Your Photo
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <Button
        onClick={handleSubmit}
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
