import { React, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import dayjs from "dayjs";
import axios from "axios";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import Pagination from "../components/pagination";

const Goals = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { subjectId, name } = useLocalSearchParams();
    const [goals, setGoals] = useState([]);
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleViewGoalsData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/subjects/${subjectId}/subjects`);
                setGoals(response.data);
            } catch (error) {
                console.log("Error getting goals of chosen subject from user: ", error);
            } finally {
                setLoading(false);
            }
        };

        handleViewGoalsData();
    }, []);

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
                    <Text style={styles.cardLine}><Text style={styles.label}>Created:</Text> {dayjs(item.createdAt).format("MMMM D, YYYY")}</Text>
                    <Text style={styles.cardLine}><Text style={styles.label}>Target Date:</Text> {dayjs(item.targetDate).format("MMMM D, YYYY")}</Text>
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

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

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