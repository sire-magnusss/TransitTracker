import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function DriverDashboard() {
  const [online, setOnline] = useState(false);
  const [tripStarted, setTripStarted] = useState(false);
  const [tripCount, setTripCount] = useState(0);
  const [tripAmount, setTripAmount] = useState(0);
  const [tripData, setTripData] = useState([]);

  const handleOnlineToggle = () => {
    setOnline(!online);
    // Save trip data for the day when going offline
    if (online) {
      saveTripDataForDay();
    }
  };

  const handleTripToggle = () => {
    if (tripStarted) {
      setTripCount(tripCount + 1);
      setTripAmount(tripAmount + Math.random() * 100);
    }
    setTripStarted(!tripStarted);
  };

  const saveTripDataForDay = () => {
    const today = new Date().toLocaleDateString();
    const newTripData = [...tripData];
    const existingDayIndex = newTripData.findIndex(
      (item) => item.date === today
    );
    if (existingDayIndex !== -1) {
      // If data for today already exists, update it
      newTripData[existingDayIndex].trips += tripCount;
      newTripData[existingDayIndex].amount += tripAmount;
    } else {
      // If data for today doesn't exist, add it
      newTripData.push({ date: today, trips: tripCount, amount: tripAmount });
    }
    setTripData(newTripData);
    // Reset trip count and amount for the next day
    setTripCount(0);
    setTripAmount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DASHBOARD</Text>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.toggleButton, online ? styles.activeToggle : null]}
          onPress={handleOnlineToggle}
        >
          <Text style={styles.toggleText}>{online ? "Online" : "Offline"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            tripStarted ? styles.activeToggle : null,
          ]}
          onPress={handleTripToggle}
        >
          <Text style={styles.toggleText}>
            {tripStarted ? "Finish Trip" : "Start Trip"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statText}>Trips Taken</Text>
          <Text style={styles.statValue}>{tripCount}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statText}>Money Made</Text>
          <Text style={styles.statValue}>P{tripAmount.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveTripDataForDay}>
        <Text style={styles.saveButtonText}>Save Data</Text>
      </TouchableOpacity>
      <View style={styles.tripDataContainer}>
        <Text style={styles.tripDataTitle}>Trip Data</Text>
        {tripData.map((item, index) => (
          <View key={index} style={styles.tripDataRow}>
            <Text>Date: {item.date}</Text>
            <Text>Trips: {item.trips}</Text>
            <Text>Money: P{item.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 40,
    textAlign: "center",
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: "#90D26D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: "#CCC",
  },
  toggleText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCC",
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  stat: {
    alignItems: "center",
  },
  statText: {
    color: "#333",
    fontSize: 16,
    marginBottom: 5,
  },
  statValue: {
    color: "#90D26D",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#90D26D",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tripDataContainer: {
    marginTop: 20,
  },
  tripDataTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  tripDataRow: {
    marginBottom: 5,
  },
});

export default DriverDashboard;
