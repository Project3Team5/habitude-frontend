import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";

const CreateTreatmentPlan = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [createError, setCreateError] = useState("");
    const router = useRouter();
    const scrollRef = useRef(null);

    const [treatmentPlan, setTreatmentPlan] = useState({
        subject: null,
        goal: null,
        observation: null,
        plan: "",
        nextReviewDate: new Date(),
        notes: "",
    });

    const handleChange = (name, value) => {
        setTreatmentPlan(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateTreatmentPlan = async () => {
        const { subject, goal, plan, notes } = treatmentPlan;

        if (!subject || !goal || !plan || !notes) {
            setCreateError("⚠️ Please fill out all required fields.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/subjects/${treatmantPlan.subject.id}/treatment-plans`,
                treatmentPlan
            );
            if (response.data) {
                router.push("/landing");
            }
        } catch (error) {
            setCreateError("Error creating new treatment plan for subject.");
            console.error("API Error:", error);
        }
    };

    return (
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
                                        onValueChange={(value) => handleChange("subject", value)}
                                        items={[
                                            { label: "Charles", value: "1" },
                                            { label: "Jimmy", value: "2" },
                                            { label: "Jeff", value: "3" },
                                        ]}
                                        placeholder={{ label: 'Select Subject...', value: null }}
                                        style={{
                                            inputIOS: styles.selectInput,
                                            inputAndroid: styles.selectInput,
                                            inputWeb: styles.selectInput,
                                        }}
                                    />
                                </View>

                                {/* Goal Picker */}
                                <View>
                                    <Text style={styles.label}>Goal</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => handleChange("goal", value)}
                                        items={[
                                            { label: "Temp 1", value: "Temp 1" },
                                            { label: "Testing", value: "Testing" },
                                            { label: "Tester", value: "Tester" },
                                        ]}
                                        placeholder={{ label: 'Select Goal...', value: null }}
                                        style={{
                                            inputIOS: styles.selectInput,
                                            inputAndroid: styles.selectInput,
                                            inputWeb: styles.selectInput,
                                        }}
                                    />
                                </View>

                                {/* Observation Picker */}
                                <View>
                                    <Text style={styles.label}>Observation</Text>
                                    <RNPickerSelect
                                        onValueChange={(value) => handleChange("observation", value)}
                                        items={[
                                            { label: "Observation #1", value: "Observation #1" },
                                            { label: "Observation #2", value: "Observation #2" },
                                            { label: "Observation #3", value: "Observation #3" },
                                        ]}
                                        placeholder={{ label: 'Select Observation...', value: null }}
                                        style={{
                                            inputIOS: styles.selectInput,
                                            inputAndroid: styles.selectInput,
                                            inputWeb: styles.selectInput,
                                        }}
                                    />
                                </View>

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
                                    <Text style={styles.label}>Next Review Date</Text>
                                    {Platform.OS === "web" ? (
                                        <input
                                            type="date"
                                            value={dayjs(treatmentPlan.nextReviewDate).format("YYYY-MM-DD")}
                                            max="9999-12-31"
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const isValid = dayjs(inputValue).isValid();
                                                if (isValid) {
                                                    handleChange("nextReviewDate", dayjs(inputValue).toDate());
                                                }
                                            }}
                                            style={styles.dateInput}
                                        />
                                    ) : (
                                        <View style={styles.dateInput}>
                                            <Button title="Pick Date" onPress={() => setShowPicker(true)} />
                                            <Text>{dayjs(treatmentPlan.nextReviewDate).format("MMM D, YYYY")}</Text>
                                            {showPicker && (
                                                <DateTimePicker
                                                    value={treatmentPlan.nextReviewDate}
                                                    mode="date"
                                                    onChange={(event, selectedDate) => {
                                                        setShowPicker(false);
                                                        if (selectedDate) {
                                                            handleChange("nextReviewDate", selectedDate);
                                                        }
                                                    }}
                                                    maximumDate={new Date()}
                                                />
                                            )}
                                        </View>
                                    )}
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

export default CreateTreatmentPlan;