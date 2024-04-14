import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import Logo from "../assets/images/LogoTransitTracker.png";

function LoginScreen({ navigation }) {
  [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.emailContainer}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.icon}
          >
            <Icon
              name={passwordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#cccccc"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation.navigate("RouteSelectionScreen")}
      >
        <Text style={styles.buttonText}> Login</Text>
      </Pressable>

      <TouchableOpacity>
        <Text>Not registered? Sign Up</Text>
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
  logoContainer: {
    marginTop: 0,
    backgroundColor: "f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    overflow: "hidden",
  },
  inputContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 1.2,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    margin: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 9,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    margin: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 9,
  },
  input: {
    width: "100%",
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: "#90D26D",
    borderRadius: 11,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
  },
  buttonPressed: {
    opacity: 0.4,
  },

  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});

export default LoginScreen;
