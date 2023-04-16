/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SignInForm from './components/Auth/SignInForm';
import Navbar from './components/Navbar/Navbar';
import './App.css';

import ProtectedRoleRoute from './components/ProtectedRoute/ProtectedRoleRoute';

import InspectorProfile from './components/Inspector/InspectorProfile';
import ManagerProfile from './components/Manager/ManagerProfile';

import Dashboard from './components/Manager/Dashboard';
import PageNotFound from './components/ProtectedRoute/PageNotFound';
import MainPage from './components/MainPage/MainPage';
import MonthSafCheck from './components/Forms/MonthSafCheck';
import ForkliftForm from './components/ForkliftForm/ForkliftForm';
import RegForm from './components/Auth/RegForm';
import { refreshAccessToken } from './JWT/authActions';

import VechSafInspCheckForm from './components/Forms/VechSafInspCheckForm';

function App() {
  const user = useSelector((state) => state.UserReducer.user);
  const loader = useSelector((state) => state.UserReducer.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, []); // Add dependencies if needed

  const locations = ['Moscow', 'Tbilisi', 'Dubai'];

  // if (!loader) {
  //   return <h2 style={{ margin: 300 }}>Loading...</h2>;
  // }
  if (!user) {
    return (
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/reg" element={<RegForm />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route element={<ProtectedRoleRoute role="inspector" />}>
            <Route
              path="/FormGME0024"
              element={<VechSafInspCheckForm location={locations} />}
            />
            <Route
              path="/FormGME0144"
              element={<MonthSafCheck location={locations} />}
            />
            <Route
              path="/ForkLiftForm"
              element={<ForkliftForm location={locations} />}
            />
            <Route path="/inspector/:userName" element={<InspectorProfile />} />
          </Route>
          <Route element={<ProtectedRoleRoute role="manager" />}>
            <Route path="/manager/:userName" element={<ManagerProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
