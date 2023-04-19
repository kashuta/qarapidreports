/* eslint-disable object-curly-newline */
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function MyDoughnut() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const formsNameData = useSelector((state) => state.ReportReducer.formsName);
  const formNames = formsNameData.map((form) => form.name);

  // общий объект с базы
  const totalForms = useSelector(
    (state) => state.ReportReducer.formResponseData,
  );

  // названия форм и их количество каждого
  // const labels = Object.keys(totalForms.allReportFormCount);
  // const countDataFromDB = Object.values(totalForms?.allReportFormCount);
  // const count = countDataFromDB || [1, 2, 3, 4, 5];
  let count;
  if (totalForms) {
    const countDataFromDB = Object.values(totalForms.allReportFormCount);
    count = countDataFromDB;
  } else {
    count = [1, 2, 3, 4, 5];
  }
  // const names = Object.keys(totalForms.allReportFormCount);
  const labels = formNames;

  const dataForDoughnut = {
    labels,
    datasets: [
      {
        label: ['Count'],
        data: count,
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
