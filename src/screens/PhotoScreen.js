import React from "react";
import { SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";

export default function PhotoScreen({ route }) {
  const { photo } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title="Detalhes da Foto" />

      <View style={styles.card}>
        <Image source={{ uri: photo.url }} style={styles.image} />

        <Text style={styles.title}>{photo.title}</Text>

        <Text style={styles.meta}>ID da foto: {photo.id}</Text>
        <Text style={styles.meta}>ID do álbum: {photo.albumId}</Text>
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
    width: "88%",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    padding: 24,
    alignSelf: "center",
    ...SHADOW.neuSoft,
  },
  image: {
    width: "100%",
    height: 330,
    borderRadius: RADIUS.large,
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  meta: {
    color: COLORS.textLight,
    fontSize: 15,
    marginBottom: 4,
  },
});
