import { Box, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NoUserPage() {
  return (
    <Box mt={20} ml={30}>
      <Button variant="contained">
        <Link to="/reg">Reg</Link>
      </Button>
      <Button variant="contained">
        <Link to="/login">Login</Link>
      </Button>
    </Box>
  );
}

export default NoUserPage;
