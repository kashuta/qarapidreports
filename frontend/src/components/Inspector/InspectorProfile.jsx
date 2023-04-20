import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { pdf } from '@react-pdf/renderer';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import Document0024 from '../Documents/Document0024';
import PageNotFound from '../ProtectedRoute/PageNotFound';
import { getFormsAllProfileInspectorAction } from '../../Redux/report.action';

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

function InspectorProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.UserReducer.user);
  const { userId } = useParams();
  if (+user.id !== +userId) {
    return <PageNotFound />;
  }

  const [value1, setValue1] = useState(dayjs(new Date()));
  const [value2, setValue2] = useState(dayjs(new Date()));

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getFormsAllProfileInspectorAction(navigate));
  };

  const totalForms = useSelector(
    (state) => state.ReportReducer.FormAllProfileInspector,
  );

  const Data = [[
    {
      FormName: 'MONTHLY SAFETY CHECKLIST',
      Location: 'Dubai',
      Date: '12/04/23',
      Form_id: 13,
    },
    {
      FormName: 'VEHICLE SAFETY INSPECTION',
      Location: 'Oman',
      Date: '10/04/23',
      Form_id: 11,
    },
    {
      FormName: 'FORKLIFT SAFETY INSPECTION',
      Location: 'Dubai',
      Date: '7/04/23',
      Form_id: 22,
    },

    {
      FormName: 'TOOL BOX SAFETY MEETING',
      Location: 'Miami',
      Date: '3/04/23',
      Form_id: 43,
    }],
  [15, 19, 10, 5, 11, 60],
  ];

  return (
    <Box>
      <Box sx={{ alignContent: 'center', marginLeft: 30, marginTop: 15 }}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          sx={{ m: 1, width: 200 }}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="from"
              name="from"
              value={value1}
              onChange={(newValue) => setValue1(newValue)}
              sx={{ width: 50 }}
        />
            <DatePicker
              label="To"
              name="to"
              value={value2}
              minDate={value1}
              onChange={(newValue) => setValue2(newValue)}
              sx={{ width: 50 }}
        />
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              sx={{ width: 150 }}>
              Submit
            </Button>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box sx={{ m: 10 }} align="center">
        <TableContainer component={Paper} elevation={5}>
          <Table aria-label="simple table" sx={{ width: 800 }} align="center">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 20 }}><b>Form</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 20 }}><b>Location</b></TableCell>
                <TableCell align="right" sx={{ fontSize: 20 }}><b>Date</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Data[0].map((el) => (
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
    </Box>

  );
}

export default InspectorProfile;
