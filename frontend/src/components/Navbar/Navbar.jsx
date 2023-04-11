/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { setUserAction } from '../Redux/user.action';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSignout = () => {
    dispatch(setUserAction(null));
    navigate('/');
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const manSettings = ['Profile', 'Dashboard', 'Main'];
  const inspSettings = ['Profile', 'Main'];

  const user = useSelector((state) => state.UserReducer.user);
  console.log(user);

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
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button> */}
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Ava" src={user.photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {user.role === 'Manager'
                  && manSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <NavLink to={setting} style={{ textDecoration: 'none' }}>
                        {setting}
                      </NavLink>
                    </MenuItem>
                  ))}
                {user.role === 'Inspector'
                  && inspSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <NavLink to={setting} style={{ textDecoration: 'none' }}>
                        {setting}
                      </NavLink>
                    </MenuItem>
                  ))}
                <MenuItem onClick={handleSignout}>
                  <Typography color="red">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
