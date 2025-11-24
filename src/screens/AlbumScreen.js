import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";
import PhotoTile from "../components/PhotoTile";
import { getPhotosByAlbum } from "../api/jsonplaceholder";

const { width } = Dimensions.get("window");

// ✅ CALCULAR COLUNAS DINAMICAMENTE
const getColumns = () => {
  if (width > 768) return 4; // Tablet grande
  if (width > 600) return 3; // Tablet
  return 2; // Mobile
};

export default function AlbumScreen({ route, navigation }) {
  const { albumId } = route.params;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(getColumns());

  useEffect(() => {
    loadPhotos();

    // ✅ OUVIR MUDANÇAS DE ORIENTAÇÃO DA TELA
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setColumns(getColumns());
    });

    return () => subscription?.remove();
  }, [albumId]);

  async function loadPhotos() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPhotosByAlbum(albumId);
      setPhotos(data);
    } catch (err) {
      console.error("Error loading photos:", err);
      setError("Erro ao carregar fotos do álbum");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Título mais descritivo
  const screenTitle = `Álbum #${albumId} (${photos.length} fotos)`;

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title={screenTitle} />

      <View style={styles.card}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Carregando fotos...</Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.retryText} onPress={loadPhotos}>
              Tentar novamente
            </Text>
          </View>
        ) : photos.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>Nenhuma foto encontrada</Text>
          </View>
        ) : (
          <FlatList
            data={photos}
            numColumns={columns} // ✅ COLUNAS DINÂMICAS
            renderItem={({ item }) => (
              <PhotoTile
                photo={item}
                columns={columns} // ✅ PASSAR NÚMERO DE COLUNAS
                onPress={() =>
                  navigation.navigate("PhotoDetail", { photo: item })
                }
              />
            )}
            keyExtractor={(item) => String(item.id)}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            key={columns} // ✅ FORÇAR RE-RENDER AO MUDAR COLUNAS
            contentContainerStyle={styles.listContent}
          />
        )}
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
    width: "90%",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    padding: 20, // ✅ REDUZIDO PARA MELHOR ESPAÇAMENTO
    alignSelf: "center",
    flex: 1,
    ...SHADOW.neuSoft,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12, // ✅ MAIS ESPAÇO ENTRE LINHAS
  },
  listContent: {
    paddingBottom: 10, // ✅ ESPAÇO NO FINAL DA LISTA
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
  },
  retryText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary + "20",
    borderRadius: 20,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
