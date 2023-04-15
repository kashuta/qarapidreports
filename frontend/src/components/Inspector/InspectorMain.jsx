import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

function InspectorMain() {
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
          // minWidth: 300,
          // minHeight: 300,
          // maxWidth: 400,
          // maxHeight: 300,
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
          <Button size="large" sx={{ height: 85, width: 300, borderRadius: 2 }} key="one">
            <p style={{ marginRight: '15px', padding: 'auto' }}>GME0024</p>
            <h4 style={{ marginRight: 'auto', padding: 'auto' }}><Link to="/FormGME0024">VEHICLE SAFETY INSPECTION CHECKLIST</Link></h4>
          </Button>
          <Button size="large" sx={{ height: 85, width: 300, borderRadius: 2 }} key="two">
            <p style={{ marginRight: '15px', padding: 'auto' }}>GME0109</p>
            <h4 style={{ marginRight: 'auto', padding: 'auto' }}><Link to="/form4">HSE OBSERVATION STOP CARD</Link></h4>
          </Button>
          <Button size="large" sx={{ height: 85, width: 300, borderRadius: 2 }} key="three">
            <p>GME0144</p>
            <h4 style={{ marginRight: 'auto', padding: 'auto' }}>MONTHLY SAFETY CHECKLIST - FIELD SERVICES</h4>
          </Button>
          <Button size="large" sx={{ height: 85, width: 300, borderRadius: 2 }} key="four">
            <p style={{ marginRight: '15px', padding: 'auto' }}>GME0176</p>
            <h4 style={{ marginRight: 'auto', padding: 'auto' }}><Link to="/ForkLiftForm">Fork Safety Inspection Checklist</Link></h4>
          </Button>
          <Button size="large" sx={{ height: 85, width: 300, borderRadius: 2 }} key="five">
            <p style={{ marginRight: '15px', padding: 'auto' }}>WW0320</p>
            <h4 style={{ marginRight: 'auto', padding: 'auto' }}>Tool Box Safety Meeting Form</h4>
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default InspectorMain;
