/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFormsNameAction } from '../../Redux/report.action';

function InspectorMain() {
  const formsName = useSelector((state) => state.ReportReducer.formsName);
  const loader = useSelector((state) => state.UserReducer.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setFormsNameAction(navigate));
  }, []);

  if (!loader) {
    return <h2 style={{ margin: 300 }}>Loading...</h2>;
  }

  return (
    <Container sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%',
    }}>
      <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
          },
          borderRadius: 4,
          width: 1 / 2,
          margin: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          pt: '20px',
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group">
          {formsName?.map((form, i) => (
            <Box sx={{ marginBottom: '20px' }} key={i}>
              <NavLink key={form.id} to={`/${form.id}`} style={{ textDecoration: 'none' }}>
                <Button
                  key={form.id}
                  size="large"
                  variant="contained"
                  color="primary"
                  sx={{
                    height: 100,
                    width: 1,
                    borderRadius: 2,
                    textDecoration: 'none',
                  }}>
                  <Typography
                    sx={{
                      fontSize: '25px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                    }}>
                    {form.name}
                  </Typography>
                </Button>
              </NavLink>
            </Box>
          ))}
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default InspectorMain;
