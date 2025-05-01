import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter, useLocalSearchParams } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import { useSubjects } from "../contexts/SubjectsContext";

const LogObservation = () => {
  const { subjects, addObservation } = useSubjects();
  const router = useRouter();
  const scrollRef = useRef(null);
  const params = useLocalSearchParams();

  const [selectedSubjectId, setSelectedSubjectId] = useState(
    params.subjectId ? parseInt(params.subjectId) : null
  );
  const [behavior, setBehavior] = useState("");
  const [context, setContext] = useState("");
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleCreateObservation = () => {
    if (!selectedSubjectId) {
      alert("Please select a subject!");
      return;
    }

    const newObservation = {
      id: Date.now(),
      behavior,
      context,
      timestamp: date,
      duration: parseInt(duration || "0"),
      frequency: parseInt(frequency || "0"),
      intensity: selectedIntensity,
    };

    addObservation(selectedSubjectId, newObservation);
    setBehavior("");
    setContext("");
    setDate(new Date());
    setDuration("");
    setFrequency("");
    setSelectedIntensity(null);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <MenuProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
            <WebGeneralHeader />
            <View style={styles.bodyContainer}>
              <Text style={styles.sectionTitle}>Log a New Observation</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Subject</Text>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedSubjectId(value)}
                  items={subjects.map((subject) => ({
                    label: subject.name,
                    value: subject.id,
                  }))}
                  value={selectedSubjectId}
                  placeholder={{ label: "Select Subject...", value: null }}
                  style={{ inputAndroid: styles.input, inputIOS: styles.input }}
                />

                <Text style={styles.label}>Behavior</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Description of Behavior Observed"
                  multiline
                  numberOfLines={4}
                  value={behavior}
                  onChangeText={setBehavior}
                />

                <Text style={styles.label}>Context</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Additional Context (Time, Place, Situation)"
                  multiline
                  numberOfLines={4}
                  value={context}
                  onChangeText={setContext}
                />

                <Text style={styles.label}>Timestamp</Text>
                {Platform.OS === "web" ? (
                  <input
                    type="date"
                    value={dayjs(date).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      const isValid = dayjs(e.target.value).isValid();
                      if (isValid) {
                        setDate(dayjs(e.target.value).toDate());
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

                <Text style={styles.label}>Duration in Seconds</Text>
                <TextInput
                  style={styles.input}
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="numeric"
                  placeholder="0"
                />

                <Text style={styles.label}>Frequency Count (Optional)</Text>
                <TextInput
                  style={styles.input}
                  value={frequency}
                  onChangeText={setFrequency}
                  keyboardType="numeric"
                  placeholder="0"
                />

                <Text style={styles.label}>Intensity</Text>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedIntensity(value)}
                  items={[
                    { label: "Low", value: "Low" },
                    { label: "Medium", value: "Medium" },
                    { label: "High", value: "High" },
                  ]}
                  value={selectedIntensity}
                  placeholder={{ label: "Select Intensity Level...", value: null }}
                  style={{ inputAndroid: styles.input, inputIOS: styles.input }}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
                <Text style={styles.buttonText}>Log New Observation</Text>
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
    fontWeight: "bold",
    marginBottom: 5,
    color: "#152A51",
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
    marginBottom: 15,
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
    textAlign: "center",
  },
});

export default LogObservation;
