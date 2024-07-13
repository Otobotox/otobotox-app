import * as React from "react";
import { SafeAreaView, View } from "react-native";

import {
  BarcodeScanningResult,
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import MainRowActions from "@/components/MainRowActions";
import PictureView from "@/components/PictureView";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import CameraTools from "@/components/CameraTools";
import * as WebBrowser from "expo-web-browser";

export default function Process() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">(
    "back"
  );
  const [cameraZoom, setCameraZoom] = React.useState<number>(0);
  const [picture, setPicture] = React.useState<string>(""); // "https://picsum.photos/seed/696/3000/2000"

 // const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  async function handleTakePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current?.takePictureAsync();
      const response = await fetch(photo!.uri);
      console.log(photo!.uri)
      setPicture(photo!.uri)
      const filename = photo!.uri.substring(photo!.uri.lastIndexOf('/') + 1);
      console.log(filename)
    }
  }

  if (picture) return <PictureView picture={picture} setPicture={setPicture} />;

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}
      style={{ flex: 1 }}
    >
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={cameraFacing}
        mode={cameraMode}
        zoom={cameraZoom}
        enableTorch={cameraTorch}
        flash={cameraFlash}
        onCameraReady={() => console.log("camera is ready")}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 6 }}>
            <CameraTools
              cameraZoom={cameraZoom}
              cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              setCameraZoom={setCameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraTorch={setCameraTorch}
              setCameraFlash={setCameraFlash}
            />
            <MainRowActions
              handleTakePicture={handleTakePicture}
              cameraMode={cameraMode}
            />
          </View>
        </View>
      </CameraView>
    </Animated.View>
  );
}