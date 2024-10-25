import React from 'react';
import { Line } from 'react-chartjs-2';
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

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
    const chartData = {
      labels: data.labels,
      datasets: [
        {
          label: 'Total EVs Over Years',
          data: data.values,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  
    return (
      <div className="chart-container">
        <h2 className="chart-title">Total Electric Vehicles Over Years</h2>
        <Line data={chartData} />
      </div>
    );
  };

 

export default LineChart;
