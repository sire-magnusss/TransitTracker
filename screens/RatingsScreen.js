// RatingScreen.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Dropdownmenu from "../components/DropDownMenu";
import { MaterialIcons } from "@expo/vector-icons";

const RatingsScreen = () => {
  // Hard-coded data for history of accepted combis
  const historyData = [
    {
      id: 1,
      driver: "John Bontsi",
      plateNumber: "B 123 BYE",
      route: "Tlokweng Route 6",
    },
    {
      id: 2,
      driver: "Jane Dudu",
      plateNumber: "B 456 BWS",
      route: "Block 8 Route 3",
    },
    {
      id: 3,
      driver: "Bakang Smith",
      plateNumber: "B 456 BUF",
      route: "Kgale View Route 3",
    },
    {
      id: 4,
      driver: "Goabaone Samson",
      plateNumber: "B 456 BJH",
      route: "Tlokweng Route 3",
    },
    {
      id: 5,
      driver: "Jorothan Mokgwetsi",
      plateNumber: "B 456 BIS",
      route: "Mogoditshane Route 4",
    },
    {
      id: 6,
      driver: "Jack Phuthego",
      plateNumber: "B 456 BWA",
      route: "Tlokweng Route 6",
    },
    {
      id: 7,
      driver: "Bame Spiro",
      plateNumber: "B 456 BFV",
      route: "Block 8 Route 4",
    },
  ];

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeData, setRouteData] = useState([]);

  const dummyData = {
    "Tlokweng Route 6": [
      {
        id: "Tlokweng Route 6-1",
        driver: "Tumelo Dintlha",
        plateNumber: "B 874 BEN",
        vehicleType: "Combi",
        rating: 5.0,
      },
      {
        id: "Tlokweng Route 6-2",
        driver: "Phenyo Molena",
        plateNumber: "B 278 BAC",
        vehicleType: "Combi",
        rating: 3.4,
      },
      {
        id: "Tlokweng Route 6-3",
        driver: "Mmilile Thabo",
        plateNumber: "B 304 BAC",
        vehicleType: "Combi",
        rating: 3.8,
      },
    ],
    "Block 8 Route 3": [
      {
        id: "Block 8 Route 3-1",
        driver: "Mphoyaone Dineo",
        plateNumber: "B 456 BAC",
        vehicleType: "Combi",
        rating: 4.2,
      },
      {
        id: "Block 8 Route 3-2",
        driver: "Kamogelo Parker",
        plateNumber: "B 301 BAB",
        vehicleType: "Combi",
        rating: 4.6,
      },
      {
        id: "Block 8 Route 3-3",
        driver: "Neo Mophatla",
        plateNumber: "B 434 BTW",
        vehicleType: "Combi",
        rating: 4.9,
      },
    ],
    "Kgale View Route 3": [
      {
        id: "Kgale View Route 3-1",
        driver: "Tuduetso Renei",
        plateNumber: "B 456 BAC",
        vehicleType: "Combi",
        rating: 4.2,
      },
      {
        id: "Kgale View Route 3-2",
        driver: "Duncan Thobo",
        plateNumber: "B 301 BAB",
        vehicleType: "Combi",
        rating: 2.6,
      },
      {
        id: "Kgale View Route 3-3",
        driver: "Morua Patlo",
        plateNumber: "B 434 BTW",
        vehicleType: "Combi",
        rating: 4.3,
      },
    ],
  };

  useEffect(() => {
    if (selectedRoute) {
      setRouteData(dummyData[selectedRoute] || []); // Set to empty array if no data found for the selected route
    } else {
      setRouteData([]); // Reset route data if no route is selected
    }
  }, [selectedRoute]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RATING</Text>
      <Dropdownmenu
        routes={historyData.map((item) => ({
          id: item.route,
          name: item.route,
        }))}
        onSelect={(route) => setSelectedRoute(route)}
      />
      <FlatList
        data={routeData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>Driver: {item.driver}</Text>
            <Text style={styles.item}>Plate Number: {item.plateNumber}</Text>
            <Text style={styles.item}>Vehicle Type: {item.vehicleType}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>Rating:</Text>
              <MaterialIcons name="star" size={20} color="#ffd700" />
              <Text style={styles.ratingValue}>{item.rating}</Text>
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
    backgroundColor: "#90D26D",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000000",
  },

  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 5,
  },
  ratingValue: {
    fontSize: 16,
    color: "#ffd700",
  },
});

export default RatingsScreen;
