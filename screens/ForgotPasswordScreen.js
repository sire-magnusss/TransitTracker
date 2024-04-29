import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const ForgotPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPassword = () => {
    if (password.length < 5) {
      Alert.alert("Error", "Password must be at least 5 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Passwords do not match. Please re-enter your passwords."
      );
      setConfirmPassword("");
      return;
    }

    // Passwords match and meet requirements, proceed with saving the password
    // Add your logic here to save the password
    Alert.alert("Success", "Password updated successfully.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Your Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPassword}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "900",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: "#90D26D",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
