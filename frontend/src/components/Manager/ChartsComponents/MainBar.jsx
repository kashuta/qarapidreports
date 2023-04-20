import React from 'react';
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
  // console.log(faker.internet.userName());
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
        font: {
          size: 30,
          weight: 'bold', // or any other font size you prefer
        },
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

  const colors = ['#3399CC', '#ff6600', '#8BB836', '#15315B', '#707173'];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const reportLabels = [
    'MONTHLY SAFETY CHECKLIST - FIELD SERVICES',
    'VEHICLE SAFETY INSPECTION - CHECKLIST',
    'FORKLIFT SAFETY INSPECTION CHECKLIST',
    'HSE OBSERVATION (STOP) CARD',
    'TOOL BOX SAFETY MEETING FORM',
  ];

  const barData = {
    labels,
    datasets: reportLabels.map((item) => ({
      label: item.toLocaleLowerCase(),
      data: infoPerInspector?.map((inspector) => inspector.reports[item] || 0),
      backgroundColor: colors.map((color) => color),
      // faker.color.rgb(),
    })),
  };

  return <Bar options={barOptions} data={barData} />;
}

export default MainBar;
