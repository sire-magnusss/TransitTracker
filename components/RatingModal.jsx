import React, { useState } from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function RatingModal({ isVisible, onRate }) {
  const [rating, setRating] = useState(0);

  const handleRate = (star) => {
    setRating(star);
    onRate(star); // Pass the selected rating to the parent component
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.ratePrompt1}>You have arrived !</Text>
          <Text style={styles.ratePrompt}> Please Rate the experience.</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRate(star)}
                style={styles.star}
              >
                <AntDesign
                  name={rating >= star ? "star" : "staro"}
                  size={24}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  ratePrompt: {
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  ratePrompt1: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
});

export default RatingModal;
