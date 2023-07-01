import { Box } from '@mui/material';
import React from 'react';

import { RotatingLines } from 'react-loader-spinner';

function MySpinner() {
  return (
    <Box sx={{ mt: '300px', ml: '650px' }}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="120"
        visible
      />
    </Box>
  );
}

export default MySpinner;
