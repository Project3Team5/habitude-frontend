import { React, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Pressable, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

const WebGeneralHeader = () => {
   const router = useRouter();
   const pathname = usePathname();

   const handleHome = () => {
      if (pathname !== "/landing") {
         router.push(`/landing`);
      }
   };

   const handleCreateObservation = () => {
      if (pathname !== "/logObservation") {
         router.push(`/logObservation`);
      }
   };

   const handleCreateSubject = () => {
      if (pathname !== "/createSubject") {
         router.push(`/createSubject`);
      }
   };

   const handleCreateGoal = () => {
      if (pathname !== "/createGoal") {
         router.push(`/createGoal`);
      }
   };

   const handleCreateTreatmentPlan = () => {
      if (pathname !== "/createTreatmentPlan") {
         router.push(`/createTreatmentPlan`);
      }
   };

   const handleSettings = () => {
      if (pathname !== "/settings") {
         router.push(`/settings`);
      }
   };

   const handleLogout = () => {
      router.dismissAll();
      router.replace("/");
   };

   return (
      <View>
         <View style={styles.headerContainer}>
            <Pressable onPress={handleHome}>
               <Image
                  source={require("../assets/images/Habitude-White-Logo.png")}
                  style={styles.headerLogo}
               />
            </Pressable>
         </View>

         {/* Navbar */}
         <View style={styles.navbar}>

            {/* General Navigation Buttons */}
            <View style={styles.leftNav}>
               <NavButton label="Home" onPress={handleHome} />
               <NavButton label="Create Subject" onPress={handleCreateSubject} />
               <NavButton label="Log Observation" onPress={handleCreateObservation} />
               <NavButton label="Set New Goal" onPress={handleCreateGoal} />
               <NavButton label="Create Treatment Plan" onPress={handleCreateTreatmentPlan} />
            </View>

            {/* My Account Button */}
            <View style={styles.rightNav}>
               <Menu>
                  <MenuTrigger
                     customStyles={{
                        TriggerTouchableComponent: TouchableOpacity,
                        triggerOuterWrapper: styles.triggerWrapper,
                     }}
                  >

                     <View style={styles.accountButton}>
                        <Image
                           source={require("../assets/images/accountProfile.png")}
                           style={styles.profileImage}
                        />
                        <Text style={styles.accountText}>My Account</Text>
                        <Image
                           source={require("../assets/images/blue-dropdown.png")}
                           style={styles.navImage}
                        />
                     </View>
                  </MenuTrigger>

                  <MenuOptions
                     customStyles={{
                        optionsContainer: styles.optionsContainer,
                     }}
                  >
                     <MenuOption onSelect={() => handleSettings()}>
                        <View style={styles.menuOptionContainer}>
                           <Image
                              source={require("../assets/images/Settings.png")}
                              style={styles.profileImage}
                           />
                           <Text style={styles.menuOptionText}>Settings</Text>
                        </View>
                     </MenuOption>
                     <MenuOption onSelect={() => handleLogout()}>
                        <View style={styles.menuOptionContainer}>
                           <Image
                              source={require("../assets/images/Logout.png")}
                              style={styles.profileImage}
                           />
                           <Text style={styles.menuOptionText}>Log Out</Text>
                        </View>
                     </MenuOption>
                  </MenuOptions>
               </Menu>
            </View>
         </View>
      </View>
   );
};

// Helper for Navbar buttons
const NavButton = ({ label, onPress }) => (
   <View style={styles.navDivider}>
      <TouchableOpacity onPress={onPress}>
         <Text style={styles.navButton}>{label}</Text>
      </TouchableOpacity>
   </View>
);

const screenWidth = Dimensions.get("window").width;
const isSmallScreen = screenWidth < 768;
const logoWidth = screenWidth < 500 ? 120 : 300;
const horizontalWidth = screenWidth < 768 ? 7 : 14;

const styles = StyleSheet.create({
   headerContainer: {
      backgroundColor: "#152A51",
      flexDirection: "row",
      paddingHorizontal: `${horizontalWidth}%`,
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.5)",
      zIndex: 2,
   },
   headerLogo: {
      width: logoWidth,
      height: undefined,
      marginVertical: 8,
      resizeMode: "contain",
   },
   navbar: {
      backgroundColor: "#3265C3",
      flexDirection: isSmallScreen ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      paddingVertical: 20,
      paddingHorizontal: `${horizontalWidth}%`,
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.5)",
      zIndex: 1,
      rowGap: 10,
      columnGap: 16,
   },
   leftNav: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 16,
   },
   rightNav: {
      flexDirection: "row",
      alignItems: "center",
   },
   navDivider: {
      marginRight: 16,
      marginBottom: 8,
   },
   navButton: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: "Arial",
   },
   accountButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#DFE7F6",
      borderColor: "#152A51",
      borderWidth: 2,
      borderRadius: 50,
      paddingHorizontal: 15,
      paddingVertical: 5,
      width: 190,
   },
   accountText: {
      color: "#152A51",
      fontWeight: "bold",
      fontSize: 18,
      marginHorizontal: 8,
   },
   profileImage: {
      width: 20,
      height: 20,
      resizeMode: "contain",
   },
   navImage: {
      width: 15,
      height: 15,
      resizeMode: "contain",
   },
   menuStyle: {
      backgroundColor: "#DFE7F6",
      paddingVertical: 10,
      borderRadius: 10,
   },
   triggerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   optionsContainer: {
      backgroundColor: "#DFE7F6",
      paddingVertical: 5,
      paddingHorizontal: 12,
      elevation: 5,
      marginTop: 40,
      borderRadius: 5,
      width: 190,
   },
   menuOptionText: {
      color: "#152A51",
      fontWeight: "bold",
      fontSize: 18,
      marginHorizontal: 8,
   },
   menuOptionContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
   },
});

export default WebGeneralHeader;