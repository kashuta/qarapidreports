/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import SignInForm from './components/Auth/SignInForm';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import InspectorMain from './components/InspectorMain/InspectorMain';

function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/inspector" element={<InspectorMain />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </Container>
  );
}

export default App;
