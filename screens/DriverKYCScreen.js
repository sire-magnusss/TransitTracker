import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Input from "../components/DriverKYC/input";
import Button from "../components/Button";
import CameraImg from "../assets/images/cameraicon.png";
import Dropdownmenu from "../components/DriverKYC/dropdownmenu";

function DriverKYCScreen({ navigation }) {
  const [plateNumber, setPlateNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [route, setRoute] = useState("");
  const [photo, setPhoto] = useState(null);
  const [permitDocument, setPermitDocument] = useState(null);

  const handlePhotoUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please grant camera roll permissions to upload a photo."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      } else {
        console.log("result.assets is undefined:", result);
      }
    }
  };

  const handlePermitUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setPermitDocument(result.uri);
        Alert.alert("Success", "File uploaded successfully ✅");
      } else {
        console.log("User cancelled document picker");
      }
    } catch (err) {
      console.log("DocumentPicker Error: ", err);
    }
  };
  const handleSubmit = async () => {
    // This is where you would normally handle the submission
    // For demo purposes, you can simply log the data
    // console.log("Plate Number:", plateNumber);
    // console.log("Phone Number:", phoneNumber);
    // console.log("Route:", route);
    // console.log("Photo URI:", photo);
    // console.log("Permit Document URI:", permitDocument);

    // ToastAndroid.show("Save was successful", ToastAndroid.SHORT);
    navigation.navigate("DriverDashboard"); // Ensure correct screen name here
  };

  const renderPhotoInput = () => {
    if (photo) {
      return (
        <TouchableOpacity onPress={handlePhotoUpload}>
          <Image
            source={{ uri: photo }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.photoInput} onPress={handlePhotoUpload}>
          <Text style={styles.photoinputText}>Upload Photo</Text>
          <Image
            source={CameraImg}
            style={[
              styles.camera,
              { width: 50, height: 50, resizeMode: "contain" },
            ]}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.title}>Driver KYC</Text>
      <View style={styles.inputsContainer}>
        {renderPhotoInput()}

        <Text style={styles.label}>Select Route</Text>
        <Dropdownmenu onValueChange={setRoute} />

        <Input
          placeholder="Enter your plate number"
          prompttext="Plate Number"
          value={plateNumber}
          onChangeText={setPlateNumber}
        />
        <Input
          placeholder="Enter your phone number"
          prompttext="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>Permit Document</Text>
        <TouchableOpacity style={styles.uploadpdf} onPress={handlePermitUpload}>
          <Text style={{ color: "#cccccc" }}>Upload Permit Document</Text>
          <Image
            source={{
              uri: "https://cdn3d.iconscout.com/3d/premium/thumb/pdf-file-5684008-4734972.png",
            }}
            style={{ width: 40, height: 40, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.configbutton, { backgroundColor: "#90D26D" }]}
        onPress={handleSubmit}
      >
        <Text style={{ color: "black", fontSize: 20, fontWeight: 800 }}>
          Save
        </Text>
      </TouchableOpacity>
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
    backgroundColor: "#90D26D",

    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  label: {
    marginHorizontal: 11,
    marginBottom: 5,

    fontSize: 15,
    fontWeight: "700",
  },
});

export default DriverKYCScreen;
