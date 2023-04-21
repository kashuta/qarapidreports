/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import RegForm from './components/Auth/RegForm';
import { refreshAccessToken } from './JWT/authActions';
import Forms from './components/Forms/Forms';
import Footer from './components/Footer/Footer';
import { Box } from '@mui/material';
import { getLocationsAction } from './Redux/report.action';
import MySpinner from './components/UI/MySpinner';

// import { setUserAction } from './components/Redux/user.action';

function App() {
  const user = useSelector((state) => state.UserReducer.user);
  const loader = useSelector((state) => state.UserReducer.loader);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshAccessToken(navigate));
    dispatch(getLocationsAction(navigate));
  }, []); // Add dependencies if needed

  if (!loader && !user) {
    return <MySpinner />;
  }

  if (!user) {
    return (
      <Container>
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
      <Navbar />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}>
        <Container>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route element={<ProtectedRoleRoute role="inspector" />}>
              <Route path="/:formId" element={<Forms />} />
              <Route path="/inspector/:userId" element={<InspectorProfile />} />
            </Route>
            <Route element={<ProtectedRoleRoute role="manager" />}>
              <Route path="/manager/:userId" element={<ManagerProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>

      </Box>
      <Footer />
    </LocalizationProvider>
  );
}

export default App;
