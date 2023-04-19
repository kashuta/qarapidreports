/* eslint-disable react/react-in-jsx-scope */
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IconButton, Typography } from '@mui/material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './Navbar.module.css';

function InspectorNav() {
  const user = useSelector((state) => state.UserReducer.user);
  return (
    <>
      <NavLink className={styles.link} to="/">
        <IconButton color="inherit" aria-label="add an alarm">
          <HomeOutlinedIcon sx={{ mr: 1 }} />
          <Typography sx={{ color: 'white', fontSize: 17 }}>MAIN</Typography>
        </IconButton>
      </NavLink>
      <NavLink className={styles.link} to={`/inspector/${user.id}`}>
        <IconButton color="inherit" aria-label="add an alarm">
          <ManageAccountsOutlinedIcon sx={{ mr: 1 }} />
          <Typography sx={{ color: 'white', fontSize: 17 }}>PROFILE</Typography>
        </IconButton>
      </NavLink>
    </>
  );
}

export default InspectorNav;
