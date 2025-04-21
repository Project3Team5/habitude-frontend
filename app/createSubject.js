import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateSubject = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null);
  const [notes, setNotes] = useState("");

  const handleCreateSubject = () => {
    alert("Pressed button to create a new subject.");
  };

  return (
    <View style={styles.container}>
      <Text>This is the "Creating New Subject" Page</Text>

      {/* Temporary breaks */}
      <br></br>
      <View>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Subject's Name"
          value={name}
          onChangeText={setName}
        />

        {/* Not Working as Intended */}
        <Text style={styles.label}>Date of Birth:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Date of Birth"
          keyboardType="numeric"
          value={dob}
          onChangeText={setDob}
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter any additional notes (Optional)"
          multiline
          numberOfLines={6}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

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
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
  },
});

export default CreateSubject;
