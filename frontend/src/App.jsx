import React from 'react';
import './App.css';
// import SignInForm from './components/Auth/SignInForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ForkliftForm from './components/ForkliftForm/ForkliftForm';

function App() {
  const locations = ['Moscow', 'Tbilisi', 'Dubai'];
  return (
    <div className="App">
      {/* <SignInForm /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ForkliftForm location={locations} />
        {/* {children} */}
      </LocalizationProvider>
    </div>
  );
}

export default App;
