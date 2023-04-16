/* eslint-disable react/react-in-jsx-scope */

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

function ManagerNav() {
  const user = useSelector((state) => state.UserReducer.user);
  return (
    <>
      <NavLink className={styles.link} to="/">
        Home
      </NavLink>
      <NavLink className={styles.link} to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink className={styles.link} to={`/manager/${user.id}`}>
        Profile
      </NavLink>
    </>
  );
}

export default ManagerNav;
