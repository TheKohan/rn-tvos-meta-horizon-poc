import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // Changed from native-stack
import HomeScreen from "../screens/home";
import DetailScreen from "../screens/detail";

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: string };
};

const screens = [
  { name: "Home", component: HomeScreen },
  { name: "Detail", component: DetailScreen },
] as const;

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          id="RootStack"
          screenOptions={{
            headerShown: false,
          }}
        >
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name as keyof RootStackParamList}
              component={screen.component}
            />
          ))}
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
