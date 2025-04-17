import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Index = () => {

  const handleLogin = () => {
    alert("Pressed button to log in.");
  };

  const handleSignup = () => {
    alert("Pressed button to sign up.");
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
