import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function Dropdownmenu({ routes, onSelect }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (routes && routes.length > 0) {
      const routeItems = routes.map((route) => ({
        label: route.name,
        value: route.name,
      }));
      setItems(routeItems);
    }
  }, [routes]);

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
      zIndex={3000}
      dropDownDirection="BOTTOM"
      onChangeValue={(value) => {
        setValue(value);
        onSelect(value); // Send selected route to parent component
      }}
      scrollViewProps={{}}
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
