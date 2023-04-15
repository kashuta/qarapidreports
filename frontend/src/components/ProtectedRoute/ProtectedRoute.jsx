/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable react/prop-types */
// /* eslint-disable import/no-extraneous-dependencies */
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// function ProtectedRoute({ isLogged, redirectTo = '/' }) {
//   const user = useSelector((state) => state.UserReducer.user);
//   if (isLogged !== !!user) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   return <Outlet />;
// }

// export default ProtectedRoute;

import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function ProtectedRoute({ element: Element, ...rest }) {
  function hasJWT() {
    let flag = false;

    // check user has JWT token
    localStorage.getItem('token') ? (flag = true) : (flag = false);

    return flag;
  }

  return (
    <Route
      {...rest}
      element={hasJWT() ? <Element /> : <Navigate to="/login" replace />}
    />
  );
}

export default ProtectedRoute;
