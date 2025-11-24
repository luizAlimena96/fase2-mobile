import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import { getAlbums, getAlbumsByUser } from "../api/jsonplaceholder";
import Blobs from "../components/Blobs";
import Header from "../components/Header";
import AlbumCard from "../components/AlbumCard";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";

export default function AlbumsScreen({ route, navigation }) {
  const { userId } = route.params || {};
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlbums();
  }, [userId]);

  async function loadAlbums() {
    try {
      setLoading(true);
      const albumsData = userId
        ? await getAlbumsByUser(userId)
        : await getAlbums();
      setAlbums(albumsData);
    } catch (error) {
      console.error("Error loading albums:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title={userId ? "Álbuns do Usuário" : "Todos os Álbuns"} />

      <View style={styles.card}>
        <TextInput
          placeholder="Buscar álbuns..."
          placeholderTextColor={COLORS.textLight}
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        {loading ? (
          <Text style={styles.loading}>Carregando álbuns...</Text>
        ) : (
          <FlatList
            data={filteredAlbums}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <AlbumCard
                album={item}
                onPress={() =>
                  navigation.navigate("Album", { albumId: item.id })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  search: {
    borderWidth: 1,
    borderColor: COLORS.textLight,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#F9F9F9",
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.textLight,
  },
});
