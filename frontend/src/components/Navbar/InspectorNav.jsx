/* eslint-disable react/react-in-jsx-scope */
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import styles from './Navbar.module.css';

function InspectorNav() {
  const user = useSelector((state) => state.UserReducer.user);
  return (
    <>
      <NavLink className={styles.link} to="/">
        <Typography>MAIN</Typography>
      </NavLink>
      <NavLink className={styles.link} to={`/inspector/${user.id}`}>
        <Typography>PROFILE</Typography>
      </NavLink>
    </>
  );
}

export default InspectorNav;
