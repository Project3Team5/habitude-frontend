import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button, } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import RNPickerSelect from 'react-native-picker-select';

const CreateGoal = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleCreateGoal = () => {
    alert(`Creating New Goal`);
  };

  const handleTargetDateChange = (event, selectedTargetDate) => {
    setShowPicker(false);
    if (selectedTargetDate) {
      setTargetDate(selectedTargetDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create New Goal</Text>

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
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter any additional details (Optional)"
            multiline
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View>
          <Text style={styles.label}>Target Date (Deadline)</Text>
          {Platform.OS === "web" ? (
            <input
              type="date"
              value={dayjs(targetDate).format("YYYY-MM-DD")}
              max="9999-12-31"
              onChange={(e) => {
                const inputValue = e.target.value;
                const isValid = dayjs(inputValue).isValid();
                if (isValid) {
                  setTargetDate(dayjs(inputValue).toDate());
                }
              }}
            />
          ) : (
            <>
              <Button title="Pick Date" onPress={() => setShowPicker(true)} />
              <Text>{dayjs(targetDate).format("MMM D, YYYY")}</Text>
              {showPicker && (
                <DateTimePicker
                  value={targetDate}
                  mode="date"
                  onChange={handleTargetDateChange}
                  maximumDate={new Date()}
                />
              )}
            </>
          )}
        </View>

        <View>
          <Text style={styles.label}>Status</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedStatus(value)}
            items={[
              { label: "Not Started", value: "Not Started" },
              { label: "In Progress", value: "In Progress" },
              { label: "Achieved", value: "Achieved" },
            ]}
            placeholder={{ label: 'Select Status...', value: null }}
            style={styles.input}
          />
        </View>


      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateGoal}>
        <Text style={styles.buttonText}>Create New Goal</Text>
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

export default CreateGoal;