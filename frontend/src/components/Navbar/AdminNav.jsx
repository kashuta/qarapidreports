/* eslint-disable react/react-in-jsx-scope */
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

function AdminNav() {
  const user = useSelector((state) => state.UserReducer.user);
  return (
    <>
      <NavLink className={styles.link} to="/">Home</NavLink>
      <NavLink className={styles.link} to={`/profile/${user.surname}`}>Profile</NavLink>
    </>
  );
}

export default AdminNav;
