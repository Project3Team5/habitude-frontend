import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, ActivityIndicator, ScrollView } from "react-native";
import dayjs from "dayjs";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import RNPickerSelect from 'react-native-picker-select';
import { Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { en, registerTranslation } from "react-native-paper-dates";
import axios from "axios";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import { useAuth } from "../hooks/useAuth";

registerTranslation("en", en);

const CreateTreatmentPlan = () => {
    const [userSubjects, setUserSubjects] = useState([])
    const [userGoals, setUserGoals] = useState([])
    const [userObservations, setUserObservations] = useState([])
    const [showPicker, setShowPicker] = useState(false);
    const [createError, setCreateError] = useState("");
    const router = useRouter();
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(true);

    const { user, userId, isAuthenticated, logout } = useAuth();

    const [treatmentPlan, setTreatmentPlan] = useState({
        subject: null,
        goal: null,
        observation: null,
        plan: "",
        nextReviewDate: new Date(),
        notes: "",
    });

    useEffect(() => {
        if (user === null) return;
        if (!isAuthenticated) {
            router.push("/LoginPage");
        } else {
            handleGetUserSubjects();
        }
    }, [isAuthenticated, user]);

    const handleChange = (name, value) => {
        setTreatmentPlan(prev => ({ ...prev, [name]: value }));
    };

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

    const handleGetUserGoals = async (subjectId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/subjects/${subjectId}/goals`, {
                withCredentials: true,
            });
            setUserGoals(response.data);
        } catch (error) {
            console.error("Error loading goals: ", error);
        }
    };

    const handleGetUserObservations = async (subjectId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/observations/subjects/${subjectId}`, {
                withCredentials: true,
            });
            setUserObservations(response.data);
        } catch (error) {
            console.error("Error loading observations: ", error);
        }
    };

    const handleCreateTreatmentPlan = async () => {
        const { subject, goal, plan, notes, observation, nextReviewDate } = treatmentPlan;

        if (!subject || !goal || !plan) {
            setCreateError("⚠️ Please fill out all required fields.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/treatment-plans`,
                {
                    subjectId: subject.id,
                    goalId: goal.id,
                    observationId: observation?.id,
                    plan,
                    notes,
                    nextReview: nextReviewDate,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.data) {
                router.push({ pathname: "/treatmentPlans", params: { subjectId: subject.id, name: subject.name }, });
            }
        } catch (error) {
            setCreateError("Error creating new treatment plan for subject.");
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
                                <Text style={styles.sectionTitle}>Create a New Treatment Plan</Text>
                                {createError ? <Text style={{ color: "red" }}>{createError}</Text> : null}

                                <View style={styles.inputContainer}>

                                    {/* Subject Picker */}
                                    <View>
                                        <Text style={styles.label}>Subject</Text>
                                        <RNPickerSelect
                                            onValueChange={(subjectId) => {
                                                const subject = userSubjects.find((s) => String(s.id) === String(subjectId));
                                                handleChange("subject", subject);

                                                if (String(subjectId)) {
                                                    handleGetUserGoals(String(subjectId));
                                                    handleGetUserObservations(String(subjectId));
                                                }

                                                // Clear previous selection
                                                handleChange("goal", null);
                                                handleChange("observation", null);
                                            }}
                                            items={userSubjects.map((s) => ({
                                                label: s.name,
                                                value: String(s.id),
                                            }))}
                                            placeholder={{ label: "Select Subject...", value: null }}
                                            style={{
                                                inputIOS: styles.selectInput,
                                                inputAndroid: styles.selectInput,
                                                inputWeb: styles.selectInput,
                                            }}
                                        />
                                    </View>


                                    {/* Goal Picker */}
                                    {treatmentPlan.subject && (
                                        < View >
                                            <Text style={styles.label}>Goal</Text>
                                            <RNPickerSelect
                                                onValueChange={(goalId) => {
                                                    const goal = userGoals.find((g) => String(g.id) === String(goalId));
                                                    handleChange("goal", goal);
                                                }}
                                                items={userGoals.map((g) => ({
                                                    label: g.description,
                                                    value: String(g.id),
                                                }))}
                                                placeholder={{ label: 'Select Goal...', value: null }}
                                                style={{
                                                    inputIOS: styles.selectInput,
                                                    inputAndroid: styles.selectInput,
                                                    inputWeb: styles.selectInput,
                                                }}
                                            />
                                        </View>
                                    )}

                                    {/* Observation Picker */}
                                    {treatmentPlan.subject && (
                                        < View >
                                            <Text style={styles.label}>Observation</Text>
                                            <RNPickerSelect
                                                onValueChange={(obsId) => {
                                                    const obs = userObservations.find((o) => String(o.id) === String(obsId));
                                                    handleChange("observation", obs);
                                                }}
                                                items={userObservations.map((o) => ({
                                                    label: `${o.behavior} (${dayjs(o.timestamp).format("MMM D, YYYY")})`,
                                                    value: String(o.id),
                                                }))}
                                                placeholder={{ label: 'Select Observation...', value: null }}
                                                style={{
                                                    inputIOS: styles.selectInput,
                                                    inputAndroid: styles.selectInput,
                                                    inputWeb: styles.selectInput,
                                                }}
                                            />
                                        </View>
                                    )}

                                    {/* Plan */}
                                    <View>
                                        <Text style={styles.label}>Plan</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Intervention Steps"
                                            placeholderTextColor="#a6a6a6"
                                            multiline
                                            numberOfLines={6}
                                            value={treatmentPlan.plan}
                                            onChangeText={(text) => handleChange("plan", text)}
                                        />
                                    </View>

                                    {/* Next Review Date */}
                                    <View>
                                        <Text style={styles.label}>Next Review Date: {dayjs(treatmentPlan.nextReviewDate).format("MMM D, YYYY")}</Text>
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
                                                date={treatmentPlan.nextReviewDate}
                                                onConfirm={({ date }) => {
                                                    setShowPicker(false);
                                                    handleChange("nextReviewDate", date);
                                                }}
                                                validRange={{
                                                    endDate: new Date(),
                                                    startDate: new Date(1900, 0, 1),
                                                }}
                                            />
                                        </View>
                                    </View>

                                    {/* Notes */}
                                    <View>
                                        <Text style={styles.label}>Notes</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Additional notes (optional)"
                                            placeholderTextColor="#a6a6a6"
                                            multiline
                                            numberOfLines={6}
                                            value={treatmentPlan.notes}
                                            onChangeText={(text) => handleChange("notes", text)}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.createButton} onPress={handleCreateTreatmentPlan}>
                                    <Text style={styles.createButtonText}>Create New Treatment Plan</Text>
                                </TouchableOpacity>
                            </View>
                            <WebFooter />
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </MenuProvider>
        </PaperProvider >
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

export default CreateTreatmentPlan;