import React from 'react';
import { useSelector } from 'react-redux';
import InspectorMain from '../Inspector/InspectorMain';
import ManagerMain from '../Manager/ManagerMain';
import AdminPage from '../Admin/AdminPage';

function MainPage() {
  const user = useSelector((state) => state.UserReducer.user);

  if (user.role === 'Inspector') {
    return <InspectorMain />;
  }
  if (user.role === 'Manager') {
    return <ManagerMain />;
  }

  return <AdminPage />;
}

export default MainPage;
