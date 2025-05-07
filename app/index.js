import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform, Image, Dimensions } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import WebFooter from "../components/webFooter";

const Index = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/LoginPage");
  };

  const handleSignup = () => {
    router.push("/Signup");
  };

  const handleLandingPage = () => {
    router.push("/landing");
  };

  const imageMap = {
    "addSubject.png": require("../assets/images/addSubject.png"),
    "loggingObservation.png": require("../assets/images/loggingObservation.png"),
    "settingGoal.png": require("../assets/images/settingGoal.png"),
    "creatingTreatmentPlan.png": require("../assets/images/creatingTreatmentPlan.png"),
  };

  const ActionCard = ({ image, number, title, description }) => {
    return (
      <View style={styles.cardContainer}>
        <Image
          source={imageMap[image]}
          style={styles.stepImage}
          resizeMode="contain"
        />
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>{number}. {title}</Text>
          <Text style={styles.stepText}>{description}</Text>
        </View>
      </View>
    );
  };

  if (Platform.OS === "web") {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <View>
              <Image
                source={require("../assets/images/Habitude-White-Logo.png")}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <View>
              <Text style={styles.introTitle}>Welcome to Habitude!</Text>
              <Text style={styles.introDescription}>Make a subject's behaviorial patterns easier to understand over time and make progress towards better habits.</Text>
            </View>

            <View style={styles.rowButtons}>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Get Started</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleLandingPage}>
                <Text style={styles.loginButtonText}>Temporary Landing Page</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.stepContentContainer}>
            <ActionCard image="addSubject.png" number="1" title="Create Subjects" description="" />
            <ActionCard image="loggingObservation.png" number="2" title="Log Observations" description="" />
            <ActionCard image="settingGoal.png" number="3" title="Set Goals" description="" />
            <ActionCard image="creatingTreatmentPlan.png" number="4" title="Improve Behavior" description="" />
            </View>
          </View>

          <WebFooter />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Welcome to Habitude</Text>

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
}



const screenWidth = Dimensions.get("window").width;
const isSmallScreen = screenWidth < 768;
const logoWidth = screenWidth < 500 ? 120 : 300;
const horizontalWidth = screenWidth < 768 ? 7 : 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    minHeight: "100%",
  },
  headerContainer: {
    backgroundColor: "#152A51",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: `${horizontalWidth}%`,
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.5)",
    zIndex: 2,
  },
  headerLogo: {
    width: logoWidth,
    height: undefined,
    marginVertical: 8,
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "14%",
    paddingVertical: 50,
  },
  introTitle: {
    color: "#152A51",
    fontWeight: "bold",
    fontSize: 48,
    marginBottom: 15,
    textAlign: "center",
  },
  introDescription: {
    color: "#152A51",
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 20,
    width: "80%",
  },
  loginButton: {
    backgroundColor: "#DFE7F6",
    borderColor: "#152A51",
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 165,
    height: 70,
    justifyContent: "center",
    marginRight: 20,
  },
  loginButtonText: {
    color: "#152A51",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 8,
  },
  signupButton: {
    backgroundColor: "#3265C3",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 165,
    height: 70,
    justifyContent: "center",
  },
  signupButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 8,
  },
  cardContainer: {
    marginHorizontal: "4%",
  },
  stepImage: {
    width: 75,
    height: 75,
    marginBottom: 10,
    alignSelf: "center",
  },
  stepContentContainer: {
    marginTop: 50,
    justifyContent: "center",
    flexDirection: "row",
  },
  stepContent: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#152A51",
    marginBottom: 5,
    textAlign: "center",
  },
  stepText: {
    fontSize: 16,
    color: "#152A51",
    textAlign: "center",
    paddingHorizontal: 10,
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
