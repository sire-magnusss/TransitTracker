import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const screenHeight = Dimensions.get("window").height;

const BottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetPosition = useSharedValue(screenHeight); // starts off-screen

  const bottomSheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bottomSheetPosition.value }],
    };
  });

  const toggleBottomSheet = () => {
    console.log("Toggling BottomSheet, currently open:", isOpen);
    bottomSheetPosition.value = withSpring(
      isOpen ? screenHeight : screenHeight / 2
    );
    setIsOpen(!isOpen);
  };

  return (
    <Animated.View style={[styles.bottomSheet, bottomSheetAnimatedStyle]}>
      <TouchableOpacity style={styles.notch} onPress={toggleBottomSheet}>
        <Text style={styles.notchText}>
          {isOpen ? "Swipe down to close" : "Swipe up to open"}
        </Text>
      </TouchableOpacity>
      <View style={styles.content}>
        {/* Content of the BottomSheet */}
        <Text>Place your content here!</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height: screenHeight / 2,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  notch: {
    alignSelf: "center",
    width: 40,
    height: 5,
    backgroundColor: "grey",
    borderRadius: 2.5,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notchText: {
    textAlign: "center",
    color: "grey",
  },
});

export default BottomSheet;
