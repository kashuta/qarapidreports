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

function HseBar() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const HSEbarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Unsafe HSE',
        font: {
          size: 30,
          weight: 'bold', // or any other font size you prefer
        },
      },
    },
  };

  // const labels = [
  //   'Inspector1',
  //   'Inspector2',
  //   'Inspector3',
  //   'Inspector4',
  //   'Inspector5',
  //   'Inspector6',
  // ];
  const labels = ['Health HAZARD', 'Enviromental Risk', 'Unsafe Condition'];

  const HSEbarData = {
    labels,
    datasets: [
      {
        label: 'Total for period',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  return <Bar options={HSEbarOptions} data={HSEbarData} />;
}

export default HseBar;
