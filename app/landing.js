import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Landing = () => {

  const handleCreateObservation = () => {
    alert("Pressed button to log new observation.");
  };

  const handleViewSubjects = () => {
    alert("Pressed button to view current subjects.");
  };

  const handleCreateSubjects = () => {
    alert("Pressed button to create new subject.");
  };

  const handleSettings = () => {
    alert("Pressed button to go to settings.");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Main Page</Text>

      <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
        <Text style={styles.buttonText}>Log New Observation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleViewSubjects}>
        <Text style={styles.buttonText}>View Subjects</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateSubjects}>
        <Text style={styles.buttonText}>Create New Subject</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSettings}>
        <Text style={styles.buttonText}>Settings</Text>
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

export default Landing;
