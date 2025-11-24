import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";

export default function AlbumCard({ album, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{album.title}</Text>
      <Text style={styles.subtitle}>Álbum #{album.id}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 18,
    marginVertical: 10,
    borderRadius: RADIUS.card,
    ...SHADOW.neuSoft,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  subtitle: {
    marginTop: 6,
    color: COLORS.textLight,
  },
});
