import React from 'react';
import { NavLink } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <NavLink to="/">Main</NavLink>
    </div>
  );
}

export default PageNotFound;
