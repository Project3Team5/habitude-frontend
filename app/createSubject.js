import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const CreateSubject = () => {

  const handleCreateSubject = () => {
    alert("Pressed button to create a new subject.");
  };

  return (
    <View style={styles.container}>
      <Text>This is the "Creating New Subject" Page</Text>

      <Text>Name:</Text>
      <TextInput
      placeholder="Enter Subject's Name"
      />

      <Text>Age:</Text>
      <TextInput
      placeholder="Enter Age"
      keyboardType="numeric"
      />

      <Text>Notes</Text>
      <TextInput
      placeholder="Enter any additional notes (Optional)"
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateSubject}>
        <Text style={styles.buttonText}>Create New Subject</Text>
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

export default CreateSubject;
