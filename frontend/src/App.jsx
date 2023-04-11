import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import SignInForm from './components/Auth/SignInForm';
import InspectorMain from './components/InspectorMain/InspectorMain';

function App() {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/inspector" element={<InspectorMain />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </Container>
  );
}

export default App;
