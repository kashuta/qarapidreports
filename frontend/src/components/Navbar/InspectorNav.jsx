/* eslint-disable react/react-in-jsx-scope */
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

function InspectorNav() {
  const user = useSelector((state) => state.UserReducer.user);
  return (
    <>
      <NavLink className={styles.link} to="/">
        Home
      </NavLink>
      <NavLink className={styles.link} to={`/inspector/${user.id}`}>
        Profile
      </NavLink>
    </>
  );
}

export default InspectorNav;
