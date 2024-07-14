import { Image } from "expo-image";
import { Alert, View } from "react-native";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

import * as React from "react";
import { Link, Stack } from "expo-router";
import { Button, ScrollView } from "react-native";

import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";

interface MediaLibraryViewProps {
    mediaLibraryMode: boolean;
    setMediaLibraryMode: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function MediaLibraryView({ mediaLibraryMode, setMediaLibraryMode }: MediaLibraryViewProps)  {

const [assets, setAssets] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync({
      includeSmartAlbums: true,
    });

    // Recents album
    const albumAssets = await getAssetsAsync({
      album: fetchedAlbums.find((album) => album.title === "Recentsd"),
      mediaType: "photo",
      sortBy: "creationTime",
    });
    setAssets(albumAssets.assets);
  }

  return (
    <View>
        <View
            style={{
                position: "absolute",
                zIndex: 1,
                paddingTop: 50,
                left: 6,
            }}
        >
            <IconButton 
                onPress={() => setMediaLibraryMode(false)}
                iosName="close"
                androidName="close"
            />
        </View>
        <ScrollView
            contentContainerStyle={{
            paddingTop: 50,
            flexDirection: "row",
            flexWrap: "wrap",
            }}
        >
            <Stack.Screen
            options={{
                title: "Your Library",
                headerTransparent: true,
                headerBlurEffect: "dark",
            }}
            />
            {assets.map((photo) => (
            <Image
                key={photo.id}
                source={photo.uri}
                style={{
                width: "25%",
                height: 100,
                }}
            />
            ))}
      </ScrollView>
    </View>
  );
}


