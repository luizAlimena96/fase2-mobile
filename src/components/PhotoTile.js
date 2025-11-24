import React from "react";
import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 600;

const tileSize = isTablet ? screenWidth / 3.3 : screenWidth / 2.25;

export default function PhotoTile({ photo, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.tile, { width: tileSize, height: tileSize }]}
      onPress={onPress}
    >
      <Image
        source={{ uri: photo.thumbnailUrl || photo.url }}
        style={styles.img}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#EDEDED",
    borderRadius: RADIUS.large,
    marginBottom: 18,
    ...SHADOW.neuSoft,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: RADIUS.large,
  },
});
