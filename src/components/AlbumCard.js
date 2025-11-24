import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { COLORS, SHADOW, RADIUS } from "../styles/theme";
import { getPhotosByAlbum } from "../api/jsonplaceholder";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 600;

export default function AlbumCard({ album, onPress }) {
  const [thumb, setThumb] = useState(null);

  useEffect(() => {
    async function load() {
      const photos = await getPhotosByAlbum(album.id);
      setThumb(photos[0]?.thumbnailUrl);
    }
    load();
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {thumb && <Image source={{ uri: thumb }} style={styles.img} />}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {album.title}
        </Text>
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
    padding: 10,
  },
  img: {
    width: isTablet ? 120 : 70,
    height: isTablet ? 120 : 70,
    borderRadius: 8,
    marginRight: 14,
  },
  info: { flex: 1, justifyContent: "center" },
  title: { fontSize: isTablet ? 20 : 16, fontWeight: "600" },
});
