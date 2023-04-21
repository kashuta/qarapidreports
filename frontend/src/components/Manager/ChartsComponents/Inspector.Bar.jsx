/* eslint-disable max-len */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

function InspectorBar({ name, count, total }) {
  const formsName = useSelector(
    (state) => state.ReportReducer.formsName,
  );

  console.log('countcountcountcountcount', count);
  console.log('totaltotaltotaltotal', total);
  console.log('namenamenamenamename', name);

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

  const labels = Object.keys(count);

  const colors = ['#3399CC', '#ff6600', '#8BB836', '#15315B', '#707173'];
  const data = {
    labels, // название отчетов
    datasets: [
      {
        label: 'Total for period',
        data: Object.values(count), // подставить колл. отчетов
        backgroundColor: colors,
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

      <Box sx={{ flex: 1, marginRight: 5 }}>
        <TableContainer component={Paper} elevation={10}>
          <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 18 }}>
                  <b>Total: {total}</b>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 18 }}><b>Count</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {Object.entries(count).map((item, index) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ backgroundColor: colors[index] }}>
                    <b>
                      {item[0]}
                    </b>
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: 18 }}><b>{item[1]}</b></TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default InspectorBar;
