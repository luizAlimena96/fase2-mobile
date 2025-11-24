import React, { useState, useCallback, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { COLORS, SHADOW, RADIUS } from "../styles/theme";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 600;

export default function AlbumCard({ album, onPress }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ✅ CORREÇÃO: Usar useRef para URL estática com seed
  const thumbnailUrl = useRef(
    `https://picsum.photos/seed/album-${album.id}/150/150`
  ).current;

  // Cor de fundo baseada no ID do álbum
  const getBackgroundColor = (id) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E2",
    ];
    return colors[id % colors.length];
  };

  // ✅ CORREÇÃO: Usar useCallback para evitar recriação das funções
  const handleLoadStart = useCallback(() => {
    setLoading(true);
    setError(false);
  }, []);

  const handleLoad = useCallback(() => {
    setLoading(false);
    setError(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View
        style={[styles.img, { backgroundColor: getBackgroundColor(album.id) }]}
      >
        {loading && !error && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#FFF" />
          </View>
        )}

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.albumNumber}>#{album.id}</Text>
            <Text style={styles.errorIcon}>📁</Text>
          </View>
        ) : (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.img}
            onLoadStart={handleLoadStart}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {album.title}
        </Text>
        <Text style={styles.userId}>User ID: {album.userId}</Text>
        <Text style={styles.albumId}>Album ID: {album.id}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderRadius: RADIUS.medium,
    ...SHADOW.neuSoft,
    flexDirection: "row",
    padding: 12,
  },
  img: {
    width: isTablet ? 100 : 60,
    height: isTablet ? 100 : 60,
    borderRadius: 8,
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  albumNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  errorIcon: {
    fontSize: 24,
    opacity: 0.7,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: isTablet ? 18 : 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  userId: {
    fontSize: 11,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  albumId: {
    fontSize: 11,
    color: COLORS.textLight,
  },
});
