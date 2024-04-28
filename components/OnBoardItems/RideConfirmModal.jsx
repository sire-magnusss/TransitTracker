import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import Button from "../Button"; // Assuming Button is correctly imported from its path

const RideConfirmModal = ({ visible, onAccept, onDecline }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDecline} // Using onDecline directly for onRequestClose
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you boarding the combi?</Text>
          <View style={styles.buttonContainer}>
            <Button
              color="#F44336"
              displayText="Decline"
              onPressHandler={onDecline} // Passing the onDecline function
            />
            <Button
              color="#90D26D"
              displayText="Accept"
              onPressHandler={onAccept} // Passing the onAccept function
            />
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
    marginBottom: 20,
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
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
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "800",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginRight: 10,
  },
});

export default RideConfirmModal;
