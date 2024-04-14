import { StyleSheet, View, Text, Platform, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInputComponent from "../components/SearchInput";
import RouteOptionsList from "../components/RouteItems/RouteOptionsList";

import CombiImg from "../assets/images/combiimage.png";
import { useState } from "react";
import routes from "../data/routes";

function RouteSelectionScreen() {
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

  function onPressHandler() {
    filterRoutes(searchQuery);
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              tw`font-bold text-black `,
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
          onSearch={onPressHandler}
        />

        <View style={styles.operationalHoursContainer}>
          <Text style={styles.operationHoursText}>
            Operational Hours{" "}
            <Text style={styles.hoursRange}>6:00 am - 8:00pm</Text>
          </Text>
        </View>

        <RouteOptionsList routes={filteredRoutes} />
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
});

export default RouteSelectionScreen;
