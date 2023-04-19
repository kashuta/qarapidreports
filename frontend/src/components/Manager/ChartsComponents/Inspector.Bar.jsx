/* eslint-disable max-len */
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';

function InspectorBar() {
  const inspectorsNames = useSelector(
    (state) => state.ReportReducer.inspectorsNames,
  );
  const formsName = useSelector(
    (state) => state.ReportReducer.formsName,
  );

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = formsName.map((form) => form.name);

  const data = {
    labels, // название отчетов
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })), // подставить колл. отчетов
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Bar options={options} data={data} />
  );
}

export default InspectorBar;
