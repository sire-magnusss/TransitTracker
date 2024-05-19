import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      driver: "John Bontsi",
      plateNumber: "B 123 BYE",
      route: "Tlokweng Route 5",
    },
    {
      id: 2,
      driver: "Jane Dudu",
      plateNumber: "B 456 BWS",
      route: "Block 8 Route 4",
    },
    {
      id: 3,
      driver: "Bakang Smith",
      plateNumber: "B 456 BUF",
      route: "Block 8 Route 4",
    },
    {
      id: 4,
      driver: "Goabaone Samson",
      plateNumber: "B 456 BJH",
      route: "Block 8 Route 4",
    },
    {
      id: 5,
      driver: "Jorothan Mokgwetsi",
      plateNumber: "B 456 BIS",
      route: "Block 8 Route 4",
    },
    {
      id: 6,
      driver: "Jack Phuthego",
      plateNumber: "B 456 BWA",
      route: "Block 8 Route 4",
    },
    {
      id: 7,
      driver: "Bame Spiro",
      plateNumber: "B 456 BFV",
      route: "Block 8 Route 4",
    },
    {
      id: 8,
      driver: "Magatalena Motse",
      plateNumber: "B 456 BGC",
      route: "Block 8 Route 4",
    },
  ]);
  const [filteredData, setFilteredData] = useState(historyData);

  const handleFilter = (route) => {
    if (route === "All") {
      setFilteredData(historyData);
    } else {
      const filtered = historyData.filter((item) => item.route === route);
      setFilteredData(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HISTORY</Text>
        <TouchableOpacity
          onPress={() => handleFilter("All")}
          style={styles.filterIcon}
        >
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.containers}>
            <View style={styles.itemContainer}>
              <Text style={styles.item}>Driver: {item.driver}</Text>
              <Text style={styles.item}>Plate Number: {item.plateNumber}</Text>
              <Text style={styles.item}>Route: {item.route}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#90D26D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 90,
  },
  filterIcon: {
    padding: 5,
  },
  containers: {
    borderWidth: 4,
    borderColor: "#90d26d",
    borderRadius: 5,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 5,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HistoryScreen;
