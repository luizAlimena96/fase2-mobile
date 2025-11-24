import React from "react";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";

export default function PhotoTile({ photo, onPress }) {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
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
    width: "47%",
    aspectRatio: 1,
    borderRadius: RADIUS.large,
    marginBottom: 20,

    ...SHADOW.neuSoft,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: RADIUS.large,
  },
});
