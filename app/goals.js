import { React, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, Button } from 'react-native';
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import dayjs from "dayjs";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import Pagination from "../components/pagination";

const Goals = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { subjectId, name } = useLocalSearchParams();

    const [goals, setGoals] = useState([
        {
            id: 1,
            description: "Improve eye contact during conversations",
            target_date: "2025-05-30",
            status: "In Progress",
            created_at: "2025-04-01T09:00:00Z",
        },
        {
            id: 2,
            description: "Reduce verbal outbursts to less than twice per week",
            target_date: "2025-06-15",
            status: "Not Started",
            created_at: "2025-04-15T10:30:00Z",
        },
        {
            id: 3,
            description: "Initiate peer interactions during playtime",
            target_date: "2025-05-20",
            status: "In Progress",
            created_at: "2025-04-10T11:45:00Z",
        },
        {
            id: 4,
            description: "Follow 2-step instructions without prompting",
            target_date: "2025-05-10",
            status: "Achieved",
            created_at: "2025-03-25T08:15:00Z",
        },
        {
            id: 5,
            description: "Increase on-task behavior to 80% of session time",
            target_date: "2025-07-01",
            status: "In Progress",
            created_at: "2025-04-20T14:00:00Z",
        },
        {
            id: 6,
            description: "Use coping strategies during transitions",
            target_date: "2025-06-01",
            status: "Not Started",
            created_at: "2025-04-22T13:20:00Z",
        },
        {
            id: 7,
            description: "Verbally label emotions in self and others",
            target_date: "2025-06-10",
            status: "In Progress",
            created_at: "2025-04-05T10:05:00Z",
        },
        {
            id: 8,
            description: "Stay in group settings for 15 minutes without leaving",
            target_date: "2025-06-25",
            status: "Not Started",
            created_at: "2025-04-18T09:50:00Z",
        },
        {
            id: 9,
            description: "Accept denied requests without tantrums",
            target_date: "2025-05-25",
            status: "Achieved",
            created_at: "2025-03-30T15:30:00Z",
        },
        {
            id: 10,
            description: "Respond to name being called within 3 seconds",
            target_date: "2025-05-05",
            status: "In Progress",
            created_at: "2025-04-03T12:45:00Z",
        },
    ]);

    const scrollRef = useRef(null);

    const [page, setPage] = useState(0);
    const PAGE_SIZE = 5;

    const paginatedGoals = goals.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const handleCreateGoal = () => {
        if (pathname !== "/createGoal") {
            router.push(`/createGoal`);
        }
    };

    const handleEditGoal = () => {
        alert("Pressed button to edit an existing goal.");
    };

    const handleDeleteGoal = () => {
        alert("Pressed button to delete an existing goal.");
    };


    const renderGoalItem = ({ item }) => (
        <View style={styles.goalBox}>
            {/* Goal Data */}
            <View style={styles.goalData}>
                <View>
                    <Text style={styles.goalTitle}>{item.description}</Text>
                    <Text style={styles.cardLine}><Text style={styles.label}>Created:</Text> {dayjs(item.created_at).format("MMMM D, YYYY")}</Text>
                    <Text style={styles.cardLine}><Text style={styles.label}>Target Date:</Text> {dayjs(item.target_date).format("MMMM D, YYYY")}</Text>
                    <Text style={styles.cardLine}><Text style={styles.label}>Status:</Text> {item.status}</Text>
                </View>
            </View>

            {/* Kebab Menu to Edit & Delete */}
            <Menu style={styles.kebabMenu}>
                <MenuTrigger>
                    <Text style={styles.menuTrigger}>⋮</Text>
                </MenuTrigger>
                <MenuOptions style={styles.menuStyle}>
                    <MenuOption onSelect={() => handleEditGoal(item.id)}>
                        <Text style={styles.menuOption}>Edit</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => handleDeleteGoal(item.id)}>
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
                                <Text style={styles.sectionTitle}>Goals for {name}</Text>
                                {goals.length === 0 ? (
                                    <Link href="/createGoal" style={styles.noGoalsTitle}>
                                        <Text>Create Your First Goal</Text>
                                    </Link>

                                ) : (
                                    <>
                                        {/* Manual map for pagination */}
                                        {paginatedGoals.map((item) => renderGoalItem({ item }))}

                                        {/* Pagination Buttons */}
                                        <Pagination
                                            currentPage={page}
                                            totalItems={goals.length}
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
                <Text>This is the page for goals of chosen subject - ID: {subjectId}</Text>

                <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
                    <Text style={styles.buttonText}>Log New Observation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleEditObservation}>
                    <Text style={styles.buttonText}>Edit Observation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleDeleteObservation}>
                    <Text style={styles.buttonText}>Delete Observation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleViewGraph}>
                    <Text style={styles.buttonText}>View Visual Insights Graph</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCreateGoal}>
                    <Text style={styles.buttonText}>Create Goal</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCreateTreatment}>
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
    noGoalsTitle: {
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
    goalBox: {
        backgroundColor: "#fff",
        padding: 25,
        marginBottom: 20,
        borderRadius: 10,
        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.2)",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    goalTitle: {
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
    goalData: {
        flexDirection: "row",
    },
});

export default Goals;