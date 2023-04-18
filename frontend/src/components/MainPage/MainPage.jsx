import React from 'react';
import { useSelector } from 'react-redux';
import InspectorMain from '../Inspector/InspectorMain';
// import ManagerMain from '../Manager/ManagerMain';
import AdminPage from '../Admin/AdminPage';
import NoUserPage from './NoUserPage';
import Dashboard from '../Manager/Dashboard';

function MainPage() {
  const loader = useSelector((state) => state.UserReducer.loader);
  const user = useSelector((state) => state.UserReducer.user);
  if (!loader) {
    return <h2 style={{ margin: 300 }}>Loading...</h2>;
  }
  if (user?.role === 'inspector') {
    return <InspectorMain />;
  }
  if (user?.role === 'manager') {
    return <Dashboard />;
  }
  if (user?.role === 'admin') {
    return <AdminPage />;
  }

  return <NoUserPage />;
}

export default MainPage;
