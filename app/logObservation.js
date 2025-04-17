import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const LogObservation = () => {

  const handleCreateObservation = () => {
    alert("Pressed button to log a new observation.");
  };

  return (
    <View style={styles.container}>
      <Text>This is the Log Observation Page</Text>

      {/* Additional of choosing subject and behavior not added */}

      <Text>Notes</Text>
      <TextInput
      placeholder="Enter any additional notes (Optional)"
      />

      {/* Additional of adding duration and timestamp not added */}

      <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
        <Text style={styles.buttonText}>Log New Observation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#227755",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
  },
});

export default LogObservation;
