import React from "react";
import { View, StyleSheet } from "react-native";
import { MetaQuestBackButton } from "./MetaQuestBackButton";
import { useNavigation } from "../navigation/useNavigation";
import { isMetaQuestDevice } from "../util/isMetaQuestDevice";

interface ScreenLayoutProps {
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  const navigation = useNavigation();

  const showMetaQuestBackButton = navigation.canGoBack() && isMetaQuestDevice();
  console.log("showMetaQuestBackButton", showMetaQuestBackButton);

  return (
    <View style={styles.container}>
      {children}
      {showMetaQuestBackButton && <MetaQuestBackButton />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
