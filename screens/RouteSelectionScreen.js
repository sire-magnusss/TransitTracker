import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import SafeViewAndroid from "../components/SafeViewAndroid";
import tw from "tailwind-react-native-classnames";
import SearchInputComponent from "../components/SearchInput";
import CombiImg from "../assets/images/combiimage.png";
import routes from "../data/routes";

function RouteSelectionScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState(routes);

  const filterRoutes = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredRoutes(routes);
    } else {
      const filtered = routes.filter((route) =>
        route.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRoutes(filtered);
    }
  };

  const handleRouteSelect = (route) => {
    navigation.navigate("MapScreen", { selectedRoute: route });
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              tw`font-bold text-black`,
              { fontSize: 27, marginRight: 25 },
            ]}
          >
            Select Route
          </Text>
          <Image
            source={CombiImg}
            style={{ width: 85, height: 85, resizeMode: "contain" }}
          />
        </View>

        <SearchInputComponent
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={() => filterRoutes(searchQuery)}
        />

        <View style={styles.operationalHoursContainer}>
          <Text style={styles.operationHoursText}>
            Operational Hours{" "}
            <Text style={styles.hoursRange}>6:00 am - 8:00pm</Text>
          </Text>
          <Text style={styles.fareText}>Public Transport Fare is P7.00</Text>
        </View>

        <View style={styles.listContainer}>
          {filteredRoutes.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={styles.routeItem}
              onPress={() => handleRouteSelect(route)}
            >
              <Text style={styles.routeText}>{route.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: "100%",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 23,
    paddingVertical: 10,
  },
  operationalHoursContainer: {
    alignSelf: "flex-end",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#EEEDED",
    borderRadius: 10,
  },
  operationHoursText: {
    fontSize: 13,
    fontStyle: "italic",
  },
  fareText: {
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 5,
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  routeItem: {
    backgroundColor: "#90D26D",
    shadowOpacity: 0.2,
    elevation: 3,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  routeText: {
    fontSize: 16,
    color: "#333",
  },
});

export default RouteSelectionScreen;
