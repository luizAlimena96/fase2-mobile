import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";
import PhotoTile from "../components/PhotoTile";
import { getPhotosByAlbum } from "../api/jsonplaceholder";

export default function AlbumScreen({ route, navigation }) {
  const { albumId } = route.params;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getPhotosByAlbum(albumId);
      setPhotos(data);
    }
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title={`Álbum ${albumId}`} />

      <View style={styles.card}>
        <FlatList
          data={photos}
          numColumns={2}
          renderItem={({ item }) => (
            <PhotoTile
              photo={item}
              onPress={() => navigation.navigate("Photo", { photo: item })}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  card: {
    width: "90%",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    padding: 24,
    alignSelf: "center",
    flex: 1,
    ...SHADOW.neuSoft,
  },
});
