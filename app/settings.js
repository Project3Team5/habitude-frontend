import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import WebGeneralHeader from "../components/webGeneralHeader";
import WebFooter from "../components/webFooter";

const Settings = () => {
  const router = useRouter();
  const scrollRef = useRef(null);

  const handleUpdateAccount = () => {
    alert("Pressed button to update own account.");
  };

  const handleDeleteAccount = () => {
    alert("Pressed button to delete own account.");
  };

  return (
    <MenuProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <WebGeneralHeader />
            <View style={styles.bodyContainer}>
              <Text style={styles.sectionTitle}>Settings</Text>

              <TouchableOpacity style={styles.button} onPress={handleUpdateAccount}>
                <Text style={styles.buttonText}>Update Account</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
                <Text style={styles.buttonText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
            {/* Footer */}
            <WebFooter />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </MenuProvider>
  );
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
  button: {
    backgroundColor: "#227755",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
  },
});

export default Settings;
