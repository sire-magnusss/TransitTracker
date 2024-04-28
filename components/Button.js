import { Pressable, Text, StyleSheet } from "react-native";

function Button({ color, displayText, onPressHandler, style }) {
  return (
    <Pressable
      onPress={onPressHandler}
      style={[styles.button, { backgroundColor: color }, style]}
    >
      <Text style={styles.text}>{displayText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
  },
});

export default Button;
