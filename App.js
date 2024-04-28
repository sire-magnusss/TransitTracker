import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/RiderLogin";
import RouteSelectionScreen from "./screens/RouteSelectionScreen";
import MapComponent from "./components/MapComponent";
import DriverKYCScreen from "./screens/DriverKYCScreen";
import SignUpScreen from "./screens/SignUpScreen";
import RideConfirmModal from "./components/OnBoardItems/RideConfirmModal";
import CombiDetailsModal from "./components/CombiDetailsModal";
import BottomSheet from "./components/Enroute/BottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function RouteSelectionDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen
        name="RouteSelection"
        component={RouteSelectionScreen}
        options={{ title: "Select Route" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return <MapComponent />;
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="SignUpScreen"
  //         component={SignUpScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="LoginScreen"
  //         component={LoginScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="MapScreen"
  //         component={MapComponent}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="RouteSelectionScreen"
  //         component={RouteSelectionDrawer}
  //         options={{ headerShown: false }}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}
