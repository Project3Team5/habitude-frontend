import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);
const ObservationChart = () => {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8080/api/observations/trend').then(response => response.json()).then(data => {
      const dates = data.frequencyData.map(item => item.date);
      const frequencyValues = data.frequencyData.map(item => item.value);
      const durationValues = data.durationData.map(item => item.value);
      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Frequency',
            data: frequencyValues,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'Duration',
            data: durationValues,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
        ],
      });
    })
    .catch(error => console.error('Error fetching data: ', error));
  }, []);
  if (!chartData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Trend Data</Text>
      <Line data={chartData} />
    </View>
  );
};

export default ObservationChart;