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

function MainBar() {
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
        label: 'Report 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Report 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Report 3',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(255, 206, 86)',
      },
      {
        label: 'Report 4',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Report 5',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(153, 102, 255)',
      },
    ],
  };
  return <Bar options={barOptions} data={barData} />;
}

export default MainBar;
