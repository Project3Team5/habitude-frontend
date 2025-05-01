import React, { useState, useRef, useCallback, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, Pressable } from "react-native";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import dayjs from "dayjs";
import { useFocusEffect } from "@react-navigation/native";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import Pagination from "../components/pagination";
import { useSubjects } from "../contexts/SubjectsContext";

const SpecificSubject = () => {
  const router = useRouter();
  const { subjectId, name } = useLocalSearchParams();
  const { subjects, getObservationsBySubjectId } = useSubjects();
  const [observations, setObservations] = useState([]);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 5;

  const scrollRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const fetched = getObservationsBySubjectId(parseInt(subjectId));
      setObservations(fetched);
    }, [subjectId])
  );

  const paginatedObservations = observations.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleCreateObservation = () => {
    router.push({ pathname: "/logObservation", params: { subjectId, name } });
  };

  const handleEditObservation = (id) => {
    alert(`Edit observation with ID: ${id}`);
  };

  const handleDeleteObservation = (id) => {
    alert(`Delete observation with ID: ${id}`);
  };

  const handleViewGraph = () => {
    router.push({ pathname: "/ObservationChart", params: { subjectId, name, observations: JSON.stringify(observations) } });
  };

  const handleViewGoals = () => {
    router.push({ pathname: "/goals", params: { subjectId, name } });
  };

  const handleViewTreatmentPlans = () => {
    router.push({ pathname: "/treatmentPlans", params: { subjectId, name } });
  };

  const renderObservationItem = ({ item }) => (
    <View style={styles.observationBox} key={item.id}>
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
              <WebGeneralHeader />
              <View style={styles.bodyContainer}>
                <Text style={styles.sectionTitle}>Observations for {name}</Text>

                {observations.length === 0 ? (
                  <Link href={`/logObservation?subjectId=${subjectId}&name=${name}`} style={styles.noObservationsTitle}>
                    <Text>Log Your First Observation</Text>
                  </Link>
                ) : (
                  <View style={styles.columnContainer}>
                    <View style={styles.leftColumn}>
                      {paginatedObservations.map((item) => renderObservationItem({ item }))}
                      <Pagination
                        currentPage={page}
                        totalItems={observations.length}
                        pageSize={PAGE_SIZE}
                        onPageChange={setPage}
                        scrollRef={scrollRef}
                      />
                    </View>

                    <View style={styles.rightColumn}>
                      <ActionCard icon="📈" title="View Visual Insights" onPress={handleViewGraph} />
                      <ActionCard icon="🏅" title="View Goals" onPress={handleViewGoals} />
                      <ActionCard icon="✚" title="View Treatment Plans" onPress={handleViewTreatmentPlans} />
                    </View>
                  </View>
                )}
              </View>
              <WebFooter />
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
      </MenuProvider>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Subject ID: {subjectId}</Text>
        <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
          <Text style={styles.buttonText}>Log New Observation</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
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
  columnContainer: {
    flexDirection: "row",
  },
  leftColumn: {
    width: "60%",
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 20,
    width: "35%",
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
    textDecorationLine: "underline",
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
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
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
});

export default SpecificSubject;
