import React, { useEffect, useState } from 'react';
import fetchData from '../services/dataService';
import LineChart from './LineChart'; 
import BarChart from './BarChart';   
import PieChart from './PieChart';     

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      if (result) {
        setData(processData(result));
      } else {
        console.error('No data returned');
      }
    };
    getData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Electric Vehicle Population Dashboard</h1>
      <LineChart data={data.lineData} />
      <BarChart data={data.barData} />
      <PieChart data={data.pieData} />
    </div>
  );
};

const processData = (rawData) => {
    
    const years = [...new Set(rawData.map(item => item['Model Year']))];
    
    
    const lineData = years.map(year => ({
      year,
      count: rawData.filter(item => item['Model Year'] === year).length,
    }));
  
    
    const stateCounts = rawData.reduce((acc, item) => {
      acc[item['State']] = (acc[item['State']] || 0) + 1;
      return acc;
    }, {});
  
    const barLabels = Object.keys(stateCounts);
    const barValues = Object.values(stateCounts);
  
    
    const typeCounts = rawData.reduce((acc, item) => {
      acc[item['Electric Vehicle Type']] = (acc[item['Electric Vehicle Type']] || 0) + 1;
      return acc;
    }, {});
  
    const pieLabels = Object.keys(typeCounts);
    const pieValues = Object.values(typeCounts);
  
    return {
      lineData: {
        labels: lineData.map(data => data.year),
        values: lineData.map(data => data.count),
      },
      barData: {
        labels: barLabels,
        values: barValues,
      },
      pieData: {
        labels: pieLabels,
        values: pieValues,
      },
    };
  };

  export default Dashboard;