import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import axios from "axios";

const CreateGoal = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [createError, setCreateError] = useState("");
  const router = useRouter();
  const scrollRef = useRef(null);

  const [goal, setGoal] = useState({
    subject: null,
    description: "",
    targetDate: new Date(),
    status: null,
  });

  const handleChange = (name, value) => {
    setGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleCreateGoal = async () => {
    const { subject, description, targetDate, status } = goal;

    if (!goal.subject || !goal.description || !goal.status) {
      setCreateError("⚠️ Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/subjects/${goal.subject.id}/goals`,
        goal
      );
      if (response.data) {
        router.push(`/landing`);
      }
    } catch (error) {
      setCreateError(`Error creating new goal for subject`);
      console.log("Error: ", error);
    }
  };

  return (
    <MenuProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <WebGeneralHeader />
            <View style={styles.bodyContainer}>
              <Text style={styles.sectionTitle}>Set a New Goal</Text>

              {createError ? <Text style={{ color: "red" }}>{createError}</Text> : null}

              <View style={styles.inputContainer}>
                {/* Subject Select */}
                <View>
                  <Text style={styles.label}>Subject</Text>
                  <RNPickerSelect
                    onValueChange={(value) => handleChange("subject", value)}
                    items={[
                      { label: "Charles", value: "Charles" },
                      { label: "Jimmy", value: "Jimmy" },
                      { label: "Jeff", value: "Jeff" },
                    ]}
                    placeholder={{ label: 'Select Subject...', value: null }}
                    style={{
                      inputIOS: styles.selectInput,
                      inputAndroid: styles.selectInput,
                      inputWeb: styles.selectInput,
                    }}
                  />
                </View>

                {/* Description */}
                <View>
                  <Text style={styles.label}>Description:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter goal description"
                    placeholderTextColor="#a6a6a6"
                    multiline
                    numberOfLines={6}
                    value={goal.description}
                    onChangeText={(text) => handleChange("description", text)}
                  />
                </View>

                {/* Target Date */}
                <View>
                  <Text style={styles.label}>Target Date (Deadline)</Text>
                  {Platform.OS === "web" ? (
                    <input
                      type="date"
                      value={dayjs(goal.targetDate).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsed = dayjs(inputValue, "YYYY-MM-DD");
                        if (parsed.isValid()) {
                          handleChange("targetDate", parsed.toDate());
                        }
                      }}
                      style={styles.dateInput}
                    />
                  ) : (
                    <View style={styles.dateInput}>
                      <Button title="Pick Date" onPress={() => setShowPicker(true)} />
                      <Text>{dayjs(goal.targetDate).format("MMM D, YYYY")}</Text>
                      {showPicker && (
                        <DateTimePicker
                          value={goal.targetDate}
                          mode="date"
                          onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) {
                              handleChange("targetDate", selectedDate);
                            }
                          }}
                          maximumDate={new Date("9999-12-31")}
                        />
                      )}
                    </View>
                  )}
                </View>

                {/* Status */}
                <View>
                  <Text style={styles.label}>Status</Text>
                  <RNPickerSelect
                    onValueChange={(value) => handleChange("status", value)}
                    items={[
                      { label: "Not Started", value: "Not Started" },
                      { label: "In Progress", value: "In Progress" },
                      { label: "Achieved", value: "Achieved" },
                    ]}
                    placeholder={{ label: 'Select Status...', value: null }}
                    style={{
                      inputIOS: styles.selectInput,
                      inputAndroid: styles.selectInput,
                      inputWeb: styles.selectInput,
                    }}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.createButton} onPress={handleCreateGoal}>
                <Text style={styles.createButtonText}>Create New Goal</Text>
              </TouchableOpacity>
            </View>
            <WebFooter />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    minHeight: "100%",
  },
  scrollContent: {
    flexGrow: 1,
  },
  bodyContainer: {
    paddingHorizontal: "14%",
    paddingVertical: 30,
  },
  sectionTitle: {
    color: "#152A51",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
  },
  label: {
    color: "#152A51",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  selectInput: {
    backgroundColor: "#F7F7F7",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    padding: 10,
  },
  dateInput: {
    backgroundColor: "#F7F7F7",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    padding: 10,
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
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#3265C3",
    width: "25%",
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  createButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
});

export default CreateGoal;