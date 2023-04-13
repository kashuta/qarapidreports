/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SignInForm from './components/Auth/SignInForm';
import Navbar from './components/Navbar/Navbar';
import './App.css';

// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedRoleRoute from './components/ProtectedRoute/ProtectedRoleRoute';

import InspectorProfile from './components/Inspector/InspectorProfile';
import ManagerProfile from './components/Manager/ManagerProfile';

import Dashboard from './components/Manager/Dashboard';
import PageNotFound from './components/ProtectedRoute/PageNotFound';
import MainPage from './components/MainPage/MainPage';
import FormGME0024 from './components/Forms/FormGME0024';
import ForkliftForm from './components/ForkliftForm/ForkliftForm';
import RegForm from './components/Auth/RegForm';
// import { setAuthToken } from './components/ProtectedRoute/SetAuthToken';
// import authFetch from './JWT/authFetch';
import { refreshAccessToken } from './JWT/authActions';
// import { setUserAction } from './Redux/user.action';

// import { setUserAction } from './Redux/user.action';

function App() {
  const user = useSelector((state) => state.UserReducer.user);
  // const loader = useSelector((state) => state.UserReducer.loader);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // console.log('token: ', token);
  //     setAuthToken(token);
  //   }
  //   // dispatch(setUserAction());
  // }, []);

  // Fetch data when the component mounts or when a dependency changes
  useEffect(() => {
    dispatch(refreshAccessToken());
  }, []); // Add dependencies if needed
  console.log(user);
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
            <Route path="/FormGME0024" element={<FormGME0024 />} />
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
