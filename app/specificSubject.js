import { React, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, Pressable } from 'react-native';
import { useRouter, usePathname, useLocalSearchParams } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import dayjs from "dayjs";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import Pagination from "../components/pagination";

const SpecificSubject = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { subjectId, name } = useLocalSearchParams();

  const [observations, setObservations] = useState([
    {
      id: 1,
      behavior: "Hand flapping when excited",
      context: "During free play time",
      timestamp: "2025-04-30T10:15:00Z",
      duration: 300,
      frequency: 3,
      intensity: "Medium",
    },
    {
      id: 2,
      behavior: "Verbal outburst",
      context: "Asked to complete a difficult task",
      timestamp: "2025-04-30T11:20:00Z",
      duration: 120,
      frequency: 1,
      intensity: "High",
    },
    {
      id: 3,
      behavior: "Rocking back and forth",
      context: "While waiting in line",
      timestamp: "2025-04-30T09:45:00Z",
      duration: 420,
      frequency: 2,
      intensity: "Low",
    },
    {
      id: 4,
      behavior: "Crying",
      context: "Transitioning from recess to classroom",
      timestamp: "2025-04-30T12:05:00Z",
      duration: 240,
      frequency: 1,
      intensity: "Medium",
    },
    {
      id: 5,
      behavior: "Throwing objects",
      context: "When denied access to a toy",
      timestamp: "2025-04-30T13:30:00Z",
      duration: 180,
      frequency: 2,
      intensity: "High",
    },
    {
      id: 6,
      behavior: "Humming loudly",
      context: "During group instruction",
      timestamp: "2025-04-30T14:10:00Z",
      duration: 360,
      frequency: 4,
      intensity: "Low",
    },
    {
      id: 7,
      behavior: "Attempted to leave the room",
      context: "After being told to clean up",
      timestamp: "2025-04-30T15:00:00Z",
      duration: 60,
      frequency: 1,
      intensity: "High",
    },
    {
      id: 8,
      behavior: "Clapping hands repeatedly",
      context: "In response to a loud noise",
      timestamp: "2025-04-30T08:55:00Z",
      duration: 120,
      frequency: 3,
      intensity: "Medium",
    },
    {
      id: 9,
      behavior: "Talking to self",
      context: "During independent work",
      timestamp: "2025-04-30T10:45:00Z",
      duration: 600,
      frequency: 2,
      intensity: "Low",
    },
    {
      id: 10,
      behavior: "Refused to follow instructions",
      context: "During clean-up routine",
      timestamp: "2025-04-30T16:15:00Z",
      duration: 300,
      frequency: 1,
      intensity: "Medium",
    },
  ]);

  const scrollRef = useRef(null);

  const [page, setPage] = useState(0);
  const PAGE_SIZE = 5;

  const paginatedObservations = observations.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleCreateObservation = () => {
    if (pathname !== "/logObservation") {
      router.push(`/logObservation`);
    }
  };

  const handleEditObservation = () => {
    alert("Pressed button to edit an existing observation.");
  };

  const handleDeleteObservation = () => {
    alert("Pressed button to delete an existing observation.");
  };

  const handleViewGraph = () => {
    alert("Pressed button to view visual insights graph.");
  };

  const handleViewGoals = () => {
    router.push({ pathname: "/goals", params: { subjectId, name }, });
  };

  const handleViewTreatmentPlans = () => {
    router.push({ pathname: "/treatmentPlans", params: { subjectId, name }, });
  };

  const renderObservationItem = ({ item }) => (
    <View style={styles.observationBox}>
      {/* Observation Data */}
      <View style={styles.observationData}>
        <View>
          <Text style={styles.behaviorTitle}>{item.behavior}</Text>
          <Text style={styles.cardLine}><Text style={styles.label}>Context:</Text> {item.context}</Text>
          <Text style={styles.cardLine}><Text style={styles.label}>Timestamp:</Text> {dayjs(item.timestamp).format("MMMM D, YYYY")}</Text>
          <Text style={styles.cardLine}><Text style={styles.label}>Duration:</Text> {item.duration} {item.duration === 1 ? "second" : "seconds"}</Text>
          <Text style={styles.cardLine}><Text style={styles.label}>Frequency:</Text> {item.frequency} {item.frequency === 1 ? "instance" : "instances"}</Text>
          <Text style={styles.cardLine}><Text style={styles.label}>Intensity:</Text> {item.intensity}</Text>
        </View>
      </View>

      {/* Kebab Menu to Edit & Delete */}
      <Menu style={styles.kebabMenu}>
        <MenuTrigger>
          <Text style={styles.menuTrigger}>⋮</Text>
        </MenuTrigger>
        <MenuOptions style={styles.menuStyle}>
          <MenuOption onSelect={() => handleEditObservation(item.id)}>
            <Text style={styles.menuOption}>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={() => handleDeleteObservation(item.id)}>
            <Text style={styles.menuOption}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );

  const ActionCard = ({ icon, title, description, onPress }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <Pressable
        onPress={onPress}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={[styles.infoCard, hovered && styles.infoCardHover]}
      >
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardText}>{description}</Text>
        </View>
      </Pressable>
    );
  };

  if (Platform.OS === "web") {
    return (
      <MenuProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
              {/* Header */}
              <WebGeneralHeader />

              <View style={styles.bodyContainer}>
                <Text style={styles.sectionTitle}>Observations for {name}</Text>
                {observations.length === 0 ? (
                  <Link href="/createObservation" style={styles.noObservationsTitle}>
                    <Text>Log Your First Observation</Text>
                  </Link>

                ) : (
                  <>
                    <View style={styles.columnContainer}>
                      <View style={styles.leftColumn}>
                        {/* Manual map for pagination */}
                        {paginatedObservations.map((item) => renderObservationItem({ item }))}

                        {/* Pagination Buttons */}
                        <Pagination
                          currentPage={page}
                          totalItems={observations.length}
                          pageSize={PAGE_SIZE}
                          onPageChange={setPage}
                          scrollRef={scrollRef}
                        />
                      </View>

                      <View style={styles.rightColumn}>
                        <ActionCard icon="📈" title="View Visual Insights" description="" onPress={handleViewGraph} />
                        <ActionCard icon="🏅" title="View Goals" description="" onPress={handleViewGoals} />
                        <ActionCard icon="✚" title="View Treatment Plans" description="" onPress={handleViewTreatmentPlans} />
                      </View>

                    </View>
                  </>
                )}
              </View>

              {/* Footer */}
              <WebFooter />
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider >
      </MenuProvider >
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>This is the page for when a specific subject is chosen - ID: {subjectId}</Text>

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
  columnContainer: {
    flexDirection: "row",
  },
  leftColumn: {
    width: "60%",
  },
  sectionTitle: {
    color: "#152A51",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
  },
  noObservationsTitle: {
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
  observationBox: {
    backgroundColor: "#fff",
    padding: 25,
    marginBottom: 20,
    borderRadius: 10,
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  behaviorTitle: {
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
  observationData: {
    flexDirection: "row",
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: "flex-start",
    width: "35%",
  },
  infoCard: {
    // backgroundColor: "#F2F7FB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    transitionDuration: "200ms",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },

  infoCardHover: {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  },
  icon: {
    fontSize: 24,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
    flexShrink: 1,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0A1A33",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    flexWrap: "wrap",
  },
});

export default SpecificSubject;
