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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const barOptions = {
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

// const labels = [
//   'Inspector1',
//   'Inspector2',
//   'Inspector3',
//   'Inspector4',
//   'Inspector5',
//   'Inspector6',
// ];
const labels = [];

for (let i = 1; i <= 10; i += 1) {
  labels.push(`Inspector${i}`);
}

export const barData = {
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
