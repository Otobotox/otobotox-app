import { Button, StyleSheet, Text, TouchableOpacity, View , Image, Platform } from 'react-native';
import { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';

export default function Process() {
  const [facing, setFacing] = useState(CameraType.back);
  const [torch, setTorch] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleTorch() {
    setTorch(current => (current === false ? true : false));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} enableTorch={torch}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.button} onPress={toggleTorch}>
            <Text style={styles.text}>Torch</Text>
          </TouchableOpacity>    
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    margin: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});