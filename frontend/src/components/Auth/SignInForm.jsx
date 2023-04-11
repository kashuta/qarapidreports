/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Button, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { Box } from '@mui/system';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserAction } from '../Redux/user.action';

function SignInForm() {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
    // photo: selectedFile,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(setUserAction(form));
    navigate('/inspector');
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
      }}
    >
      <TextField
        required
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
        required
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
        }}
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
        <MenuItem value="Inspector">Inspector</MenuItem>
      </Select>
      {/* <Button
        variant="contained"
        component="label"
        sx={{
          marginBottom: '1rem',
          width: '100%',
        }}
      >
        Upload Your Photo:
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          name="photo"
          // value={selectedFile}
          // onChange={(event) => {
          //   setForm({ ...form, photo: event.target.files[0] });
          // }}
          onChange={handleFileSelect}
        />
        {selectedFile && <span>{selectedFile.name}</span>}
      </Button> */}
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
