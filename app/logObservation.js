import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const LogObservation = () => {
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleCreateObservation = () => {
    alert(`Logging observation:\nDate: ${date.toDateString()}\nNotes: ${notes}`);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text>This is the Log Observation Page</Text>

      {/* Subject and behavior dropdowns can be added here */}

      <View style={styles.inputContainer}>
        {/* Notes Input */}
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter any additional notes (Optional)"
          multiline
          numberOfLines={6}
          value={notes}
          onChangeText={setNotes}
        />

        {/* Temporary Line Breaks */}
        <br></br><br></br>

        {/* Timestamp Input (Have to Clean Up) */}
        <Text style={styles.label}>Timestamp</Text>
        {Platform.OS === 'web' ? (
          <input
            type="date"
            value={date.toISOString().split('T')[0]}
            max="9999-12-31"
            onChange={(e) => {
              const inputValue = e.target.value;
              const isValid = !isNaN(Date.parse(inputValue));
              if (isValid) {
                setDate(new Date(inputValue));
              }
            }}
            style={styles.input}
          />
        ) : (
          <>
            <Button title="Pick Date" onPress={() => setShowPicker(true)} />
            <Text>{date.toDateString()}</Text>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
        <Text style={styles.buttonText}>Log New Observation</Text>
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

export default LogObservation;