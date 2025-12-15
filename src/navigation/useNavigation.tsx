import { RootStackParamList } from "./navigator";
import { useNavigation as useNavigationNative } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // Changed from native-stack

export const useNavigation = () => {
  return useNavigationNative<StackNavigationProp<RootStackParamList>>();
};
