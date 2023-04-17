import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(nameForm, inspector, location, date) {
  return {
    nameForm, inspector, location, date,
  };
}

const rows = [
  createData('MONTHLY SAFETY CHECKLIST - FIELD SERVICES', 'inspector1', 'Dubai', '24/04/23'),
  createData('VEHICLE SAFETY INSPECTION - CHECKLIST', 'inspector2', 'Abu Dhabi', '04/04/23'),
  createData('FORKLIFT SAFETY INSPECTION CHECKLIST', 'inspector3', 'Sharjah', '04/02/23'),
  createData('HSE OBSERVATION (STOP) CARD', 'inspector4', 'Sharjah', '02/04/23'),
  createData('TOOL BOX SAFETY MEETING FORM', 'inspector5', 'Abu Dhabi', '04/02/23'),
];

function BasicTable({ inspector }) {
  if (inspector === 'All Inspectors') {
    console.log(inspector);
  }
  if (inspector === 'Inspector1') {
    console.log(inspector);
  }
  if (inspector === 'Inspector2') {
    console.log(inspector);
  }
  if (inspector === 'Inspector3') {
    console.log(inspector);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Form</b></TableCell>
            <TableCell align="right"><b>Inspector</b></TableCell>
            <TableCell align="right"><b>Location</b></TableCell>
            <TableCell align="right"><b>Date</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.nameForm}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <b>{row.nameForm}</b>
              </TableCell>
              <TableCell align="right">{row.inspector}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right"><button>download</button></TableCell>
              <TableCell align="right"><button>open</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
