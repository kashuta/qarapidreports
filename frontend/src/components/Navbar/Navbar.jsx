/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Button } from '@mui/material';
import { setUserAction } from '../../Redux/user.action';
import InspectorNav from './InspectorNav';
import ManagerNav from './ManagerNav';
import AdminNav from './AdminNav';

export default function Navbar() {
  const user = useSelector((state) => state.UserReducer.user);
  const avatar = useSelector((state) => state.FileReducer.avatar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    fetch('http://localhost:3001/api/v2/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    localStorage.removeItem('accessToken');
    dispatch(setUserAction(null));
    navigate('/login');
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
      }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <img
            alt="pcm-logo"
            src="https://www.pcm.eu/sites/default/files/logo_pcm.png"
          />
          {user?.role === 'inspector' && <InspectorNav />}
          {user?.role === 'manager' && <ManagerNav />}
          {user?.role === 'admin' && <AdminNav />}
          {user && (
            <Button onClick={handleSignout} color="inherit">
              Logout
            </Button>
          )}
          {avatar && <Avatar alt="ava" src={`${avatar?.path}`} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
