import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInForm from './components/Auth/SignInForm';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import InspectorMain from './components/InspectorMain/InspectorMain';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormGME0024 from './components/Forms/FormGME0024';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <Routes>
        <Route path="/inspector" element={<InspectorMain />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/FormGME0024" element={<FormGME0024 />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
