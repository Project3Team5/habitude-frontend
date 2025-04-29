import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/LoginPage");
  };

  const handleSignup = () => {
    router.push("/Signup");
    //alert("** (Work In Progress) Sign up Page **");
  };

  const handleLandingPage = () => {
    router.push("/landing");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to our app</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLandingPage}>
        <Text style={styles.buttonText}>Temporary Landing Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default Index;
