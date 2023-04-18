/* eslint-disable object-curly-newline */
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function MyDoughnut() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const formsName = useSelector((state) => state.ReportReducer.formsName);
  const labels = formsName.map((item) => item.name);
  const dataForDoughnut = {
    // labels: ['Rep1', 'Rep2', 'Rep3', 'Rep4', 'Rep5'],
    labels,
    datasets: [
      {
        label: ['Count'],
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };
  return <Doughnut data={dataForDoughnut} />;
}

export default MyDoughnut;
