import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../assets/images/LogoTransitTracker.png";
import { createUser } from "../lib/appwrite"; // Ensure this path is correct based on your project structure

function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const result = await createUser(username, email, password);
      setIsLoading(false); // Stop loading once the request is done
      if (result) {
        navigation.navigate("ModeScreen");
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      setIsLoading(false); // Ensure loading is stopped if there's an error
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <TextInput
        style={[styles.input, styles.inputField]}
        placeholder="Full Name"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, styles.inputField]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={[styles.input, styles.passwordInputContainer]}>
        <TextInput
          style={styles.flexInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.icon}
        >
          <Icon
            name={passwordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#607274"
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.input, styles.passwordInputContainer]}>
        <TextInput
          style={styles.flexInput}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={styles.icon}
        >
          <Icon
            name={confirmPasswordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#607274"
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "90%",
    marginBottom: 20,
  },
  inputField: {
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    padding: 10,
    elevation: 1.2,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    padding: 10,
    elevation: 1.2,
    position: "relative",
  },
  flexInput: {
    flex: 1,
  },
  button: {
    backgroundColor: "#90D26D",
    borderRadius: 11,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  logoContainer: {
    marginTop: 0,
    backgroundColor: "f0f0f0",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    overflow: "hidden",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  linkText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
