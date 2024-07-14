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
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";
import { Link } from "expo-router";
import IconButton from "./IconButton";

const CIRCLE_SIZE = 100;

interface MainRowActionsProps {
  handleTakePicture: () => void;
  handleMediaLibraryRequest: () => void;
  handleSelectPictureAsset: (uri: string) => void;
  cameraMode: CameraMode;
}
export default function MainRowActions({
  cameraMode,
  handleTakePicture,
  handleSelectPictureAsset,
  handleMediaLibraryRequest,
}: MainRowActionsProps) {

  const [assets, setAssets] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();

    // Recents album
    const albumAssets = await getAssetsAsync({
      album: fetchedAlbums.find((album) => album.title === "Recentsd"),
      mediaType: "photo",
      sortBy: "creationTime",
      first: 2,
    });
    setAssets(albumAssets.assets);
  }

  return (
    <View style={[styles.bottomLeftContainer, styles.centerContainer]}>
      <View style={styles.bottomLeftContainer}>
        <FlatList
          data={assets}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPictureAsset(item.uri)}>
              <Image 
                key={item.id}
                source={item.uri}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 5,
                }}
              />
            </TouchableOpacity>
          )}
          horizontal
          contentContainerStyle={{ gap: 6 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={handleTakePicture}>
          <Ionicons
              size={CIRCLE_SIZE}
              name="scan-circle-outline"
              color={"white"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomLeftContainerLib}>
        <TouchableOpacity onPress={handleMediaLibraryRequest}>
          <IconButton androidName="add" iosName="add" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    position: "absolute",
    bottom: 20,
  },
  bottomLeftContainerLib: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    position: "absolute",
    bottom: 20,
  },  
  bottomLeftContainer: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    position: "absolute",
    bottom: 20,
  },
});