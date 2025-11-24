import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Header from "../components/Header";
import Blobs from "../components/Blobs";

export default function CreateAlbumScreen({ navigation }) {
  const [title, setTitle] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title="Criar Álbum" />

      <View style={styles.card}>
        <Text style={styles.label}>Título do álbum:</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
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
    padding: 24,
    borderRadius: RADIUS.large,
    alignSelf: "center",
    ...SHADOW.neuSoft,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F4F4F4",
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
