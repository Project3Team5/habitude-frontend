import React from 'react';
import { Text, View, } from 'react-native';
import ObservationChart from './ObservationChart';

const TrendPage = () => {
  return (
    <View>
      <Text>Behavior Observation Trends</Text>
      <ObservationChart />
    </View>
  );
};

export default TrendPage;