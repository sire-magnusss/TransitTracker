import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../assets/images/LogoTransitTracker.png";
import { signIn } from "../lib/appwrite";
import { ScrollView } from "react-native";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    setLoading(true);

    try {
      const session = await signIn(email, password);
      setLoading(false);
      navigation.navigate("Drawer", { screen: "RouteSelection" });
    } catch (error) {
      setLoading(false);
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 5}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.emailContainer}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
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
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={styles.registerText}>Not registered? Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Control the layout of ScrollView children
    alignItems: "center", // Control the layout of ScrollView children
    paddingVertical: 20,
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
    marginBottom: 15,
    elevation: 1.2,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: 5,
  },
  forgotPasswordText: {
    color: "#607274",
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
    marginVertical: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  registerText: {
    fontWeight: "bold",
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
  },
  buttonPressed: {
    opacity: 0.4,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default LoginScreen;
