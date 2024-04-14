import { FlatList, View, StyleSheet, Text } from "react-native";
import RouteItem from "./RouteItem";

function RouteOptionsList({ routes }) {
  if (!routes || routes.length === 0) {
    return <Text style={styles.noResultsText}>No routes found.</Text>;
  }

  return (
    <FlatList
      style={styles.container}
      data={routes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RouteItem name={item.name} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginTop: 5,
    borderRadius: 7,
    width: "100%",
    paddingHorizontal: 9,
    backgroundColor: "#9BCF53",
  },
});

export default RouteOptionsList;
