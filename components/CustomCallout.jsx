import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomCallout = ({ eta, isFull }) => {
  return (
    <View style={styles.calloutContainer}>
      <Text style={styles.etaText}>ETA: {eta}</Text>
      <Text style={styles.statusText}>
        {isFull ? "Full" : "Seats Available"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    width: 120, // Explicit width for a wider callout
    height: 90, // Explicit height, adjust as needed
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-evenly", // Ensure vertical spacing is even
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  etaText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  statusText: {
    fontSize: 14,
    color: "#007BFF",
  },
});

export default CustomCallout;
