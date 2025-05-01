import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Line } from 'react-chartjs-2';
import { useLocalSearchParams } from 'expo-router';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ObservationChart = () => {
  const { name, subjectId, observations } = useLocalSearchParams();
  const [chartData, setChartData] = useState([]);

  const parsedObservations = observations ? JSON.parse(observations) : [];

  useEffect(() => {
    if (!subjectId || !parsedObservations.length) return;

    const behaviors = parsedObservations.reduce((acc, observation) => {
      if (!acc[observation.behavior]) {
        acc[observation.behavior] = [];
      }
      acc[observation.behavior].push(observation);
      return acc;
    }, {});

    const intensityMap = { Low: 1, Medium: 2, High: 3 };

    const behaviorCharts = Object.keys(behaviors).map(behavior => {
      const behaviorData = behaviors[behavior].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      const dates = behaviorData.map(item => item.timestamp);
      const frequencyValues = behaviorData.map(item => item.frequency);
      const durationValues = behaviorData.map(item => item.duration);
      const intensityValues = behaviorData.map(item => intensityMap[item.intensity]);

      return {
        behavior,
        data: {
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
        },
      };
    });

    setChartData(behaviorCharts);
  }, [subjectId, parsedObservations]);

  if (!chartData.length) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trend Data for {name}</Text>
      <ScrollView>
        {chartData.map((chart, index) => (
          <View key={index} style={styles.chartContainer}>
            <Text style={styles.behaviorTitle}>{chart.behavior}</Text>
            <Line data={chart.data} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    marginBottom: 20,
  },
  behaviorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ObservationChart;