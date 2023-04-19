import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NoUserPage() {
  return (
    <Box mt={20} ml={30}>
      <div>
        <h1>Welcome to our website!</h1>
        <p>
          We are excited to have you here and hope that you find everything you
          are looking for.
        </p>
        <p>
          If you are new, register or log in to access all our features and
          participate in our community.
        </p>
        <p>Thank you for choosing us!</p>
      </div>
      {/* <Link to="/reg">
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
      </Link> */}
    </Box>
  );
}

export default NoUserPage;
