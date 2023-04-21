import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { pdf } from '@react-pdf/renderer';
import { Box, Button } from '@mui/material';
import Document0024 from '../../Documents/Document0024';

async function openPdf(document) {
  const pdfBlob = await pdf(document).toBlob();
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
}

async function downloadPdf(document, fileName) {
  const pdfBlob = await pdf(document).toBlob();
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const link = window.document.createElement('a');
  link.href = pdfUrl;
  link.download = fileName;
  link.click();
}

function BasicTable({ Data }) {
  return (
    <Box mb={5}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 20 }}><b>Form</b></TableCell>
              <TableCell align="right" sx={{ fontSize: 20 }}><b>Location</b></TableCell>
              <TableCell align="right" sx={{ fontSize: 20 }}><b>Date</b></TableCell>
              <TableCell sx={{ fontSize: 20 }} />
              <TableCell sx={{ fontSize: 20 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((el) => (
              <TableRow
                key={el.Form_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"><b>{el.FormName}</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 17 }}>{el.Location}</TableCell>
                <TableCell align="right" sx={{ fontSize: 17 }}>{el.Date}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => openPdf(<Document0024 />)}>open</Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => downloadPdf(<Document0024 />, `form_${el.Form_id}.pdf`)}>
                    download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BasicTable;
