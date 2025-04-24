import React, { useState } from "react";
import { useRouter } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { login as authLogin } from "../app/AuthService";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const loginButton = () => {
    let valid = true;


    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password cannot be empty.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      authLogin(email, password);
      router.push("/landing");
    }};

  const handleSignup = () => {
    alert("** Pressed button to sign up**");
  };



// Placeholder for future OAuth login

  const GoogleButton = () => {

    alert("** GoogleButton in Progress  **");
    // Proceed with login logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer} >
        <Text style={styles.formTitle}>Log in with</Text>


        <View style={styles.socialLogin}>
          <TouchableOpacity style={styles.socialButton} onPress={GoogleButton} >
            <Image         // Placeholder for future OAuth login
              source={require("../assets/images/google.png")}
              style={styles.socialIcon}
            />
            <Text>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/images/apple.png")}
              style={styles.socialIcon}
            />
            <Text>Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputField}
            placeholder="Email address"
            placeholderTextColor="#a385e0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            required
            // add Email required and EmailError
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            placeholderTextColor="#a385e0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            required
              // add password required and passwordError
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={loginButton}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

          <Text style={styles.signupText}>
            Don’t have an account?{" "}
            <Text style={styles.signupLink} onPress={handleSignup}>Signup now</Text>
          </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aqua",
    paddingHorizontal: 10,
  },
  loginContainer: {
    maxWidth: 410,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 24,
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 10 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 20,
    elevation: 5,
  },
  formTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 30,
  },
  socialLogin: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F9F8FF",
    borderColor: "#D5CBFF",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 12,
  },
  socialIcon: {
    width: 23,
    height: 23,
    marginRight: 8,
  },
  separatorContainer: {
    flexDirection: "row",
    marginVertical: 30,
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#bfb3f2",
  },
  separatorText: {
    textAlign: "center",
    marginHorizontal: 15,
    fontWeight: "500",
    fontSize: 17,
    color: "#333",
  },
  inputWrapper: {
    height: 54,
    marginBottom: 24,
    justifyContent: "center",
  },
  inputField: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
    borderColor: "#bfb3f2",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
  },
  icon: {
    position: "absolute",
    left: 15,
    color: "#a395e0",
  },
  forgotPassword: {
    color: "#5F41E4",
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  loginButton: {
    height: 54,
    backgroundColor: "#5F41E4",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  signupText: {
    marginTop: 28,
    textAlign: "center",
    fontWeight: "500",
  },
  signupLink: {
    color: "#5F41E4",
    fontWeight: "500",
    textDecorationLine: 'underline',
  },
});

export default LoginPage;