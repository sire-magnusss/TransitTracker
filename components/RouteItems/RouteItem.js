import { Text, StyleSheet, Pressable } from "react-native";

function RouteItem({ name }) {
  return (
    <Pressable style={styles.itemContainer}>
      <Text style={styles.itemText}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 17,
    marginVertical: 6,
    backgroundColor: "#F5F7F8",
    borderRadius: 8,
    width: "100%",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default RouteItem;
