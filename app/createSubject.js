import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";

const CreateSubject = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const router = useRouter();
  const scrollRef = useRef(null);

  const handleCreateSubject = () => {
    alert(`Creating New Person:\nName: ${name}\nDate: ${dayjs(dob).format("MMM D, YYYY")}\nNotes: ${notes}`);
  };

  const handleDobChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDob(selectedDate);
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
              <Text style={styles.sectionTitle}>Create New Subject</Text>

              <View style={styles.inputContainer}>
                <View>
                  <Text style={styles.label}>Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Person's Name"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Date of Birth (MM-DD-YYYY):</Text>
                  {Platform.OS === "web" ? (
                    <input
                      type="date"
                      value={dayjs(dob).format("YYYY-MM-DD")}
                      max="9999-12-31"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const isValid = dayjs(inputValue).isValid();
                        if (isValid) {
                          setDob(dayjs(inputValue).toDate());
                        }
                      }}
                    />
                  ) : (
                    <>
                      <Button title="Pick Date" onPress={() => setShowPicker(true)} />
                      <Text>{dayjs(dob).format("MMM D, YYYY")}</Text>
                      {showPicker && (
                        <DateTimePicker
                          value={dob}
                          mode="date"
                          onChange={handleDobChange}
                          maximumDate={new Date()}
                        />
                      )}
                    </>
                  )}
                </View>

                <View>
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
              </View>

              <TouchableOpacity style={styles.button} onPress={handleCreateSubject}>
                <Text style={styles.buttonText}>Create New Subject</Text>
              </TouchableOpacity>
            </View>
            {/* Footer */}
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