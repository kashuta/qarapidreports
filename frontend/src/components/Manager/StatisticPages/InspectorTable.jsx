import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { pdf } from '@react-pdf/renderer';
import { Box, Button } from '@mui/material';
import Document0024 from '../../Documents/Document0024';
import Document0109 from '../../Documents/Document0109';
import Document0144 from '../../Documents/Document0144';
import Document0176 from '../../Documents/Document0176';
import Document0320 from '../../Documents/Document0320';

async function OpenOrDownloadPdf(answer, name, status, username) {
  let DocumentComponent;

  // Выбираем соответствующий документ на основе данных в объекте el
  switch (name) { // Замените 'type' на соответствующее свойство объекта el
    case '0144':
    case 'Form One':
    case 'MONTHLY SAFETY CHECKLIST - FIELD SERVICES':
      DocumentComponent = Document0144;
      break;
    case '0024':
    case 'Form Two':
    case 'VEHICLE SAFETY INSPECTION - CHECKLIST':
      DocumentComponent = Document0024;
      break;
    case '0176':
    case 'Form Three':
    case 'FORKLIFT SAFETY INSPECTION CHECKLIST':
      DocumentComponent = Document0176;
      break;
    case '0109':
    case 'Form Four':
    case 'HSE OBSERVATION (STOP) CARD':
      DocumentComponent = Document0109;
      break;
    case '0320':
    case 'Form Five':
    case 'TOOL BOX SAFETY MEETING FORM':
      DocumentComponent = Document0320;
      break;

    default:
      console.error('Unknown document type');
      return;
  }
  const pdfBlob = await pdf(<DocumentComponent data={answer} username={username} />).toBlob();
  const pdfUrl = URL.createObjectURL(pdfBlob);
  if (status === 'open') {
    window.open(pdfUrl, '_blank');
  } else {
    const link = window.document.createElement('a');
    link.href = pdfUrl;
    link.download = `form_${moment(answer.date).format('HH:mm MM/DD/YYYY')}.pdf`;
    link.click();
  }
}

function InspectorTable({ Data, name }) {
  console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{', Data);
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
                key={el.formName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row"><b>{el.formName}</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 17 }}>{el.location}</TableCell>
                <TableCell align="right" sx={{ fontSize: 17 }}>{moment(el.date).format('MM/DD/YYYY')}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => OpenOrDownloadPdf(el.answer, el.formName, 'open', name)}>open</Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => OpenOrDownloadPdf(el.answer, el.formName, 'download', name)}>
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

export default InspectorTable;
