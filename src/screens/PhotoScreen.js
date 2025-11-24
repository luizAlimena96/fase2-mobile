import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Header from "../components/Header";
import Blobs from "../components/Blobs";

export default function PhotoScreen({ route }) {
  const { photo } = route.params;
  const [imageLoading, setImageLoading] = useState(true);

  // ✅ CORREÇÃO: Usar Picsum.photos
  const imageUrl = `https://picsum.photos/400/400?random=${photo.id}`;

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title="Foto" />

      <View style={styles.card}>
        {imageLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />

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
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  meta: { color: COLORS.textLight, marginBottom: 4 },
});
