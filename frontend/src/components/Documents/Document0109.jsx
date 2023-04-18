import React from 'react';
import {
  Document, Page, Image, Text, Font, View,
} from '@react-pdf/renderer';
import pdfStyles0109 from './pdfStyle0109';
import ArialFont from '../../Fonts/Arial.ttf';
import Arialbold from '../../Fonts/Arial-bold.ttf';

/* HSE OBSERVATION (STOP) CARD, форма для отрисовки PDF */
function Document0109() {
  Font.register({ family: 'Arial', src: ArialFont });
  Font.register({ family: 'Arialbold', src: Arialbold });

  /* временная DATA */
  const ForkLift = {
    formId: 1,
    userId: 5,
    formData: {
      ObserversName: 'Said Pterodactyl',
      location: 'Dubai',
      vehicleRegistrationNumber: '1234567890',
      date: '03-04-2023',
      MileageReadingKM: '1000',
      NextMaintenanceMileage_KM: '2000',
      NextOXYInspectionDate: '23-04-2023',
      Time: '12:00',
      UnsafeAct: 'ok',
      UnsafeCondition: 'ok',
      HealthHazard: 'ok',
      SafeObservation: 'ok',
      EnvironmentalRisk: 'ok',
      DescriptionText: 'Text text text text text text text text text text text text text text text text text text text text text text',
      ContainmentActionText: 'Text text text text text text text text text text text text text text text text text text text',
      ProposedText: 'Text text text text text text text text text text text text text text text text text text text',

    },
  };

  return (
    <Document>
      <Page size="A4">
        <Image src="/images/GME0109.png" />
        {/* OBSERVER */}
        <Text style={[pdfStyles0109.date, pdfStyles0109.textTop]}>
          {ForkLift.formData.date}
        </Text>
        <Text style={[pdfStyles0109.Time, pdfStyles0109.textTop]}>
          {ForkLift.formData.Time}
        </Text>
        <Text style={[pdfStyles0109.location, pdfStyles0109.textTop]}>
          {ForkLift.formData.location}
        </Text>
        <Text style={[pdfStyles0109.ObserversName, pdfStyles0109.textTop]}>
          {ForkLift.formData.ObserversName}
        </Text>

        {/* OBSERVATION TYPE */}
        <Text style={[pdfStyles0109.UnsafeAct, pdfStyles0109.textTop]}>
          {ForkLift.formData.UnsafeAct === 'ok' ? '√' : ''}
        </Text>
        <Text style={[pdfStyles0109.UnsafeCondition, pdfStyles0109.textTop]}>
          {ForkLift.formData.UnsafeCondition === 'ok' ? '√' : ''}
        </Text>
        <Text style={[pdfStyles0109.HealthHazard, pdfStyles0109.textTop]}>
          {ForkLift.formData.HealthHazard === 'ok' ? '√' : ''}
        </Text>
        <Text style={[pdfStyles0109.SafeObservation, pdfStyles0109.textTop]}>
          {ForkLift.formData.SafeObservation === 'ok' ? '√' : ''}
        </Text>
        <Text style={[pdfStyles0109.EnvironmentalRisk, pdfStyles0109.textTop]}>
          {ForkLift.formData.EnvironmentalRisk === 'ok' ? '√' : ''}
        </Text>

        {/* OBSERVATION DESCRIPTION */}
        <View style={pdfStyles0109.DescriptionField}>
          <Text style={pdfStyles0109.AllText}>{ForkLift.formData.DescriptionText}</Text>
          <Image style={pdfStyles0109.ImageDescriptionField} src="/images/example.jpeg" />
        </View>

        {/* CONTAINMENT ACTION */}
        <View style={pdfStyles0109.ContainmentActionField}>
          <Text style={pdfStyles0109.AllText}>{ForkLift.formData.ContainmentActionText}</Text>
        </View>

        {/* PROPOSED IMPROVEMENT */}
        <View style={pdfStyles0109.ProposedField}>
          <Text style={pdfStyles0109.AllText}>{ForkLift.formData.ProposedText}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default Document0109;
