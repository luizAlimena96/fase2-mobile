import React from "react";
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Header from "../components/Header";
import Blobs from "../components/Blobs";

export default function PhotoScreen({ route }) {
  const { photo } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title="Foto" />

      <View style={styles.card}>
        <Image source={{ uri: photo.url }} style={styles.image} />

        <Text style={styles.title}>{photo.title}</Text>

        <Text style={styles.meta}>ID: {photo.id}</Text>
        <Text style={styles.meta}>Álbum: {photo.albumId}</Text>
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
    ...SHADOW.neuSoft,
  },

  image: {
    width: "100%",
    height: 340,
    borderRadius: RADIUS.large,
    marginBottom: 22,
  },

  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },

  meta: { color: COLORS.textLight, marginBottom: 4 },
});
