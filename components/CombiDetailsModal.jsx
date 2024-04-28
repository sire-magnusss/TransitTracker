import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

const CombiDetailsModal = ({ visible, onClose, combi }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={20} color={"white"} />
          </TouchableOpacity>
          <Image source={combi.photo} style={styles.image} />
          <View style={styles.detailsView}>
            <Text style={styles.modalText}>Driver: {combi.driverName}</Text>
            <Text style={styles.modalText}>Make: {combi.make}</Text>
            <Text style={styles.modalText}>Plate: {combi.plate}</Text>
            <Text style={styles.modalText}>ETA: {combi.eta}</Text>
            <Text style={styles.modalText}>
              {combi.isFull ? "Full" : "Seats Available"}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "#D11A2A",
    borderRadius: 14,
    position: "absolute",
    right: 12,
    top: 10,
    padding: 11,
  },
  image: {
    resizeMode: "contain",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "800",
  },
});

export default CombiDetailsModal;
