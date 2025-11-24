import React, { useState, useCallback, useRef } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";

const screenWidth = Dimensions.get("window").width;

const getTileSize = (columns) => {
  const spacing = 20;
  const gap = (columns - 1) * 8;
  return (screenWidth - spacing * 2 - gap) / columns;
};

export default function PhotoTile({ photo, onPress, columns = 2 }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const tileSize = getTileSize(columns);

  // ✅ CORREÇÃO: Usar useRef para URL estática com seed
  const imageUrl = useRef(
    `https://picsum.photos/seed/${photo.id}/300/300`
  ).current;

  // ✅ Fallback com gradiente de cor baseado no ID
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
    <TouchableOpacity
      style={[
        styles.tile,
        {
          width: tileSize,
          height: tileSize,
          backgroundColor: getBackgroundColor(photo.id),
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {loading && !error && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFF" />
          </View>
        )}

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.photoNumber}>#{photo.id}</Text>
            <Text style={styles.errorIcon}>📷</Text>
          </View>
        ) : (
          <Image
            source={{ uri: imageUrl }}
            style={styles.img}
            onLoadStart={handleLoadStart}
            onLoad={handleLoad}
            onError={handleError}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: RADIUS.medium,
    ...SHADOW.neuSoft,
    overflow: "hidden",
    marginBottom: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  photoNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  errorIcon: {
    fontSize: 32,
    opacity: 0.7,
  },
});
