import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function DetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  return (
    <View>
      <Text>Detail Screen</Text>
      <Text>{id}</Text>
    </View>
  );
}
