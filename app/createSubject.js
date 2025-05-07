import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import axios from "axios";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";

const CreateSubject = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [createError, setCreateError] = useState("");
  const router = useRouter();
  const scrollRef = useRef(null);

  const [subject, setSubject] = useState({
    name: "",
    dob: new Date(),
    notes: "",
  });

  const handleChange = (name, value) => {
    setSubject((prevSubject) => ({
      ...prevSubject,
      [name]: value,
    }));
  };

  const handleCreateSubject = async () => {
    if (!subject.name || !subject.notes) {
      setCreateError("⚠️ Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/${userId}/subjects`,
        {
          name: subject.name,
          dob: subject.dob,
          notes: subject.notes,
        }
      );
      if (response.data) {
        router.push(`/landing`);
      }
    } catch (error) {
      setCreateError(`Error creating new subject`);
      console.log("Error: ", error);
    }
  };

  return (
    <MenuProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
            <WebGeneralHeader />
            <View style={styles.bodyContainer}>
              <Text style={styles.sectionTitle}>Create a New Subject</Text>
              {createError ? <Text style={{ color: "red" }}>{createError}</Text> : null}

              <View style={styles.inputContainer}>
                <View>
                  <Text style={styles.label}>Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Person's Name"
                    placeholderTextColor="#a6a6a6"
                    value={subject.name}
                    onChangeText={(text) => handleChange("name", text)}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Date of Birth (MM-DD-YYYY):</Text>
                  {Platform.OS === "web" ? (
                    <input
                      type="date"
                      value={dayjs(subject.dob).format("YYYY-MM-DD")}
                      max="9999-12-31"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const parsedDate = dayjs(inputValue, "YYYY-MM-DD");
                        if (parsedDate.isValid()) {
                          handleChange("dob", parsedDate.toDate());
                        }
                      }}
                      style={styles.dateInput}
                    />
                  ) : (
                    <View style={styles.dateInput}>
                      <Button title="Pick Date" onPress={() => setShowPicker(true)} />
                      <Text>{dayjs(subject.dob).format("MMM D, YYYY")}</Text>
                      {showPicker && (
                        <DateTimePicker
                          value={subject.dob}
                          mode="date"
                          onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) {
                              handleChange("dob", selectedDate);
                            }
                          }}
                          maximumDate={new Date()}
                        />
                      )}
                    </View>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Notes:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter any additional notes (optional)"
                    placeholderTextColor="#a6a6a6"
                    multiline
                    numberOfLines={6}
                    value={subject.notes}
                    onChangeText={(text) => handleChange("notes", text)}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.createButton} onPress={handleCreateSubject}>
                <Text style={styles.createButtonText}>Create New Subject</Text>
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

export default CreateSubject;