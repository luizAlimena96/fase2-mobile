import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";
import AlbumCard from "../components/AlbumCard";
import { getAlbums } from "../api/jsonplaceholder";

export default function AlbumsScreen({ navigation }) {
  const [albums, setAlbums] = useState([]);
  const { userId } = route.params;

  useEffect(() => {
    async function load() {
      const data = await getAlbumsByUser(userId);
      setAlbums(data);
    }
    load();
  }, []);

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
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
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
