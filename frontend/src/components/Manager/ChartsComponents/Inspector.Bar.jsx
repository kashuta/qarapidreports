/* eslint-disable max-len */
import React from 'react';
import { Bar } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

function InspectorBar({ inspector, count }) {
  const formsName = useSelector(
    (state) => state.ReportReducer.formsName,
  );

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Number of reports by form',
      },
    },
    scales: {
      x: {
        ticks: {
          display: false, // Установите display в false для скрытия labels оси X
        },
      },
    },
  };

  const labels = formsName.map((form) => form.name);

  const data = {
    labels, // название отчетов
    datasets: [
      {
        label: 'Total for period',
        data: count, // подставить колл. отчетов
        backgroundColor: ['#3399CC', '#ff6600', '#8BB836', '#15315B', '#707173'],
      },
    ],
  };
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mt: 5,
    }}>
      <Box>
        <Bar options={options} data={data} width={600} height={300} />
      </Box>

      <Box sx={{ flex: 1, marginRight: 1 }}>
        <TableContainer component={Paper} elevation={10}>
          <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 18 }}>
                  <b>{inspector}</b>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 18 }}><b>Count</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: '#3399CC' }}>
                  <b>MONTHLY SAFETY CHECKLIST</b>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 18 }}><b>{count[0]}</b></TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: '#ff6600' }}><b>VEHICLE SAFETY INSPECTION</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 18 }}><b>{count[1]}</b></TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: '#8BB836' }}><b>FORKLIFT SAFETY INSPECTION</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 18 }}><b>{count[2]}</b></TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: '#15315B', color: 'white' }}><b>HSE OBSERVATION (STOP)</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 18 }}><b>{count[3]}</b></TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ backgroundColor: '#707173' }}><b>TOOL BOX SAFETY MEETING</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 18 }}><b>{count[4]}</b></TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ fontSize: 18 }}><b>total:</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 18 }}><b>{count[5]}</b></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default InspectorBar;
