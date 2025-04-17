import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {

  const handleUpdateAccount = () => {
    alert("Pressed button to update own account.");
  };

  const handleDeleteAccount = () => {
    alert("Pressed button to delete own account.");
  };

  return (
    <View style={styles.container}>
      <Text>This is the Settings Page</Text>

      <TouchableOpacity style={styles.button} onPress={handleUpdateAccount}>
        <Text style={styles.buttonText}>Update Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
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

export default Settings;
