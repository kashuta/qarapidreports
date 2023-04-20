import { Box } from '@mui/material';
import React from 'react';

function NoUserPage() {
  return (
    <Box>
      <img
        style={{
          backgroundImage: "url('/images/elbrus.png')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          width: '100%',
        }}
        src="/images/logo.png"
        alt=""
        width={1500} />
    </Box>
  );
}

export default NoUserPage;
