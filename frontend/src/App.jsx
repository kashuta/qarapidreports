/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import SignInForm from './components/Auth/SignInForm';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import InspectorMain from './components/InspectorMain/InspectorMain';
// import { setUserAction } from './components/Redux/user.action';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setUserAction());
  // }, []);

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/inspector" element={<InspectorMain />} />
      </Routes>
    </Container>
  );
}

export default App;
