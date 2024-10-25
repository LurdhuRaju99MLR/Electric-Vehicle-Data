import axios from 'axios';
import Papa from 'papaparse';

const fetchData = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/main/data-to-visualize/Electric_Vehicle_Population_Data.csv');
    const parsedData = Papa.parse(response.data, { header: true });
    return parsedData.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;