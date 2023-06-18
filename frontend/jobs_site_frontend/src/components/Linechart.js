import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

  const Linechart = (props) => {
    var dataForChart = props.data
    console.log(dataForChart)
  
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
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
          text: 'Chart.js Line Chart',
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
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    
    return (
      <Line options={options} data={data} />

    )
  }
  
  export default Linechart
  