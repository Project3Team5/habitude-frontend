import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const Landing = () => {
  const router = useRouter();

  const handleCreateObservation = () => {
    router.push("/logObservation");
  };

  const handleViewSubjects = () => {
    alert("Pressed button to view added dependents.");
  };

  const handleCreateSubjects = () => {
    router.push("/createSubject");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Main Page</Text>

      <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
        <Text style={styles.buttonText}>Log New Observation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleViewSubjects}>
        <Text style={styles.buttonText}>View Dependents</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateSubjects}>
        <Text style={styles.buttonText}>Create New Dependent</Text>
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
