/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import { Avatar, Button } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import Tooltip from '@mui/material/Tooltip';
// import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { setUserAction } from '../../Redux/user.action';
import InspectorNav from './InspectorNav';
import ManagerNav from './ManagerNav';
import AdminNav from './AdminNav';
// // import Button from '@mui/material/Button';
// // import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const user = useSelector((state) => state.UserReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(setUserAction(null));
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          width: '100%',
        }}>
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
          {user?.role === 'Inspector' && <InspectorNav />}
          {user?.role === 'Manager' && <ManagerNav />}
          {user?.role === 'Admin' && <AdminNav />}
          {user && <Button onClick={handleSignout} color="inherit">Logout</Button>}

        </Toolbar>
      </AppBar>
    </Box>
  );
}
