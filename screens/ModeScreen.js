import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

const ModeScreen = ({ navigation }) => {
  const handleRiderMode = () => {
    // Logic for handling rider mode
    console.log("Switching to Rider Mode");
    navigation.navigate("Drawer", { screen: "RouteSelection" });
  };

  const handleDriverMode = () => {
    // Logic for handling driver mode
    console.log("Switching to Driver Mode");
    navigation.navigate("DriverKYCScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you are a Rider or Driver?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRiderMode}>
          <Text style={styles.buttonText}>Rider Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDriverMode}>
          <Text style={styles.buttonText}>Driver Mode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    width: "90%",
    fontWeight: "800",
    marginBottom: 20,
    marginLeft: 18,
  },
  logoContainer: {
    marginBottom: 30,
  },
  buttonContainer: {
    justifyContent: "space-around",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#90D26D",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ModeScreen;
