import React from 'react';
import {
  Document, Page, Image, Text, Font,
} from '@react-pdf/renderer';
import ArialFont from '../../Fonts/Arial.ttf';
import Arialbold from '../../Fonts/Arial-bold.ttf';
import pdfStyles0320 from './pdfStyle0320';

/* VEHICLE SAFETY INSPECTION CHECKLIST, форма для отрисовки PDF */
function Document0320() {
  /* регистрация шрифтов */
  Font.register({ family: 'Arial', src: ArialFont });
  Font.register({ family: 'Arialbold', src: Arialbold });

  /* временная DATA */
  const ForkLift = {
    formId: 1,
    status: 'submit',
    userId: 5,
    formData: {
      Country: 'OAE',
      date: '03-04-2023',
      location: 'Dubai',
      name: 'Said Pterodactyl',
      DescriptionOfTheJob: '1234567890',
      HSEPointsDiscussed: '1000',
      FirstNameLastName: '2000',
      Company: '23-04-2023',
      Position: '23-04-2023',
      Signature: '23-04-2023',
      FirstNameLastName2: '2000',
      Company2: '23-04-2023',
      Position2: '23-04-2023',
      Signature2: '23-04-2023',
    },
  };

  return (
    <Document>
      <Page size="A4">
        <Image src="/images/WW0320.png" />
        {/* top cells */}
        <Text style={[pdfStyles0320.Country, pdfStyles0320.textTop]}>
          {ForkLift.formData.Country}
        </Text>
        <Text style={[pdfStyles0320.date, pdfStyles0320.textTop]}>
          {ForkLift.formData.date}
        </Text>
        <Text style={[pdfStyles0320.location, pdfStyles0320.textTop]}>
          {ForkLift.formData.location}
        </Text>
        <Text style={[pdfStyles0320.DescriptionOfTheJob, pdfStyles0320.textTop]}>
          {ForkLift.formData.DescriptionOfTheJob}
        </Text>
        <Text style={[pdfStyles0320.HSEPointsDiscussed, pdfStyles0320.textTop]}>
          {ForkLift.formData.HSEPointsDiscussed}
        </Text>
        {/* Supervisor  cells */}
        <Text style={[pdfStyles0320.FirstNameLastName, pdfStyles0320.textTop]}>
          {ForkLift.formData.FirstNameLastName}
        </Text>
        <Text style={[pdfStyles0320.Company, pdfStyles0320.textTop]}>
          {ForkLift.formData.Company}
        </Text>
        <Text style={[pdfStyles0320.Position, pdfStyles0320.textTop]}>
          {ForkLift.formData.Position}
        </Text>
        <Text style={[pdfStyles0320.Signature, pdfStyles0320.textTop]}>
          {ForkLift.formData.Signature}
        </Text>
        {/* Staff who participated in the meeting  */}
        <Text style={[pdfStyles0320.FirstNameLastName2, pdfStyles0320.textTop]}>
          {ForkLift.formData.FirstNameLastName2}
        </Text>
        <Text style={[pdfStyles0320.Company2, pdfStyles0320.textTop]}>
          {ForkLift.formData.Company2}
        </Text>
        <Text style={[pdfStyles0320.Position2, pdfStyles0320.textTop]}>
          {ForkLift.formData.Position2}
        </Text>
        <Text style={[pdfStyles0320.Signature2, pdfStyles0320.textTop]}>
          {ForkLift.formData.Signature2}
        </Text>
      </Page>
    </Document>
  );
}

export default Document0320;
