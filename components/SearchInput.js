import { View, TextInput, Pressable, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

function SearchInputComponent({ onChangeText, value, onSearch }) {
  return (
    <View style={styles.rootContainer}>
      <TextInput
        placeholder="Search for route"
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={styles.iconContainer}>
        <Pressable style={styles.pressable} onPress={onSearch}>
          <Icon name="search" size={20} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  searchInput: {
    width: "80%",
    padding: 20,
    borderRadius: 18,
    height: 60,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  pressable: {
    padding: 18,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    marginLeft: 10,
    backgroundColor: "#9BCF53",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchInputComponent;
