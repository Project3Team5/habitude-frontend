import React, { useState, useRef } from "react";
import { useRouter } from 'expo-router';
import {
    View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import WebFooter from "../components/webFooter";

const Signup = () => {
    const router = useRouter();
    const scrollRef = useRef(null);

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [createError, setCreateError] = useState("");

    const handleChange = (field, value) => {
        setUser(prev => ({ ...prev, [field]: value }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const GoogleButton = () => {
        alert("🔧 Google sign up coming soon.");
        // Proceed with sign up logic
    };

    const GitHubButton = () => {
        alert("🔧 GitHub sign up coming soon.");
        // Proceed with sign up logic
    };

    const handleSignup = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/users`, user);
            if (response.data) {
                router.push("/login");
            }
        } catch (error) {
            setCreateError("❌ Failed to create user.");
            console.error("Signup Error:", error);
        }
    };

    const signupButton = () => {
        let valid = true;

        if (!user.username.trim()) {
            setUsernameError("Username is required.");
            valid = false;
        } else {
            setUsernameError("");
        }

        if (!validateEmail(user.email)) {
            setEmailError("Please enter a valid email.");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!user.password.trim()) {
            setPasswordError("Password cannot be empty.");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (valid) {
            handleSignup();
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.bodyContainer}>
                        <Image source={require("../assets/images/Habitude-Top-Logo.png")} style={styles.logoIcon} resizeMode="contain" />
                        <View style={styles.loginContainer}>
                            <Text style={styles.formTitle}>Sign up with</Text>

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

                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={GitHubButton}
                                >
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
                                    placeholder="Username"
                                    placeholderTextColor="#a6a6a6"
                                    value={user.username}
                                    onChangeText={(text) => handleChange("username", text)}
                                    autoCapitalize="none"
                                />
                                {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
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
                                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                            </View>

                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Password"
                                    placeholderTextColor="#a6a6a6"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    value={user.password}
                                    onChangeText={(text) => handleChange("password", text)}
                                />
                                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                            </View>

                            {createError ? <Text style={styles.errorText}>{createError}</Text> : null}

                            <TouchableOpacity style={styles.loginButton} onPress={signupButton}>
                                <Text style={styles.loginText}>Sign up</Text>
                            </TouchableOpacity>

                            <Text style={styles.signupText}>
                                Already have an Account?{" "}
                                <TouchableOpacity onPress={() => router.push("/LoginPage")}>
                                    <Text style={styles.signupLink}>Log in</Text>
                                </TouchableOpacity>
                            </Text>
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
        elevation: 5,
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
    formTitle: {
        textAlign: "center",
        fontSize: 22,
        color: "#152A51",
        fontWeight: "600",
        marginBottom: 30,
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
    loginButton: {
        height: 54,
        backgroundColor: "#3265C3",
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
        textDecorationLine: 'underline',
    },
    logoIcon: {
        width: 120,
        height: 100,
    },
    errorText: {
        color: "red",
        marginTop: 4,
    },
});

export default Signup;