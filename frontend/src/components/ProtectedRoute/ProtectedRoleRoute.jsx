/* eslint-disable react/prop-types */

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoleRoute({ role }) {
  const user = useSelector((state) => state.UserReducer.user);
  if (user.role !== role) {
    return <Navigate to="*" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoleRoute;
