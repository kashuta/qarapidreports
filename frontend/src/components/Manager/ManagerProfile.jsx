import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import PageNotFound from '../ProtectedRoute/PageNotFound';
import {
  addNewLocationAction,
  deleteLocationAction,
} from '../../Redux/report.action';

function ManagerProfile() {
  const [name, setName] = useState(null);
  const [delName, setDelName] = useState(null);
  const user = useSelector((state) => state.UserReducer.user);
  const locationsArray = useSelector((state) => state.ReportReducer.locations);
  const locations = locationsArray.map((location) => location.name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const addLocation = { name, managerId: user.id };
    dispatch(addNewLocationAction(addLocation, navigate));
    setName('');
  };
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    // const deleteLocation = { delName, managerId: user.id };
    dispatch(deleteLocationAction(delName, navigate));
  };

  const { userId } = useParams();
  if (+user.id !== +userId) {
    return <PageNotFound />;
  }
  return (
    <Box sx={{ mt: 10, width: 1 / 2, ml: '50px' }} component="form">
      <InputLabel id="demo-simple-select-label">Add Location</InputLabel>
      <TextField
        required
        name="name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        value={name}
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
        Add Location
      </Button>
      <FormControl sx={{ mt: 5, width: 1 }}>
        <InputLabel id="demo-simple-select-label">Locations</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Locations"
          onChange={(e) => setDelName(e.target.value)}>
          {locations?.map((loc) => (
            <MenuItem value={loc}>{loc}</MenuItem>
          ))}
        </Select>
        <Button
          onClick={handleSubmit1}
          variant="contained"
          type="submit"
          sx={{
            width: '100%',
          }}>
          Delete Location
        </Button>
      </FormControl>
    </Box>
  );
}

export default ManagerProfile;
