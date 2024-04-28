import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  View,
} from "react-native";

import Input from "../components/DriverKYC/input";

import Icon from "react-native-vector-icons/FontAwesome";

import Button from "../components/Button";

import CameraImg from "../assets/images/cameraicon.png";

import Dropdownmenu from "../components/DriverKYC/dropdownmenu";

function DriverKYCScreen() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.title}>Driver KYC</Text>
      <View style={styles.inputsContainer}>
        <TouchableOpacity style={styles.photoInput}>
          <Text style={styles.photoinputText}>Upload Photo</Text>
          {/* <Icon style={styles.camera} name="camera" size={20} /> */}
          <Image
            source={CameraImg}
            style={[
              styles.camera,
              { width: 50, height: 50, resizeMode: "contain" },
            ]}
          />
        </TouchableOpacity>

        <Text
          style={{
            marginHorizontal: 11,
            marginBottom: 5,
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          Select Route
        </Text>

        <Dropdownmenu />

        <Input
          placeholder="Enter your plate number"
          prompttext="Plate Number"
        />
        <Input
          placeholder="Enter your phone number"
          prompttext="Phone Number"
        />
        <Text
          style={{
            marginHorizontal: 11,
            marginBottom: 5,
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          Permit Document
        </Text>
        <TouchableOpacity style={styles.uploadpdf}>
          <Text style={{ color: "#cccccc" }}>Upload Permit Document</Text>

          <Image
            source={{
              uri: "https://cdn3d.iconscout.com/3d/premium/thumb/pdf-file-5684008-4734972.png",
            }}
            style={{ width: 40, height: 40, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
      <Button style={styles.configbutton} color="#90D26D" displayText="Save" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputsContainer: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEDEB",
    padding: 15,
    elevation: 0.9,
  },
  photoInput: {
    height: 120,
    backgroundColor: "#B4B4B8",
    width: "40%",
    borderWidth: 1,
    borderRadius: 120,
    borderColor: "#B4B4B8",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "relative",
  },
  photoinputText: {
    fontWeight: "800",
  },
  camera: {
    position: "absolute",
    top: 70,
    left: 80,
  },
  uploadpdf: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 13,
    height: 55,
    marginLeft: 5,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
  },
  configbutton: {
    marginTop: 10,
  },
});
export default DriverKYCScreen;
