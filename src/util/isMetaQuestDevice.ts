import ExpoHorizon from "expo-horizon-core";

export const isMetaQuestDevice = () => {
  return ExpoHorizon.isHorizonDevice;
};
