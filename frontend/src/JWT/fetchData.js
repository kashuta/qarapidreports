// const fetchData = async () => {
//     try {
//       const response = await authFetch('http://localhost:3001/api/v2/refresh');
//       if (response.status === 401) {
//         const newAccessToken = await dispatch(refreshAccessToken());
//         if (!newAccessToken) {
//           // Handle error, for example, redirect to the login page or show an error message
//           return;
//         }
//         // Retry the request with the new access token
//         fetchData();
//       } else if (response.ok) {
//         const data = await response.json();
//         dispatch(setUserAction(data));
//         // Process the data
//       } else {
//         // Handle other error statuses
//       }
//     } catch (error) {
//       console.log(error);
//       // Handle fetch errors
//     }
//   };