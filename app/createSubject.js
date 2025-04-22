import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateSubject = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState(
    Platform.OS === 'web'
      ? '2000-01-01' // Web expects YYYY-MM-DD string
      : new Date(2000, 0, 1) // Mobile expects a Date object; month is 0-indexed
  );  
  const [notes, setNotes] = useState('');

  const handleCreateSubject = () => {
    const finalDob =
      Platform.OS === 'web' ? new Date(dob + 'T00:00:00') : dob;

    alert(
      `Creating New Subject:\nName: ${name}\nDate of Birth: ${finalDob.toDateString()}\nNotes: ${notes}`
    );
  };

  const handleChangeDob = (e, selectedDate) => {
    if (Platform.OS === 'web') {
      const value = e?.target?.value;
      if (value) {
        setDob(value); // keep as string "YYYY-MM-DD"
      }
    } else {
      if (selectedDate) {
        setDob(selectedDate); // set actual Date object
      }
    }
    console.log(dob);
  };


  return (
    <View style={styles.container}>
      <Text>Create New Subject</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Subject's Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth (MM-DD-YYYY):</Text>
        {Platform.OS === 'web' ? (
          // Web input (date of birth)
          <input
            type="date"
            value={dob}
            onChange={handleChangeDob}
          />
        ) : (
          // Mobile input (date of birth)
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleChangeDob}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Notes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter any additional notes (optional)"
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: "#227755",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
  },
});

export default CreateSubject;