import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PageNotFound from '../ProtectedRoute/PageNotFound';

function InspectorProfile() {
  const user = useSelector((state) => state.UserReducer.user);
  const { userId } = useParams();
  if (+user.id !== +userId) {
    return <PageNotFound />;
  }
  return (
    <Box sx={{ mt: 10, ml: 20 }}>
      <Typography sx={{ fontSize: 70 }}>Section under development</Typography>
    </Box>
  );
}

export default InspectorProfile;
