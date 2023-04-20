import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';

function MainHorizontBar() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    // Legend,
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'All reports for period',
        font: {
          size: 30,
          weight: 'bold', // or any other font size you prefer
        },
      },
    },
  };
  const totalForms = useSelector(
    (state) => state.ReportReducer.formResponseData,
  );
  let count;
  if (totalForms) {
    const countDataFromDB = Object.values(totalForms.allReportFormCount);
    count = countDataFromDB;
    console.log(countDataFromDB);
  } else {
    count = [1, 2, 3, 4, 5];
  }

  const colors = ['#3399CC', '#ff6600', '#8BB836', '#15315B', '#707173'];
  const reportLabels = [
    'MONTHLY SAFETY CHECKLIST',
    'VEHICLE SAFETY INSPECTION',
    'FORKLIFT SAFETY INSPECTION',
    'HSE OBSERVATION',
    'SAFETY MEETING FORM',
  ];
  const labels = reportLabels.map((label) => label.toLowerCase());
  const data = {
    labels,
    datasets: [
      {
        label: 'Total for period',
        data: count,
        // borderColor: 'rgb(255, 99, 132)',
        backgroundColor: colors.map((color) => color),
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default MainHorizontBar;
