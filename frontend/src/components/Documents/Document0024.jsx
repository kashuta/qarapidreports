import React from 'react';
import {
  Document, Page, Image, Text, Font, View,
} from '@react-pdf/renderer';
import moment from 'moment';
import ArialFont from '../../Fonts/Arial.ttf';
import Arialbold from '../../Fonts/Arial-bold.ttf';
import pdfStyles0024 from './pdfStyles0024';

/* VEHICLE SAFETY INSPECTION CHECKLIST, форма для отрисовки PDF */
function Document0024({ data, username }) {
  /* регистрация шрифтов */
  Font.register({ family: 'Arial', src: ArialFont });
  Font.register({ family: 'Arialbold', src: Arialbold });

  /* подготовка массива с данными  */
  const DataArray = Object
    .entries(data)
    .filter((el) => el[0] !== 'location'
  && el[0] !== 'name'
  && el[0] !== 'regNumber'
  && el[0] !== 'MileageReading'
  && el[0] !== 'NextMileage'
  && el[0] !== 'date'
  && el[0] !== 'nextDate');

  return (
    <Document>

      <Page size="A4">

        {/* картинка Хедер и верхние поля для заполнения */}
        <Image src="/images/GME0024_2.png" />
        <Text style={[pdfStyles0024.location, pdfStyles0024.textTop]}>
          {data.location}
        </Text>
        <Text style={[pdfStyles0024.vehicleRegistrationNumber, pdfStyles0024.textTop]}>
          {data.regNumber}
        </Text>
        <Text style={[pdfStyles0024.date, pdfStyles0024.textTop]}>
          {moment(data.date).format('MM/DD/YYYY')}
        </Text>
        <Text style={[pdfStyles0024.MileageReadingKM, pdfStyles0024.textTop]}>
          {data.MileageReading}
        </Text>
        <Text style={[pdfStyles0024.NextMaintenanceMileage_KM, pdfStyles0024.textTop]}>
          {data.NextMileage}
        </Text>
        <Text style={[pdfStyles0024.NextOXYInspectionDate, pdfStyles0024.textTop]}>
          {moment(data.nextDate).format('MM/DD/YYYY')}
        </Text>

        {/* Таблица */}
        <View style={pdfStyles0024.table}>
          {/* Заголовки */}
          <View style={pdfStyles0024.HeaderTableRow}>
            <View style={[pdfStyles0024.tableCol, { width: '43%' }]}>
              <Text style={[pdfStyles0024.HeaderText]}>ITEM INSPECTED</Text>
            </View>
            <View style={[pdfStyles0024.tableCol, { width: '7%' }]}>
              <Text style={pdfStyles0024.HeaderText}>YES</Text>
            </View>
            <View style={[pdfStyles0024.tableCol, { width: '7%' }]}>
              <Text style={pdfStyles0024.HeaderText}>NO</Text>
            </View>
            <View style={[pdfStyles0024.tableCol, { width: '7%' }]}>
              <Text style={pdfStyles0024.HeaderText}>N/A</Text>
            </View>
            <View style={[pdfStyles0024.tableCol, { width: '36%' }]}>
              <Text style={pdfStyles0024.HeaderText}>COMMENTS</Text>
            </View>
          </View>

          {/* Данные внутри таблицы */}
          {DataArray.map((el, rowIndex) => (
            <View key={el.id} style={pdfStyles0024.tableRow}>
              <View style={[pdfStyles0024.tableCol, { width: '5%' }]}>
                <Text style={pdfStyles0024.tableCell}>{rowIndex + 1}</Text>
              </View>
              <View style={[pdfStyles0024.tableColQuesComm, { width: '38%' }]}>
                <Text style={pdfStyles0024.tableCell}>{el[0]}</Text>
              </View>
              <View style={[pdfStyles0024.tableCol, { width: '7%' }]}>
                <Text style={pdfStyles0024.tableCell}>{el[1].condition && el[1].condition === 'ok' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0024.tableCol, { width: '7%' }]}>
                <Text style={pdfStyles0024.tableCell}>{el[1].condition && el[1].condition === 'no' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0024.tableCol, { width: '7%' }]}>
                <Text style={pdfStyles0024.tableCell}>{el[1].condition && el[1].condition === 'na' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0024.tableColQuesComm, { width: '36%' }]}>
                <Text style={pdfStyles0024.tableCell}>{el[1].comments}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* Inspected by Name & Sign */}
        <View style={pdfStyles0024.NameSign}>
          <Text style={pdfStyles0024.NameSign2}>Inspected by Name & Sign:</Text>
          <Text style={pdfStyles0024.underlinedText}>
            {`       ${username}                                                    `}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default Document0024;
