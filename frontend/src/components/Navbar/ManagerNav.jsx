/* eslint-disable react/react-in-jsx-scope */
import { Typography } from '@mui/material';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

function ManagerNav() {
  const user = useSelector((state) => state.UserReducer.user);
  return (
    <>
      <NavLink className={styles.link} to="/">
        <Typography>MAIN</Typography>
      </NavLink>
      <NavLink className={styles.link} to={`/manager/${user.id}`}>
        <Typography>PROFILE</Typography>
      </NavLink>
    </>
  );
}

export default ManagerNav;
