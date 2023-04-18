import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NoUserPage() {
  return (
    <Box mt={20} ml={30}>
      <Link to="/reg">
        {' '}
        <Button variant="contained">
          <Typography>REGISTRATION</Typography>
        </Button>
      </Link>

      <Link to="/login">
        {' '}
        <Button variant="contained">
          <Typography>LOGIN</Typography>
        </Button>
      </Link>
    </Box>
  );
}

export default NoUserPage;
