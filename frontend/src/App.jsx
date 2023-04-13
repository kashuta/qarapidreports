import React from 'react';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import SignInForm from './components/Auth/SignInForm';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import InspectorMain from './components/InspectorMain/InspectorMain';
import VechSafInspCheckForm from './components/VechSafInspCheckForm/VechSafInspCheckForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/inspector" element={<InspectorMain />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/VechSafInspCheckForm" element={<VechSafInspCheckForm />} />
        </Routes>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
