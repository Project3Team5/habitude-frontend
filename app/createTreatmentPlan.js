import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button, } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import RNPickerSelect from 'react-native-picker-select';

const CreateTreatmentPlan = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [plan, setPlan] = useState("");
    const [nextReviewDate, setNextReviewDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const handleCreateTreatmentPlan = () => {
        alert(`Creating New Treatment Plan`);
    };

    const handleNextReviewDateChange = (event, selectedReviewDate) => {
        setShowPicker(false);
        if (selectedReviewDate) {
            setNextReviewDate(selectedReviewDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Create New Treatment Plan</Text>

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

                {/* Going to need to iterate over every goal assigned to subject */}
                <View>
                    <Text style={styles.label}>Goal:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedGoal(value)}
                        items={[
                            { label: "Temp 1", value: "Temp 1" },
                            { label: "Testing", value: "Testing" },
                            { label: "Tester", value: "Tester" },
                        ]}
                        placeholder={{ label: 'Select Goal...', value: null }}
                        style={styles.input}
                    />
                </View>

                {/* Going to need to iterate over every observation assigned to subject */}
                <View>
                    <Text style={styles.label}>Observation:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedObservation(value)}
                        items={[
                            { label: "Observation #1", value: "Observation #1" },
                            { label: "Observation #2", value: "Observation #2" },
                            { label: "Observation #3", value: "Observation #3" },
                        ]}
                        placeholder={{ label: 'Select Observation...', value: null }}
                        style={styles.input}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Plan</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Intervention Steps"
                        multiline
                        numberOfLines={6}
                        value={plan}
                        onChangeText={setPlan}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Next Review Date</Text>
                    {Platform.OS === "web" ? (
                        <input
                            type="date"
                            value={dayjs(nextReviewDate).format("YYYY-MM-DD")}
                            max="9999-12-31"
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const isValid = dayjs(inputValue).isValid();
                                if (isValid) {
                                    setNextReviewDate(dayjs(inputValue).toDate());
                                }
                            }}
                        />
                    ) : (
                        <>
                            <Button title="Pick Date" onPress={() => setShowPicker(true)} />
                            <Text>{dayjs(nextReviewDate).format("MMM D, YYYY")}</Text>
                            {showPicker && (
                                <DateTimePicker
                                    value={nextReviewDate}
                                    mode="date"
                                    onChange={handleNextReviewDateChange}
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

            <TouchableOpacity style={styles.button} onPress={handleCreateTreatmentPlan}>
                <Text style={styles.buttonText}>Create New Treatment Plan</Text>
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

export default CreateTreatmentPlan;