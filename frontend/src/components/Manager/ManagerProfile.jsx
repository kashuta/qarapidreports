import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageNotFound from '../ProtectedRoute/PageNotFound';

function ManagerProfile() {
  const user = useSelector((state) => state.UserReducer.user);
  const { userId } = useParams();
  if (+user.id !== +userId) {
    return <PageNotFound />;
  }
  return <div>ManagerProfile</div>;
}

export default ManagerProfile;
