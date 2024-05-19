import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/RiderLogin";
import RouteSelectionScreen from "./screens/RouteSelectionScreen";
import MapComponent from "./components/MapComponent";
import ModeScreen from "./screens/ModeScreen";
import HelpScreen from "./screens/HelpScreen";
import HistoryScreen from "./screens/HistoryScreen";
import RatingScreen from "./screens/RatingsScreen";
import DriverKYCScreen from "./screens/DriverKYCScreen";
import DriverDashboard from "./screens/DriverDashboard";

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
      <Drawer.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{ title: "Help Screen" }}
      />
      <Drawer.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ title: "History Screen" }}
      />
      <Drawer.Screen
        name="RatingsScreen"
        component={RatingsScreen}
        options={{ title: "Ratings Screen" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  // return <DriverKYCScreen />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Drawer"
          component={RouteSelectionDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ModeScreen"
          component={ModeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverKYCScreen"
          component={DriverKYCScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverDashboard"
          component={DriverDashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
