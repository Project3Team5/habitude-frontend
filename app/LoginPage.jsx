import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import axios from "axios"; // ✅ Import axios
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import WebFooter from "../components/webFooter";

const LoginPage = () => {
  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const scrollRef = useRef(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // DOESN'T CURRENTLY WORK (NEED TO ADD LOGIN API ENDPOINT TO BACKEND)
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/login`,
        user
      );

      if (response.data) {
        router.push("/landing");
      } else {
        alert("Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("❌ Failed to log in.");
    }
  };

  const loginButton = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(user.email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }

    if (!user.password) {
      setPasswordError("Password cannot be empty.");
      valid = false;
    }

    if (valid) {
      handleLogin();
    }
  };

  const GoogleButton = () => {
    alert("🔧 Google login coming soon.");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.bodyContainer}>
            <Image
              source={require("../assets/images/Habitude-Top-Logo.png")}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <View style={styles.loginContainer}>
              <Text style={styles.formTitle}>Log in with</Text>

              <View style={styles.socialLogin}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={GoogleButton}
                >
                  <Image
                    source={require("../assets/images/google.png")}
                    style={styles.socialIcon}
                    resizeMode="contain"
                  />
                  <Text>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={require("../assets/images/github.png")}
                    style={styles.socialIcon}
                    resizeMode="contain"
                  />
                  <Text>GitHub</Text>
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
                  placeholderTextColor="#a6a6a6"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={user.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Password"
                  placeholderTextColor="#a6a6a6"
                  secureTextEntry
                  value={user.password}
                  onChangeText={(text) => handleChange("password", text)}
                />
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
              </View>

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={loginButton}
              >
                <Text style={styles.loginText}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/Signup")}>
                <Text style={styles.signupText}>
                  Don’t have an account?{" "}
                  <Text style={styles.signupLink}>Signup now</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <WebFooter />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  loginContainer: {
    maxWidth: 450,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 24,
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
    elevation: 5,
  },
  formTitle: {
    textAlign: "center",
    fontSize: 22,
    color: "#152A51",
    fontWeight: "600",
    marginBottom: 30,
  },
  socialLogin: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
  },
  logoIcon: {
    width: 120,
    height: 100,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F9F8FF",
    borderColor: "#a8bee7",
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
    backgroundColor: "#333",
  },
  separatorText: {
    textAlign: "center",
    marginHorizontal: 15,
    fontWeight: "500",
    fontSize: 17,
    color: "#152A51",
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
    borderColor: "#a8bee7",
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
    color: "#3265C3",
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  loginButton: {
    height: 54,
    backgroundColor: "#152A51",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 28,
    textAlign: "center",
    fontWeight: "500",
    color: "#152A51",
  },
  signupLink: {
    color: "#3265C3",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 13,
  },
});

export default LoginPage;
