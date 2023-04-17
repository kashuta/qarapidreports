import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import WebcamCapture from '../WebCam/WebCam';
import { setAvatarAction } from '../../Redux/file.action';
import { refreshAccessToken } from '../../JWT/authActions';
import authFetch from '../../JWT/authFetch';

function InspectorProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = new FormData();
      data.append('avatar', selectedFile);
      const response = await authFetch('http://localhost:3001/api/v2/form/upload', {
        method: 'POST',
        credentials: 'include',
        body: data,
      });
      if (response.status === 401) {
        const newAccessToken = await dispatch(refreshAccessToken());
        if (!newAccessToken) {
          return;
          // Handle error, for example, redirect to the login page or show an error message
        }
        // Retry the request with the new access token
        fetchData();
      } else if (response.ok) {
        const result = await response.json();
        dispatch(setAvatarAction(result));
        // Process the data
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Add dependencies if needed

  return (
    <Box
      sx={{
        margin: 20,
        width: 300,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '5px',
      }}>
      {showWebcam && <WebcamCapture setSelectedFile={setSelectedFile} />}
      <Button
        variant="contained"
        component="label"
        onClick={() => setShowWebcam(!showWebcam)}>
        {showWebcam ? 'Close Webcam' : 'Take Photo'}
      </Button>
      <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </Button>
      <Button
        variant="contained"
        component="label"
        type="submit"
        onClick={fetchData}>
        Submit
      </Button>
    </Box>
  );
}
export default InspectorProfile;
