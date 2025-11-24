import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";
import { getAlbums } from "../api/jsonplaceholder";
import AlbumCard from "../components/AlbumCard";

export default function AlbumsScreen({ navigation }) {
  const [albums, setAlbums] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getAlbums();
      setAlbums(data);
    }
    load();
  }, []);

  const filtered = albums.filter((a) =>
    a.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title="Álbuns" />

      <View style={styles.card}>
        <TextInput
          placeholder="Pesquisar..."
          style={styles.input}
          value={filter}
          onChangeText={setFilter}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("CreateAlbum")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ Criar Álbum</Text>
        </TouchableOpacity>

        <FlatList
          data={filtered}
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
    padding: 22,
    borderRadius: RADIUS.large,
    alignSelf: "center",
    ...SHADOW.neuSoft,
    marginTop: 6,
    flex: 1,
  },

  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  addButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 40,
    alignItems: "center",
    marginBottom: 16,
  },

  addButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
