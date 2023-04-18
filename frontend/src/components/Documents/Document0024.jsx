import React from 'react';
import {
  Document, Page, Image, Text, Font, View,
} from '@react-pdf/renderer';
import ArialFont from '../../Fonts/Arial.ttf';
import Arialbold from '../../Fonts/Arial-bold.ttf';
import pdfStyles0024 from './pdfStyles0024';

/* VEHICLE SAFETY INSPECTION CHECKLIST, форма для отрисовки PDF */
function Document0024() {
  /* регистрация шрифтов */
  Font.register({ family: 'Arial', src: ArialFont });
  Font.register({ family: 'Arialbold', src: Arialbold });

  /* временная DATA */
  const ForkLift = {
    formId: 1,
    status: 'submit',
    userId: 5,
    formData: {
      'All vehicle lights are functioning': { condition: 'yes', comment: 'comment1' },
      'Vehicle monitoring system (IVMS) is ok': { condition: 'no', comment: 'comment2' },
      'Brake fluid level is ok': { condition: 'nok', comment: 'comment3' },
      'Engine oil level is ok': { condition: 'yes', comment: 'Helo helo hello hepo 123 1313323 fjf xccx sfddf f fdfd fd fddf dffddf dfdf dfdf dfdf d fdf df d fdfdfdffdf dfd df ffd' },
      'Radiator coolant level is ok': { condition: '', comment: '' },
      'Windshield wiper/Washer fluid is ok': { condition: '', comment: 'mmm' },
      'Drinking water available inside': { condition: 'yes', comment: 'mmm' },
      '2All vehicle lights are functioning': { condition: 'yes', comment: 'comment1' },
      '2Vehicle monitoring system (IVMS) is ok': { condition: 'no', comment: 'comment2' },
      '2Brake fluid level is ok': { condition: 'nok', comment: 'comment3' },
      '2Engine oil level is ok': { condition: 'yes', comment: 'Helo helo he3llo hepo 123 1313323 fjf xccx sfddf f fdfd fd fddf dffddf dfdf dfdf dfdf d fdf df d fdfdfdffdf dfd df ffd' },
      'R2adiato3r coolant level is ok': { condition: '', comment: '' },
      'Windshi3eld wiper/Washer fluid is ok': { condition: '', comment: 'mmm' },
      'Drinkin3g water available inside': { condition: 'yes', comment: 'mmm' },
      name: 'Said Pterodactyl',
      location: 'Dubai',
      vehicleRegistrationNumber: '1234567890',
      date: '03-04-2023',
      MileageReadingKM: '1000',
      NextMaintenanceMileage_KM: '2000',
      NextOXYInspectionDate: '23-04-2023',
    },
  };

  /* Очистка шрифтов */
  const DataArray = Object
    .entries(ForkLift.formData)
    .filter((el) => el[0] !== 'location'
  && el[0] !== 'name'
  && el[0] !== 'vehicleRegistrationNumber'
  && el[0] !== 'machineHours'
  && el[0] !== 'MileageReadingKM'
  && el[0] !== 'NextMaintenanceMileage_KM'
  && el[0] !== 'date'
  && el[0] !== 'NextOXYInspectionDate');

  return (
    <Document>

      <Page size="A4">

        {/* картинка Хедер и верхние поля для заполнения */}
        <Image src="/images/GME0024_2.png" />
        <Text style={[pdfStyles0024.location, pdfStyles0024.textTop]}>
          {ForkLift.formData.location}
        </Text>
        <Text style={[pdfStyles0024.vehicleRegistrationNumber, pdfStyles0024.textTop]}>
          {ForkLift.formData.vehicleRegistrationNumber}
        </Text>
        <Text style={[pdfStyles0024.date, pdfStyles0024.textTop]}>
          {ForkLift.formData.date}
        </Text>
        <Text style={[pdfStyles0024.MileageReadingKM, pdfStyles0024.textTop]}>
          {ForkLift.formData.MileageReadingKM}
        </Text>
        <Text style={[pdfStyles0024.NextMaintenanceMileage_KM, pdfStyles0024.textTop]}>
          {ForkLift.formData.NextMaintenanceMileage_KM}
        </Text>
        <Text style={[pdfStyles0024.NextOXYInspectionDate, pdfStyles0024.textTop]}>
          {ForkLift.formData.NextOXYInspectionDate}
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
                <Text style={pdfStyles0024.tableCell}>{el[1].condition && el[1].condition === 'yes' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0024.tableCol, { width: '7%' }]}>
                <Text style={pdfStyles0024.tableCell}>{el[1].condition && el[1].condition === 'no' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0024.tableCol, { width: '7%' }]}>
                <Text style={pdfStyles0024.tableCell}>{el[1].condition && el[1].condition === 'nok' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0024.tableColQuesComm, { width: '36%' }]}>
                <Text style={pdfStyles0024.tableCell}>{el[1].comment}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* Inspected by Name & Sign */}
        <View style={pdfStyles0024.NameSign}>
          <Text style={pdfStyles0024.NameSign2}>Inspected by Name & Sign:</Text>
          <Text style={pdfStyles0024.underlinedText}>
            {`       ${ForkLift.formData.name}                                                    `}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default Document0024;
