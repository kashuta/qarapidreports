import {
  SET_USER,
  GET_USER_LOADER,
  // LOGIN_USER,
  // LOGOUT_USER,
  // API_ERROR,
} from './type.redux';

export const getUserLoaderAction = (data) => ({
  type: GET_USER_LOADER,
  payload: data,
});
export const setUserAction = (data) => ({
  type: SET_USER,
  payload: data,
});
//   export const setErrorAction = (data) => ({
//     type: API_ERROR,
//     payload: data,
//   });

//   export const setUserAction = () => (dispatch) => {
//     fetch('http://localhost:5050/auth', {
//       credentials: 'include',
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // setUser(data);
//         dispatch({
//           type: SET_USER,
//           payload: data,
//         });
//         dispatch(getUserLoaderAction(true));
//       })
//       .catch((e) => {
//         dispatch(setErrorAction(e));
//       });
//   };

//   export const loginUserAction = (form, navigate) => (dispatch) => {
//     fetch('http://localhost:5050/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(form),
//       credentials: 'include',
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (!data) {
//           alert('Invalid email or password');
//           navigate('/login');
//         } else {
//           dispatch({
//             type: LOGIN_USER,
//             payload: data,
//           });
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//         dispatch(setErrorAction(true));
//         setTimeout(() => {
//           dispatch(setErrorAction(false));
//         }, 3000);
//       })
//       .finally(() => navigate('/'));
//   };

//   export const logoutUserAction = (navigate) => (dispatch) => {
//     fetch('http://localhost:5050/auth/logout', { credentials: 'include' })
//       .then((res) => {
//         if (res.status === 200) {
//           dispatch({
//             type: LOGOUT_USER,
//             payload: null,
//           });
//         }
//         throw new Error('status not 200');
//       })
//       .catch(() => {
//         dispatch(setErrorAction(true));
//       })
//       .finally(() => navigate('/login'));
//   };
