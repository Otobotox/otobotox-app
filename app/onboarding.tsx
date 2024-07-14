import { Image, StyleSheet, Platform, Button, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {

    // Permissions Declerations   
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = usePermissions({
        // _Android_ Only ask photo/video access i.e. no music access
        granularPermissions: ['photo'], 
    });

    // Main
    const handleContinue = async () => {
        const allPermissionsGranted = await requestAllPermissions();
        if (allPermissionsGranted) {
            // navigate to tabs
            router.replace("/(tabs)");
        } else {
            Alert.alert("To continue please provide permissions in settings");
        }
    };

    async function requestAllPermissions() {

        const cameraStatus = await requestCameraPermission();
        if (!cameraStatus.granted) {
            Alert.alert("Error", "Camera permission is required.");
            return false;
        }

        const mediaLibraryStatus = await requestMediaLibraryPermission();
        if (!mediaLibraryStatus.granted) {
            Alert.alert("Error", "Media Library permission is required.");
            return false;
        }

        // only set to true once user provides permissions
        // this prevents taking user to home screen without permissions
        await AsyncStorage.setItem("hasOpened", "true");
        return true;
    }

    return (
        <ParallaxScrollView
        headerBackgroundColor={{
            light: Colors.light.snapPrimary + 10,
            dark: Colors.light.snapPrimary + 10,
        }}
        headerImage={ 
            <Image
                source={require("@/assets/images/logo.jpeg")}
                style={styles.reactLogo}
            />
        }
        >
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Otobotox App!</ThemedText>
            <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
            <ThemedText>
            Hello colleagues! This app requires the following permissions:
            </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Camera Permissions</ThemedText>
            <ThemedText>🎥 For taking pictures of the Car Plate or Chasis Number as well as the order request forms.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Media Library Permissions</ThemedText>
            <ThemedText>📸 To save/view your images to your media library. </ThemedText>
        </ThemedView>
        <Button title="Continue" onPress={handleContinue} />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});