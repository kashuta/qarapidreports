import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import WebcamCapture from '../WebCam/WebCam';
import { setAvatarAction } from '../../Redux/file.action';

function InspectorProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const dispatch = useDispatch();

  const sendFile = useCallback(() => {
    const data = new FormData();
    data.append('avatar', selectedFile);

    fetch('http://localhost:3001/api/v1/upload', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((file) => {
        dispatch(setAvatarAction(file));
      })
      .catch(console.error);
  }, [selectedFile]);

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
      {showWebcam && <WebcamCapture />}
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
        onClick={sendFile}>
        Submit
      </Button>
    </Box>
  );
}
export default InspectorProfile;
