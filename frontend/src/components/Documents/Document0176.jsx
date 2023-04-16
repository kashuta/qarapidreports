import React from 'react';
import {
  Document, Page, Image, Text, Font, View,
} from '@react-pdf/renderer';
import ArialFont from '../../Fonts/Arial.ttf';
import Arialbold from '../../Fonts/Arial-bold.ttf';
import pdfStyles0176 from './pdfStyle0176';

/* VEHICLE SAFETY INSPECTION CHECKLIST, форма для отрисовки PDF */
function Document0176() {
  /* регистрация шрифтов */
  Font.register({ family: 'Arial', src: ArialFont });
  Font.register({ family: 'Arialbold', src: Arialbold });

  /* временная DATA */
  const ForkLift = {
    formId: 1,
    status: 'submit',
    userId: 5,
    formData: {
      'Fuel;Leaks, Level': { condition: 'ok', comment: 'comment1' },
      'Hydraulic Oil;Leaks, Level': { condition: 'nok', comment: 'comment2' },
      'Engine Oil;Leaks, Level': { condition: 'nok', comment: 'comment2' },
      'Radiator Coolant ;Leaks, Level': { condition: 'nok', comment: 'comment2' },
      'Transmission Fluid;Leaks, Level': { condition: 'nok', comment: 'comment2' },
      'Tires;Condition and Pressure': { condition: 'nok', comment: 'comment2' },
      'Forks;Visual Check ': { condition: 'nok', comment: 'comment2' },
      'Mast Chains and hoses ;Visual Check, Leaks, Damage ': { condition: 'nok', comment: 'comment2' },
      'Overhead Guard ;Attached, Damage  ': { condition: '', comment: 'comment2' },
      'Battery ;Check Condition  ': { condition: 'nok', comment: 'comment2' },
      'Engine Belt ;Cracked, Damage, Visual Check  ': { condition: 'nok', comment: 'comment2' },
      'Air filter ;Visually check condition ': { condition: 'nok', comment: 'comment2' },
      'Accelerator or Direction Control Pedal ;Functioning Smoothly and Properly ': { condition: 'nok', comment: 'comment2' },
      'Service Brake  ;Functioning Smoothly and Properly ': { condition: 'nok', comment: 'comment2' },
      'Parking Brake  ;Functioning Smoothly and Properly ': { condition: '', comment: 'comment2' },
      'Steering Operation ;Functioning Smoothly and Properly ': { condition: 'nok', comment: 'comment2' },
      'Drive Control – Forward/Reverse  ;Functioning Smoothly and Properly ': { condition: 'nok', comment: 'comment2' },
      'Tilt Control – Forward and Back ;Functioning Smoothly and Properly ': { condition: 'nok', comment: 'comment2' },
      'Hoist and Lowering Control ;Functioning Smoothly and Properly ': { condition: 'nok', comment: 'comment2' },
      'Horn and Lights ;Functioning Properly ': { condition: 'nok', comment: 'comment2' },
      'Gauges: Speed, Oil, Hours, Fuel, Temp.;Functioning Properly ': { condition: 'nok', comment: 'comment2' },
      location: 'Dubai',
      date: '03-04-2023',
      name: 'Said Pterodactyl',
      MachineHours: '1234567890',
      RegistrationNo: '1000',
      Signature: 'AaaaAA',
    },
  };

  /* Очистка шрифтов */
  const DataArray = Object
    .entries(ForkLift.formData)
    .filter((el) => el[0] !== 'location'
  && el[0] !== 'location'
  && el[0] !== 'date'
  && el[0] !== 'name'
  && el[0] !== 'MachineHours'
  && el[0] !== 'RegistrationNo'
  && el[0] !== 'Signature').map((el) => [el[0].split(';'), el[1]]);
  return (
    <Document>
      {/* Первая страница */}
      <Page size="A4" orientation="landscape">
        {/* картинка Хедер и верхние поля для заполнения */}
        <Image src="/images/GME0176_1.png" />
        <Text style={[pdfStyles0176.location, pdfStyles0176.textTop]}>
          {ForkLift.formData.location}
        </Text>
        <Text style={[pdfStyles0176.name, pdfStyles0176.textTop]}>
          {ForkLift.formData.name}
        </Text>
        <Text style={[pdfStyles0176.date, pdfStyles0176.textTop]}>
          {ForkLift.formData.date}
        </Text>
        <Text style={[pdfStyles0176.MachineHours, pdfStyles0176.textTop]}>
          {ForkLift.formData.MachineHours}
        </Text>
        <Text style={[pdfStyles0176.RegistrationNo, pdfStyles0176.textTop]}>
          {ForkLift.formData.RegistrationNo}
        </Text>
        <Text style={[pdfStyles0176.Signature, pdfStyles0176.textTop]}>
          {ForkLift.formData.Signature}
        </Text>

        {/* Таблица */}
        <View style={pdfStyles0176.table}>
          {/* Заголовки */}
          <View style={pdfStyles0176.HeaderTableRow}>
            <View style={[pdfStyles0176.tableCol, { width: '100%' }]}>
              <Text style={[pdfStyles0176.HeaderText]}>With Engine Off</Text>
            </View>
          </View>
          <View style={pdfStyles0176.HeaderTableRow}>
            <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
              <Text style={[pdfStyles0176.HeaderText]}>No.</Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '27%' }]}>
              <Text style={[pdfStyles0176.HeaderText]}>What are you inspecting? </Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '29%' }]}>
              <Text style={pdfStyles0176.HeaderText}>What are you looking for? </Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
              <Text style={pdfStyles0176.HeaderText}>OK</Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
              <Text style={pdfStyles0176.HeaderText}>NOK</Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '29%' }]}>
              <Text style={pdfStyles0176.HeaderText}>Action needed</Text>
            </View>
          </View>

          {/* Данные внутри таблицы */}
          {DataArray.slice(0, 12).map((el, rowIndex) => (
            <View key={el.id} style={pdfStyles0176.tableRow}>
              <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
                <Text style={pdfStyles0176.tableCell}>{rowIndex + 1}</Text>
              </View>
              <View style={[pdfStyles0176.tableColQuesComm, { width: '27%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[0][0]}</Text>
              </View>
              <View style={[pdfStyles0176.tableColQuesComm, { width: '29%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[0][1]}</Text>
              </View>
              <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[1].condition && el[1].condition === 'ok' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[1].condition && el[1].condition === 'nok' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0176.tableColQuesComm, { width: '29%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[1].comment}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
      {/* Вторая страница */}
      <Page size="A4" orientation="landscape">
        <Image src="/images/GME0176_2_1.png" />
        {/* Таблица */}
        <View style={pdfStyles0176.table}>
          {/* Заголовки */}
          <View style={pdfStyles0176.HeaderTableRow}>
            <View style={[pdfStyles0176.tableCol, { width: '100%' }]}>
              <Text style={[pdfStyles0176.HeaderText]}>With Engine On</Text>
            </View>
          </View>
          <View style={pdfStyles0176.HeaderTableRow}>
            <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
              <Text style={[pdfStyles0176.HeaderText]}>No.</Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '27%' }]}>
              <Text style={[pdfStyles0176.HeaderText]}>What are you inspecting? </Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '29%' }]}>
              <Text style={pdfStyles0176.HeaderText}>What are you looking for? </Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
              <Text style={pdfStyles0176.HeaderText}>OK</Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
              <Text style={pdfStyles0176.HeaderText}>NOK</Text>
            </View>
            <View style={[pdfStyles0176.tableCol, { width: '29%' }]}>
              <Text style={pdfStyles0176.HeaderText}>Action needed</Text>
            </View>
          </View>

          {/* Данные внутри таблицы */}
          {DataArray.slice(12, 20).map((el, rowIndex) => (
            <View key={el.id} style={pdfStyles0176.tableRow}>
              <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
                <Text style={pdfStyles0176.tableCell}>{rowIndex + 13}</Text>
              </View>
              <View style={[pdfStyles0176.tableColQuesComm, { width: '27%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[0][0]}</Text>
              </View>
              <View style={[pdfStyles0176.tableColQuesComm, { width: '29%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[0][1]}</Text>
              </View>
              <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[1].condition && el[1].condition === 'ok' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0176.tableCol, { width: '5%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[1].condition && el[1].condition === 'nok' ? '√' : ''}</Text>
              </View>
              <View style={[pdfStyles0176.tableColQuesComm, { width: '29%' }]}>
                <Text style={pdfStyles0176.tableCell}>{el[1].comment}</Text>
              </View>
            </View>
          ))}
        </View>
        <Image src="/images/GME0176_2_2.png" />
      </Page>
    </Document>
  );
}

export default Document0176;
