import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, ActivityIndicator, ScrollView } from "react-native";
import dayjs from "dayjs";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import { Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { en, registerTranslation } from "react-native-paper-dates";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import { useAuth } from "../hooks/useAuth";

registerTranslation("en", en);

const LogObservation = () => {
  const [userSubjects, setUserSubjects] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [createError, setCreateError] = useState("");
  const router = useRouter();
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const { user, userId, isAuthenticated, logout } = useAuth();

  const [observation, setObservation] = useState({
    subject: null,
    behavior: "",
    context: "",
    timestamp: new Date(),
    duration: null,
    frequency: null,
    intensity: null,
  });

  useEffect(() => {
    if (user === null) return;
    if (!isAuthenticated) {
      router.push("/LoginPage");
    } else {
      handleGetUserSubjects();
    }
  }, [isAuthenticated, user]);

  const handleGetUserSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}/subjects`, {
        withCredentials: true,
      });
      setUserSubjects(response.data);
    } catch (error) {
      console.log("Error getting subjects from user: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setObservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateObservation = async () => {
    const { subject, behavior, context, timestamp, duration, frequency, intensity } = observation;

    if (!subject || !behavior || !context || !duration || !frequency || !intensity) {
      setCreateError("⚠️ Please fill out all required fields.");
      return;
    } else {
      setCreateError("");
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/observations`,
        {
          subjectId: subject.id,
          observerId: userId,
          behavior,
          context,
          timestamp,
          duration: parseInt(duration, 10) || 0,
          frequency: parseInt(frequency, 10) || 0,
          intensity,
        },
        { withCredentials: true }
      );

      if (response.data) {
        router.push({ pathname: "/specificSubject", params: { subjectId: subject.id, name: subject.name } });
      }
    } catch (error) {
      setCreateError("Error creating new observation for subject.");
      console.error("API Error:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <MenuProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
              <WebGeneralHeader />
              <View style={styles.bodyContainer}>
                <Text style={styles.sectionTitle}>Log a New Observation</Text>
                <View style={styles.inputContainer}>

                  <View>
                    <Text style={styles.label}>Subject:</Text>
                    <RNPickerSelect
                      onValueChange={(subjectId) => {
                        const subject = userSubjects.find((s) => String(s.id) === String(subjectId));
                        handleChange("subject", subject);
                      }}
                      items={userSubjects.map((s) => ({
                        label: s.name,
                        value: String(s.id),
                      }))}
                      placeholder={{ label: 'Select Subject...', value: null }}
                      style={{
                        inputIOS: styles.selectInput,
                        inputAndroid: styles.selectInput,
                        inputWeb: styles.selectInput,
                      }}
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Behavior:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Description of Behavior Observed"
                      placeholderTextColor="#a6a6a6"
                      multiline
                      numberOfLines={6}
                      value={observation.behavior}
                      onChangeText={(text) => handleChange("behavior", text)}
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Context:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Additional Context (Time, Place, Situation)"
                      placeholderTextColor="#a6a6a6"
                      multiline
                      numberOfLines={6}
                      value={observation.context}
                      onChangeText={(text) => handleChange("context", text)}
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Date: {dayjs(observation.timestamp).format("MMM D, YYYY")}</Text>
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
                        date={observation.timestamp}
                        onConfirm={({ date }) => {
                          setShowPicker(false);
                          handleChange("timestamp", date);
                        }}
                        validRange={{
                          endDate: new Date(),
                          startDate: new Date(1900, 0, 1),
                        }}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.label}>Duration (In Seconds):</Text>
                    <TextInput
                      style={styles.input}
                      value={observation.duration}
                      onChangeText={(number) => handleChange("duration", number)}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor="#a6a6a6"
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Frequency Count:</Text>
                    <TextInput
                      style={styles.input}
                      value={observation.frequency}
                      onChangeText={(number) => handleChange("frequency", number)}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor="#a6a6a6"
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>Intensity Level:</Text>
                    <RNPickerSelect
                      onValueChange={(value) => handleChange("intensity", value)}
                      items={[
                        { label: "Low", value: "LOW" },
                        { label: "Medium", value: "MEDIUM" },
                        { label: "High", value: "HIGH" },
                      ]}
                      placeholder={{ label: 'Select Intensity Level...', value: null }}
                      style={{
                        inputIOS: styles.selectInput,
                        inputAndroid: styles.selectInput,
                        inputWeb: styles.selectInput,
                      }}
                    />
                  </View>

                  {createError ? <Text style={{ color: "red" }}>{createError}</Text> : null}
                </View>

                <TouchableOpacity style={styles.createButton} onPress={handleCreateObservation}>
                  <Text style={styles.createButtonText}>Log New Observation</Text>
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
  selectInput: {
    backgroundColor: "#F7F7F7",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    padding: 10,
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

export default LogObservation;