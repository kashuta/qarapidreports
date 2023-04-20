import React from 'react';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <footer>
      <Box
        sx={{
          alignItems: 'center',
          height: '50px', // Высота футера
          borderTop: '5px solid #ddd', // Цвет и толщина верхней границы
          backgroundColor: '#15315B', // Цвет фона
          marginTop: '1200px', // Высота между фут
        }}
        >

        <p style={{ textAlign: 'center', color: 'white' }}>
          © 2023 Matter Labs | All rights reserved | Elbrus-2023 Tigers
        </p>
      </Box>
    </footer>
  );
}

export default Footer;
