import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, StyleSheet } from "react-native";

function Dropdownmenu() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Tlokweng Route 6", value: "tlokweng6" },
    { label: "Tlokweng Route 4", value: "tlokweng4" },
    { label: "Tlokweng Route 1", value: "tlokweng1" },
  ]);

  return (
    <DropDownPicker
      style={styles.picker}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Select a route"
      zIndex={3000} // Ensuring it renders on top of other elements
      dropDownDirection="BOTTOM" // Opens dropdown towards the bottom
    />
  );
}

const styles = StyleSheet.create({
  picker: {
    marginBottom: 7,
    borderColor: "#cccccc",
  },
});
export default Dropdownmenu;
