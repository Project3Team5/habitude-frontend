import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, ScrollView } from "react-native";
import dayjs from "dayjs";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import axios from "axios";
import { Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { en, registerTranslation } from "react-native-paper-dates";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import { useAuth } from "../hooks/useAuth";

registerTranslation("en", en);

const CreateSubject = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [createError, setCreateError] = useState("");
  const router = useRouter();
  const scrollRef = useRef(null);

  const { user, userId, isAuthenticated, logout } = useAuth();

  const [subject, setSubject] = useState({
    name: "",
    dob: new Date(),
    notes: "",
  });

  useEffect(() => {
    if (user === null) return;
    if (!isAuthenticated) {
      router.push("/LoginPage");
    }
  }, [isAuthenticated, user]);

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
    <PaperProvider>
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
                    <Text style={styles.label}>Date of Birth: {dayjs(subject.dob).format("MMM D, YYYY")}</Text>
                    <View style={styles.dateInput}>
                      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)} >
                        <Text style={styles.chooseDateText}>
                          Change Date
                        </Text>
                      </TouchableOpacity>
                      <DatePickerModal
                        locale="en"
                        mode="single"
                        visible={showPicker}
                        onDismiss={() => setShowPicker(false)}
                        date={subject.dob}
                        onConfirm={({ date }) => {
                          setShowPicker(false);
                          handleChange("dob", date);
                        }}
                        validRange={{
                          endDate: new Date(),
                          startDate: new Date(1900, 0, 1),
                        }}
                      />
                    </View>
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
    </PaperProvider>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#3265C3",
    width: "25%",
    padding: 10,
    borderRadius: 50,
  },
  chooseDateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
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