import { TextInput, Text, View, StyleSheet } from "react-native";

function Input({ placeholder, prompttext }) {
  return (
    <View style={styles.container}>
      <Text style={styles.prompttext}>{prompttext}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 2,
    marginBottom: 9,
  },
  prompttext: {
    marginBottom: 5,
    left: 6,
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C7C8CC",
    padding: 11,
    borderRadius: 10,
    marginLeft: 1,
  },
});

export default Input;
