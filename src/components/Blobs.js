import React from "react";
import { View, StyleSheet } from "react-native";

export default function Blobs() {
  return (
    <>
      <View style={[styles.blob, styles.blobPurple]} />
      <View style={[styles.blob, styles.blobBlue]} />
    </>
  );
}

const BLOB_SIZE = 380;

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
    width: BLOB_SIZE,
    height: BLOB_SIZE,
    borderRadius: BLOB_SIZE,
    opacity: 0.55,
    filter: "blur(80px)", // Expo vai ignorar, mas mantém visual na web
  },
  blobPurple: {
    backgroundColor: "#b193ff",
    top: -120,
    left: -100,
  },
  blobBlue: {
    backgroundColor: "#7be4f7",
    bottom: -140,
    right: -80,
  },
});
