// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// // import { faker } from '@faker-js/faker';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { useSelector } from 'react-redux';

// function MainBar() {
//   const totalForms = useSelector(
//     (state) => state.ReportReducer.formResponseData,
//   );
//   const infoPerInspector = totalForms?.info.map((insp) => insp);
//   console.log(infoPerInspector);
//   // const itttt = infoPerInspector.map((item) => Object.values(item.reports));
//   // console.log(itttt);

//   let labels = [];
//   if (totalForms) {
//     labels = infoPerInspector.inspectorName;
//     // labels = totalForms?.allInspectorNames;
//   } else {
//     for (let i = 1; i <= 6; i += 1) {
//       labels.push(`Inspector${i}`);
//     }
//   }

//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
//   );

//   const barOptions = {
//     plugins: {
//       title: {
//         display: true,
//         text: 'Inspectors Statistics',
//       },
//     },
//     responsive: true,
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//       },
//     },
//   };

//   const barData = {
//     labels,
//     datasets: [
//       {
//         label: 'MONTHLYSAFETYCHECKLIST',
//         data: infoPerInspector.map((item) => Object.values(item.reports)[0]),
//         backgroundColor: 'rgb(255, 99, 132)',
//       },
//       {
//         label: 'VEHICLESAFETYINSPECTION',
//         data: infoPerInspector.map((item) => Object.values(item.reports)[1]),
//         backgroundColor: 'rgb(75, 192, 192)',
//       },
//       {
//         label: 'FORKLIFTSAFETYINSPECTION',
//         data: infoPerInspector.map((item) => Object.values(item.reports)[2]),
//         backgroundColor: 'rgb(255, 206, 86)',
//       },
//       {
//         label: 'HSEOBSERVATION',
//         data: infoPerInspector.map((item) => Object.values(item.reports)[3]),
//         backgroundColor: 'rgb(53, 162, 235)',
//       },
//       {
//         label: 'TOOLBOXSAFETYMEETINGFORM',
//         data: infoPerInspector.map((item) => Object.values(item.reports)[4]),
//         backgroundColor: 'rgb(153, 102, 255)',
//       },
//     ],
//   };
//   return <Bar options={barOptions} data={barData} />;
// }

// export default MainBar;

import React from 'react';
import { faker } from '@faker-js/faker';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import 'chartjs-adapter-date-fns';

function MainBar() {
  const totalForms = useSelector(
    (state) => state.ReportReducer.formResponseData,
  );
  const infoPerInspector = totalForms?.info.map((insp) => insp);

  let labels = [];
  if (totalForms) {
    labels = infoPerInspector.map((inspector) => inspector.inspectorName);
  } else {
    for (let i = 1; i <= 6; i += 1) {
      labels.push(`Inspector${i}`);
    }
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const barOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Inspectors Statistics',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const reportLabels = [
    'MONTHLY SAFETY CHECKLIST - FIELD SERVICES',
    'VEHICLE SAFETY INSPECTION - CHECKLIST',
    'FORKLIFT SAFETY INSPECTION CHECKLIST',
    'HSE OBSERVATION (STOP) CARD',
    'TOOL BOX SAFETY MEETING FORM',
  ];

  const barData = {
    labels,
    datasets: reportLabels.map((label) => ({
      label: label.replace(/\s+/g, '').toUpperCase(),
      data: infoPerInspector?.map((inspector) => inspector.reports[label] || 0),
      backgroundColor: faker.internet.color(),
    })),
  };

  return <Bar options={barOptions} data={barData} />;
}

export default MainBar;
