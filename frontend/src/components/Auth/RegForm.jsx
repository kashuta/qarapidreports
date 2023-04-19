/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      container
      display="flex"
      alignItems="center"
      justify="center"
      minHeight="100vh"
      flexDirection="column"
      margin="100px 400px"
      // sx={{
      //   width: '40%',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   flexDirection: 'column',
      //   marginLeft: 35,
      //   marginTop: 10,
      // }}
    >
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
        helperText="More than six characters"
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
        SignUp
      </Button>
    </Box>
  );
}

export default RegForm;
