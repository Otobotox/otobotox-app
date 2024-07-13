import * as React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraMode } from "expo-camera";

const CIRCLE_SIZE = 90;

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
}
export default function MainRowActions({
  cameraMode,
  handleTakePicture,
}: MainRowActionsProps) {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTakePicture}>
        <Ionicons
            size={CIRCLE_SIZE}
            name="car-sport-sharp"
            color={"white"}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    position: "absolute",
    bottom: 100,
  },
});