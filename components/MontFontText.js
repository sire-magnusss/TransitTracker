import { Text, StyleSheet } from "react-native";

function MontFontText({ children, style, ...props }) {
  return <Text style={(styles.defaultStyle, style)}>{children}</Text>;
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: "Montserrat",
  },
});

export default MontFontText;
