/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Webcam from 'react-webcam';

function WebcamComponent() {
  return <Webcam />;
}

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: 'user',
};

function WebcamCapture() {
  const [image, setImage] = useState('');
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  });
  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image === '' ? (
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={220}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} />
        )}
      </div>
      <div>
        {image !== '' ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage('');
            }}
            className="webcam-btn">
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn">
            Capture
          </button>
        )}
      </div>
    </div>
  );
}
export default WebcamCapture;
