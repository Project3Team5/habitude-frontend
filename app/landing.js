import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const Landing = () => {
  const router = useRouter();

  const handleCreateObservation = () => {
    router.push("/logObservation");
  };

  const handleViewSubject = () => {
    router.push("/specificSubject");
  };

  const handleCreateSubject = () => {
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

      <TouchableOpacity style={styles.button} onPress={handleViewSubject}>
        <Text style={styles.buttonText}>View Subject</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateSubject}>
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
