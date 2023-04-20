/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar, IconButton, Typography } from '@mui/material';
import { setUserAction } from '../../Redux/user.action';
import InspectorNav from './InspectorNav';
import ManagerNav from './ManagerNav';
import AdminNav from './AdminNav';
import styles from './Navbar.module.css';

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
    <Box sx={{ maxWidth: '100%', padding: 4 }}>
      <AppBar color="primary">
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
            <IconButton
              color="inherit"
              aria-label="add an alarm"
              onClick={handleSignout}>
              <LogoutOutlinedIcon sx={{ mr: 1 }} />
              <Typography sx={{ color: 'white', fontSize: 17 }}>
                LOGOUT
              </Typography>
            </IconButton>
          )}
          {!user && (

            <Box>
              <NavLink className={styles.link} to="/reg">
                <IconButton color="inherit" aria-label="add an alarm">
                  <HowToRegOutlinedIcon sx={{ mr: 1 }} />
                  <Typography sx={{ color: 'white', fontSize: 17 }}>
                    REGISTRATION
                  </Typography>
                </IconButton>
              </NavLink>
              <NavLink className={styles.link} to="/login">
                <IconButton color="inherit" aria-label="add an alarm">
                  <LoginIcon sx={{ mr: 1 }} />
                  <Typography sx={{ color: 'white', fontSize: 17 }}>
                    LOGIN
                  </Typography>
                </IconButton>
              </NavLink>
            </Box>
          )}

          {avatar && <Avatar alt="ava" src={`${avatar?.path}`} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
