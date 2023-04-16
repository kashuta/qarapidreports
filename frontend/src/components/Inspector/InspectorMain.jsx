import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
          },
          borderRadius: 4,
          boxShadow: 10,
          height: 600,
          width: 450,
          margin: 'auto',
          marginTop: '150px',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center">
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group">
          {formsName?.map((form) => (
            <Button
              key={form.id}
              size="large"
              sx={{ height: 85, width: 300, borderRadius: 2 }}>
              <h4 style={{ marginRight: 'auto', padding: 'auto' }}>
                <Link to={`/${form.id}`}>{form.name}</Link>
              </h4>
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default InspectorMain;
