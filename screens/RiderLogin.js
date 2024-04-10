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

import MontFontText from "../components/MontFontText";

function LoginScreen() {
  [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://logowik.com/content/uploads/images/transit-app5842.jpg",
          }}
          style={styles.logo}
        />
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
      >
        <Text style={styles.buttonText}> Login</Text>
      </Pressable>

      <TouchableOpacity>
        <MontFontText>Not registered? Sign Up</MontFontText>
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
    padding: 20,
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
    padding: 20,
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
    color: "white",
    fontSize: 20,
  },
  buttonPressed: {
    opacity: 0.8,
  },

  logo: {
    width: 200,
    height: 100,
  },
});

export default LoginScreen;
