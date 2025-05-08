import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, ActivityIndicator, ScrollView } from "react-native";
import dayjs from "dayjs";
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { en, registerTranslation } from "react-native-paper-dates";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

registerTranslation("en", en);

const CreateGoal = () => {
  const [userSubjects, setUserSubjects] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [createError, setCreateError] = useState("");
  const router = useRouter();
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const { user, userId, isAuthenticated, logout } = useAuth();

  const [goal, setGoal] = useState({
    subject: null,
    description: "",
    targetDate: new Date(),
    status: null,
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
    setGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleCreateGoal = async () => {
    if (!goal.subject || !goal.description || !goal.status) {
      setCreateError("⚠️ Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/subjects/${goal.subject.id}/goals`,
        {
          subjectId: goal.subject.id,
          description: goal.description,
          targetDate: goal.targetDate,
          status: goal.status,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        router.push({ pathname: "/goals", params: { subjectId: goal.subject.id, name: goal.subject.name }, });
      }
    } catch (error) {
      setCreateError(`Error creating new goal for subject`);
      console.log("Error: ", error);
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
              {/* Header */}
              <WebGeneralHeader />
              <View style={styles.bodyContainer}>
                <Text style={styles.sectionTitle}>Set a New Goal</Text>

                {createError ? <Text style={{ color: "red" }}>{createError}</Text> : null}

                <View style={styles.inputContainer}>
                  {/* Subject Select */}
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
                    <Text style={styles.label}>Target Date (Deadline): {dayjs(goal.targetDate).format("MMM D, YYYY")}</Text>
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
                        date={goal.targetDate}
                        onConfirm={({ date }) => {
                          setShowPicker(false);
                          handleChange("targetDate", date);
                        }}
                        validRange={{
                          endDate: new Date(),
                          startDate: new Date(1900, 0, 1),
                        }}
                      />
                    </View>
                  </View>

                  {/* Status */}
                  <View>
                    <Text style={styles.label}>Status:</Text>
                    <RNPickerSelect
                      onValueChange={(value) => handleChange("status", value)}
                      items={[
                        { label: "Not Started", value: "not started" },
                        { label: "In Progress", value: "in progress" },
                        { label: "Achieved", value: "achieved" },
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
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
  },
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

export default CreateGoal;