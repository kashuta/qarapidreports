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

export const HSEbarOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Unsafe HSE',
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

export const HSEbarData = {
  labels,
  datasets: [
    {
      label: 'Total for period',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ],
};
