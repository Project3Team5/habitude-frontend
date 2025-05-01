import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import dayjs from "dayjs";
import { useRouter, Link } from "expo-router";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";
import Pagination from "../components/pagination";
import { useSubjects } from "../contexts/SubjectsContext";


const Landing = () => {
   const { subjects } = useSubjects();
   const router = useRouter();
   const scrollRef = useRef(null);
   const [isHovered, setIsHovered] = useState(false);
   const [page, setPage] = useState(0);
   const PAGE_SIZE = 5;

   const paginatedUsers = subjects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

   const handleEditSubject = (id) => {
      alert(`Edit Subject with ID: #${id}`);
   };

   const handleDeleteSubject = (id) => {
      alert(`"Delete Subject with ID: #${id}`);
   };

   const handleViewSpecificSubject = (id, name) => {
      router.push({ pathname: "/specificSubject", params: { subjectId: id, name }, });
   };

   const renderSubjectItem = ({ item }) => (
      <Pressable
         onPress={() => handleViewSpecificSubject(item.id, item.name)}
         onHoverIn={() => setIsHovered(true)}
         onHoverOut={() => setIsHovered(false)}
         style={({ hovered }) => [styles.userBox, hovered && styles.userBoxHover]}
      >
         <View style={styles.userData}>
            <Image
               source={require("../assets/images/accountProfile.png")}
               style={styles.profileImage}
            />
            <View>
               <Text style={styles.subjectText}>{item.name}</Text>
               <Text style={styles.dobText}>
                  Born {dayjs(item.dob).format("MMMM D, YYYY")}
               </Text>
            </View>
         </View>

         <Menu style={styles.kebabMenu}>
            <MenuTrigger>
               <Text style={styles.menuTrigger}>⋮</Text>
            </MenuTrigger>
            <MenuOptions style={styles.menuStyle}>
               <MenuOption onSelect={() => handleEditSubject(item.id)}>
                  <Text style={styles.menuOption}>Edit</Text>
               </MenuOption>
               <MenuOption onSelect={() => handleDeleteSubject(item.id)}>
                  <Text style={styles.menuOption}>Delete</Text>
               </MenuOption>
            </MenuOptions>
         </Menu>
      </Pressable>
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
                        <Text style={styles.sectionTitle}>Your Subjects</Text>
                        {subjects.length === 0 ? (
                           <Link href="/createSubject" style={styles.noSubjectsTitle}>
                              <Text>Create Your First Subject</Text>
                           </Link>

                        ) : (
                           <>
                              {/* Manual map for pagination */}
                              {paginatedUsers.map((item) => renderSubjectItem({ item }))}

                              {/* Pagination Buttons */}
                              <Pagination
                                 currentPage={page}
                                 totalItems={subjects.length}
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
         <SafeAreaProvider>
            <SafeAreaView>
               <Text>Welcome to the Main Page</Text>
               <TouchableOpacity style={styles.button} onPress={handleCreateObservation}>
                  <Text style={styles.buttonText}>Log New Observation</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button} onPress={handleCreateSubject}>
                  <Text style={styles.buttonText}>Create New Subject</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button} onPress={handleSettings}>
                  <Text style={styles.buttonText}>Settings</Text>
               </TouchableOpacity>
            </SafeAreaView>
         </SafeAreaProvider>
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
   sectionTitle: {
      color: "#152A51",
      fontWeight: "bold",
      fontSize: 25,
      marginBottom: 15,
   },
   noSubjectsTitle: {
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
   userBox: {
      // backgroundColor: "#fff",
      padding: 25,
      marginBottom: 20,
      borderRadius: 10,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      flexDirection: "row",
      justifyContent: "space-between",
      transitionDuration: "200ms",
   },
   userBoxHover: {
      backgroundColor: "#fff",
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
   },
   subjectText: {
      fontWeight: 600,
      marginBottom: 3,
      fontSize: 16,
   },
   dobText: {
      fontSize: 16,
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
   profileImage: {
      width: 35,
      height: 35,
      resizeMode: "contain",
      marginRight: 15,
      alignSelf: "center",
   },
   kebabMenu: {
      flexDirection: "row",
      alignItems: "center",
   },
   userData: {
      flexDirection: "row",
   },
});

export default Landing;