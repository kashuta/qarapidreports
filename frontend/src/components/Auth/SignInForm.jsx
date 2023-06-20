/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserLoaderAction, loginUserAction } from '../../Redux/user.action';

function SignInForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getUserLoaderAction(false));
    dispatch(loginUserAction(form, navigate));
    navigate('/');
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
    </Box>
  );
}

export default SignInForm;
