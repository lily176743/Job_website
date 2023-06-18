import React,{useEffect,useState} from 'react'
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

const Barchart = (props) => {
  var dataForChart = props.data
  console.log(dataForChart)

  dataForChart.forEach((item) => {
    console.log(Object.values(item)[0])
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
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
  
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Jobs Count',
        // here, for each item in data array , it will return value of that object-dict
        // like ex.: dict['January'] -> gives 0
        data: dataForChart.map((item) => {
          return Object.values(item)[0]
        }),
        backgroundColor: '#14919b',
      },
    ],
  };

  return (
      <Bar options={options} data={data} />
  )
}

export default Barchart