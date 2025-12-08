import { RootStackParamList } from "./navigator";
import { useNavigation as useNavigationNative } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useNavigation = () => {
  return useNavigationNative<NativeStackNavigationProp<RootStackParamList>>();
};
