import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';


const SpecificSubject = () => {
  const router = useRouter();

  const handleCreateObservation = () => {
    router.push("/logObservation");
  };

  const handleEditObservation = () => {
    alert("Pressed button to edit an existing observation.");
  };

  const handleDeleteObservation = () => {
    alert("Pressed button to delete an existing observation.");
  };

  const handleViewGraph = () => {
    alert("Pressed button to view visual insights graph.");
  };

  const handleCreateGoal = () => {
    router.push("/createGoal");
  };

  const handleCreateTreatment = () => {
    router.push("/createTreatmentPlan");
  };

  return (
    <View style={styles.container}>
      <Text>This is the page for when a specific subject is chosen.</Text>

      <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
        <Text style={styles.buttonText}>Log New Observation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleEditObservation}>
        <Text style={styles.buttonText}>Edit Observation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteObservation}>
        <Text style={styles.buttonText}>Delete Observation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleViewGraph}>
        <Text style={styles.buttonText}>View Visual Insights Graph</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateGoal}>
        <Text style={styles.buttonText}>Create Goal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateTreatment}>
        <Text style={styles.buttonText}>Create Treatment Plan</Text>
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

export default SpecificSubject;
