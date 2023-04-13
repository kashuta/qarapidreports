/* eslint-disable no-param-reassign */
import { getAccessToken } from './tokenHelpers';

export default async function authFetch(url, options = {}) {
  const accessToken = getAccessToken();

  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return fetch(url, options);
}
