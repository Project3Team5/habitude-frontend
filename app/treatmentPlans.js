import { React, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, Button } from 'react-native';
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import dayjs from "dayjs";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import Pagination from "../components/pagination";

const TreatmentPlans = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { subjectId, name } = useLocalSearchParams();

    const [treatmentPlans, setTreatmentPlans] = useState([
        {
            id: 1,
            plan: "Implement a token economy to reinforce desired behaviors.",
            created_at: "2025-03-01T09:30:00Z",
            next_review: "2025-06-01T09:30:00Z",
            notes: "Client responded well to visual tokens. Consider adding auditory reinforcement.",
        },
        {
            id: 2,
            plan: "Introduce social stories for handling transitions.",
            created_at: "2025-03-15T10:00:00Z",
            next_review: "2025-05-15T10:00:00Z",
            notes: "Initial implementation during morning routine. Results pending.",
        },
        {
            id: 3,
            plan: "Weekly group sessions to improve peer interaction.",
            created_at: "2025-04-01T14:00:00Z",
            next_review: "2025-06-01T14:00:00Z",
            notes: "Session attendance has been consistent. Group dynamic is positive.",
        },
        {
            id: 4,
            plan: "Use a visual schedule to increase task independence.",
            created_at: "2025-02-20T08:15:00Z",
            next_review: "2025-05-20T08:15:00Z",
            notes: "Schedule implemented. Needs more prompts than expected.",
        },
        {
            id: 5,
            plan: "Practice functional communication using PECS.",
            created_at: "2025-04-10T11:45:00Z",
            next_review: "2025-07-10T11:45:00Z",
            notes: "Beginning to exchange single pictures for requests.",
        },
        {
            id: 6,
            plan: "Use task analysis to teach hand washing routine.",
            created_at: "2025-03-22T13:10:00Z",
            next_review: "2025-06-22T13:10:00Z",
            notes: "Break down successful. Prompt fading in progress.",
        },
        {
            id: 7,
            plan: "Reduce aggression by teaching coping strategies.",
            created_at: "2025-01-30T09:00:00Z",
            next_review: "2025-04-30T09:00:00Z",
            notes: "Aggressive episodes reduced by 30%. Continue monitoring.",
        },
        {
            id: 8,
            plan: "Daily journaling for emotional expression.",
            created_at: "2025-02-14T15:30:00Z",
            next_review: "2025-05-14T15:30:00Z",
            notes: "Client occasionally skips entries. Needs support initiating.",
        },
        {
            id: 9,
            plan: "Teach requesting breaks to replace escape behavior.",
            created_at: "2025-03-05T10:20:00Z",
            next_review: "2025-05-05T10:20:00Z",
            notes: "Break card used twice this week. Promising results.",
        },
        {
            id: 10,
            plan: "Increase compliance with 3-step directions.",
            created_at: "2025-04-05T08:00:00Z",
            next_review: "2025-06-05T08:00:00Z",
            notes: "Struggling with third step. Adjust instructions as needed.",
        },
    ]);

    const scrollRef = useRef(null);

    const [page, setPage] = useState(0);
    const PAGE_SIZE = 5;

    const paginatedTreatmentPlans = treatmentPlans.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const handleCreateTreatmentPlan = () => {
        if (pathname !== "/createTreatmentPlan") {
            router.push(`/createTreatmentPlan`);
        }
    };

    const handleEditTreatmentPlan = () => {
        alert("Pressed button to edit an existing treatment plan.");
    };

    const handleDeleteTreatmentPlan = () => {
        alert("Pressed button to delete an existing treatment plan.");
    };


    const renderTreatmentPlanItem = ({ item }) => (
        <View style={styles.treatmentPlanBox}>
            {/* Treament Plan Data */}
            <View style={styles.treatmentPlanData}>
                <View>
                    <Text style={styles.planTitle}>{item.plan}</Text>
                    <Text style={styles.cardLine}><Text style={styles.label}>Created:</Text> {dayjs(item.created_at).format("MMMM D, YYYY")}</Text>
                    <Text style={styles.cardLine}><Text style={styles.label}>Next Review Date:</Text> {dayjs(item.next_review).format("MMMM D, YYYY")}</Text>
                    <Text style={styles.cardLine}><Text style={styles.label}>Notes:</Text> {item.notes}</Text>
                </View>
            </View>

            {/* Kebab Menu to Edit & Delete */}
            <Menu style={styles.kebabMenu}>
                <MenuTrigger>
                    <Text style={styles.menuTrigger}>⋮</Text>
                </MenuTrigger>
                <MenuOptions style={styles.menuStyle}>
                    <MenuOption onSelect={() => handleEditTreatmentPlan(item.id)}>
                        <Text style={styles.menuOption}>Edit</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => handleDeleteTreatmentPlan(item.id)}>
                        <Text style={styles.menuOption}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );

    if (Platform.OS === "web") {
        return (
            <MenuProvider>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.container}>
                        <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
                            {/* Header */}
                            <WebGeneralHeader />

                            <View style={styles.bodyContainer}>
                                <Text style={styles.sectionTitle}>Treatment Plans for {name}</Text>
                                {treatmentPlans.length === 0 ? (
                                    <Link href="/createTreatmentPlan" style={styles.noTreatmentPlansTitle}>
                                        <Text>Create Your First Treatment Plan</Text>
                                    </Link>

                                ) : (
                                    <>
                                        {/* Manual map for pagination */}
                                        {paginatedTreatmentPlans.map((item) => renderTreatmentPlanItem({ item }))}

                                        {/* Pagination Buttons */}
                                        <Pagination
                                            currentPage={page}
                                            totalItems={treatmentPlans.length}
                                            pageSize={PAGE_SIZE}
                                            onPageChange={setPage}
                                            scrollRef={scrollRef}
                                        />
                                    </>
                                )}
                            </View>

                            {/* Footer */}
                            <WebFooter />
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </MenuProvider>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>This is the page for treatment plans of chosen subject - ID: {subjectId}</Text>

                <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
                    <Text style={styles.buttonText}>Log New Observation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleEditObservation}>
                    <Text style={styles.buttonText}>Edit Observation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleDeleteObservation}>
                    <Text style={styles.buttonText}>Delete Observation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCreateTreatmentPlan}>
                    <Text style={styles.buttonText}>Create Treatment Plan</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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
    noTreatmentPlansTitle: {
        color: "#3265C3",
        fontSize: 18,
        marginBottom: 15,
        // textAlign: "center",
        textDecorationLine: "underline",
    },
    button: {
        backgroundColor: "#227755",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 15,
        color: "#fff",
        textAlign: "center",
    },
    treatmentPlanBox: {
        backgroundColor: "#fff",
        padding: 25,
        marginBottom: 20,
        borderRadius: 10,
        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.2)",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    planTitle: {
        fontWeight: "600",
        fontSize: 18,
        marginBottom: 8,
        color: "#152A51",
    },
    label: {
        fontWeight: "bold",
        color: "#152A51",
    },
    cardLine: {
        marginBottom: 4,
        color: "#333",
    },
    menuTrigger: {
        color: "#152A51",
        fontSize: 20,
        paddingHorizontal: 10,
        fontWeight: "bold",
    },
    menuStyle: {
        padding: 5,
    },
    menuOption: {
        padding: 10,
        fontSize: 16,
    },
    kebabMenu: {
        flexDirection: "row",
        alignItems: "center",
    },
    treatmentPlanData: {
        flexDirection: "row",
    },
});

export default TreatmentPlans;