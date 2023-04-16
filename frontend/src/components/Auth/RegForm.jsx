/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';

import { useNavigate } from 'react-router-dom';

function RegForm() {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/api/v2/auth/registration', {
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
          navigate('/reg');
        } else {
          alert('Please check your email and activate your account');
          navigate('/login');
        }
      })
      .catch(console.log);
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
        label="First and Last Name"
        name="userName"
        variant="outlined"
        onChange={handleInput}
        value={form.name}
        sx={{
          marginBottom: '1rem',
          width: '100%',
        }}
      />
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
      <InputLabel id="demo-simple-select-label" required>
        Choose your role
      </InputLabel>
      <Select
        required
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="role"
        value={form.role}
        onChange={handleInput}
        sx={{
          marginBottom: '1rem',
          width: '100%',
        }}>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
        <MenuItem value="Inspector">Inspector</MenuItem>
      </Select>
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

export default RegForm;
