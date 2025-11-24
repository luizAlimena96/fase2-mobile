import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { getAlbums } from "../api/jsonplaceholder";
import Blobs from "../components/Blobs";
import Header from "../components/Header";
import AlbumCard from "../components/AlbumCard";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";

export default function AlbumsScreen({ route, navigation }) {
  const { userId } = route.params || {};

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function loadAlbums() {
      const all = await getAlbums();
      const filtered = userId ? all.filter((a) => a.userId === userId) : all;
      setAlbums(filtered);
    }
    loadAlbums();
  }, [userId]);

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title="Álbuns" />

      <View style={styles.card}>
        <FlatList
          data={albums}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <AlbumCard
              album={item}
              onPress={() => navigation.navigate("Album", { albumId: item.id })}
            />
          )}
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
