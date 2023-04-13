/* eslint-disable no-undef */
export const setAuthToken = (token) => {
  if (token) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    fetch('http://localhost:3001/api/v2/refresh', {
      method: 'GET',
      headers,
    });
  } else {
    delete headers.Authorization;
  }
};
