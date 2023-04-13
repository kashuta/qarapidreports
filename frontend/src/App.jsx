/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SignInForm from './components/Auth/SignInForm';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedRoleRoute from './components/ProtectedRoute/ProtectedRoleRoute';

import InspectorProfile from './components/Inspector/InspectorProfile';
import ManagerProfile from './components/Manager/ManagerProfile';

import Dashboard from './components/Manager/Dashboard';
import PageNotFound from './components/ProtectedRoute/PageNotFound';
import MainPage from './components/MainPage/MainPage';
import FormGME0024 from './components/Forms/FormGME0024';
import ForkliftForm from './components/ForkliftForm/ForkliftForm';
import RegForm from './components/Auth/RegForm';

// import { setUserAction } from './components/Redux/user.action';

function App() {
  // const user = useSelector((state) => state.UserReducer.user);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setUserAction());
  // }, []);

  const locations = ['Moscow', 'Tbilisi', 'Dubai'];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute isLogged={false} />}>
            <Route path="/reg" element={<RegForm />} />
            <Route path="/login" element={<SignInForm />} />
          </Route>
          <Route element={<ProtectedRoute isLogged redirectTo="/reg" />}>
            <Route path="/" element={<MainPage />} />
            <Route element={<ProtectedRoleRoute role="Inspector" />}>
              <Route path="/FormGME0024" element={<FormGME0024 />} />
              <Route
                path="/form1"
                element={<ForkliftForm location={locations} />}
              />
              <Route path="/profile/:surname" element={<InspectorProfile />} />
            </Route>
            <Route element={<ProtectedRoleRoute role="Manager" />}>
              <Route path="/profile/:surname" element={<ManagerProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
