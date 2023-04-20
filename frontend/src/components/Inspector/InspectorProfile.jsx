import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import Document0024 from '../Documents/Document0024';
import Document0109 from '../Documents/Document0109';
import Document0144 from '../Documents/Document0144';
import Document0176 from '../Documents/Document0176';
import Document0320 from '../Documents/Document0320';
import PageNotFound from '../ProtectedRoute/PageNotFound';
import { getFormsAllProfileInspectorAction, getFormsByDateProfileInspectorAction } from '../../Redux/report.action';

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
    link.download = `form_${moment(answer.date).format('MM/DD/YYYY HH:mm')}.pdf`;
    link.click();
  }
}

function InspectorProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.UserReducer.user);
  console.log('useruseruseruseruseruseruser', user);
  const { userId } = useParams();
  if (+user.id !== +userId) {
    return <PageNotFound />;
  }

  const [value1, setValue1] = useState(dayjs(new Date()).subtract(17, 'day'));
  const [value2, setValue2] = useState(dayjs(new Date()));
  console.log(value1);

  const data = { from: value1, to: value2 };
  useEffect(() => {
    dispatch(getFormsByDateProfileInspectorAction(navigate, data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getFormsByDateProfileInspectorAction(navigate, data));
  };
  console.log('datadatadatadatadatadatadatadatadatadatadata', data);

  const totalForms = useSelector((state) => state.ReportReducer.FormAllProfileInspector);
  console.log('totalFormstotalFormstotalFormstotalFormstotalFormstotalForms', totalForms);
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
              {totalForms && totalForms.responseObject?.map((el, index) => (
                <TableRow
                  key={`${index}1`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                  <TableCell component="th" scope="row"><b>{el.name}</b></TableCell>
                  <TableCell align="right" sx={{ fontSize: 17 }}>{el.answer.location}</TableCell>
                  <TableCell align="right" sx={{ fontSize: 17 }}>{moment(el.createdAt).format('MM/DD/YYYY HH:mm')}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => OpenOrDownloadPdf(el.answer, el.name, 'open', user.userName)}>open</Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => OpenOrDownloadPdf(el.answer, el.name, 'download', user.userName)}>
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
