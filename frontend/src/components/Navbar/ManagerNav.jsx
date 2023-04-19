/* eslint-disable react/react-in-jsx-scope */
import { IconButton, Typography } from '@mui/material';

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

function ManagerNav() {
  const user = useSelector((state) => state.UserReducer.user);
  return (
    <>
      <NavLink className={styles.link} to="/">
        <IconButton color="inherit" aria-label="add an alarm">
          <HomeOutlinedIcon sx={{ mr: 1 }} />
          <Typography sx={{ color: 'white', fontSize: 17 }}>MAIN</Typography>
        </IconButton>
      </NavLink>
      <NavLink className={styles.link} to={`/manager/${user.id}`}>
        <IconButton color="inherit" aria-label="add an alarm">
          <ManageAccountsOutlinedIcon sx={{ mr: 1 }} />
          <Typography sx={{ color: 'white', fontSize: 17 }}>PROFILE</Typography>
        </IconButton>
      </NavLink>
    </>
  );
}

export default ManagerNav;
