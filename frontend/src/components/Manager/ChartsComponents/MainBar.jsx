import React from 'react';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
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

function MainBar() {
  // const totalForms = useSelector(
  //   (state) => state.ReportReducer.formResponseData,
  // );
  // const MONTHLYSAFETYCHECKLIST = totalForms.filter(
  //   (form) => form.formId === 1,
  // ).length;
  // const VEHICLESAFETYINSPECTION = totalForms.filter(
  //   (form) => form.formId === 2,
  // ).length;
  // const FORKLIFTSAFETYINSPECTION = totalForms.filter(
  //   (form) => form.formId === 3,
  // ).length;
  // const HSEOBSERVATION = totalForms.filter((form) => form.formId === 4).length;
  // const TOOLBOXSAFETYMEETINGFORM = totalForms.filter(
  //   (form) => form.formId === 5,
  // ).length;
  const inspectorsNames = useSelector(
    (state) => state.ReportReducer.inspectorsNames,
  );

  const labels = inspectorsNames.map((item) => item.userName);

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

  // const labels = [];

  // for (let i = 1; i <= 10; i += 1) {
  //   labels.push(`Inspector${i}`);
  // }

  const barData = {
    labels,
    datasets: [
      {
        label: 'MONTHLYSAFETYCHECKLIST',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'VEHICLESAFETYINSPECTION',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'FORKLIFTSAFETYINSPECTION',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(255, 206, 86)',
      },
      {
        label: 'HSEOBSERVATION',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'TOOLBOXSAFETYMEETINGFORM',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(153, 102, 255)',
      },
    ],
  };
  return <Bar options={barOptions} data={barData} />;
}

export default MainBar;
