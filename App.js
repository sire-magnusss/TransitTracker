import LoginScreen from "./screens/RiderLogin";
import RouteSelectionScreen from "./screens/RouteSelectionScreen";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RouteSelectionScreen"
          component={RouteSelectionScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
