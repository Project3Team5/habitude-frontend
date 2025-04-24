import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import RNPickerSelect from 'react-native-picker-select';

const LogObservation = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [behavior, setBehavior] = useState("");
  const [context, setContext] = useState("");
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleCreateObservation = () => {
    alert(`Logging New Observation`);
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

      <View style={styles.inputContainer}>

        {/* Going to need to iterate over every subject created from user */}
        <View>
          <Text style={styles.label}>Subject</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedSubject(value)}
            items={[
              { label: "Charles", value: "Charles" },
              { label: "Jimmy", value: "Jimmy" },
              { label: "Jeff", value: "Jeff" },
            ]}
            placeholder={{ label: 'Select Subject...', value: null }}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.label}>Behavior</Text>
          <TextInput
            style={styles.input}
            placeholder="Description of Behavior Observed"
            multiline
            numberOfLines={6}
            value={behavior}
            onChangeText={setBehavior}
          />
        </View>

        <View>
          <Text style={styles.label}>Context</Text>
          <TextInput
            style={styles.input}
            placeholder="Additional Context (Time, Place, Situation)"
            multiline
            numberOfLines={6}
            value={context}
            onChangeText={setContext}
          />
        </View>

        <View>
          <Text style={styles.label}>Timestamp</Text>
          {Platform.OS === "web" ? (
            <input
              type="date"
              value={dayjs(date).format("YYYY-MM-DD")}
              max="9999-12-31"
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValid = dayjs(inputValue).isValid();
                if (isValid) {
                  setDate(dayjs(inputValue).toDate());
                }
              }}
            />
          ) : (
            <>
              <Button title="Pick Date" onPress={() => setShowPicker(true)} />
              <Text>{dayjs(date).format("MMM D, YYYY")}</Text>
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

        <View>
          <Text style={styles.label}>Duration in Seconds (If Applicable)</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>

        <View>
          <Text style={styles.label}>Frequency Count if Logged in Batches (Optional)</Text>
          <TextInput
            style={styles.input}
            value={frequency}
            onChangeText={setFrequency}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>

        <View>
          <Text style={styles.label}>Intensity Level</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedIntensity(value)}
            items={[
              { label: "Low", value: "Low" },
              { label: "Medium", value: "Medium" },
              { label: "High", value: "High" },
            ]}
            placeholder={{ label: 'Select Intensity Level...', value: null }}
            style={styles.input}
          />
        </View>

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
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
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