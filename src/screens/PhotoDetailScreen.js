import React, { useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";

const { width, height } = Dimensions.get("window");

export default function PhotoDetailScreen({ route, navigation }) {
  const { photo } = route.params;
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // ✅ CORREÇÃO: Usar useRef para evitar mudanças na URL
  const imageUrl = useRef(
    `https://picsum.photos/seed/${photo.id}/1200/1200`
  ).current;

  // Cores de fundo vibrantes baseadas no ID
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
      "#E74C3C",
      "#3498DB",
      "#2ECC71",
      "#F39C12",
      "#9B59B6",
      "#1ABC9C",
      "#E67E22",
      "#34495E",
    ];
    return colors[id % colors.length];
  };

  // Animação de entrada da imagem
  React.useEffect(() => {
    if (!imageLoading && !imageError) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  }, [imageLoading, imageError]);

  // Toggle info overlay
  const toggleInfo = () => {
    const toValue = showInfo ? 0 : 1;
    Animated.timing(fadeAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setShowInfo(!showInfo);
  };

  // ✅ CORREÇÃO: Usar useCallback para evitar recriação das funções
  const handleLoadStart = useCallback(() => {
    setImageLoading(true);
    setImageError(false);
    scaleAnim.setValue(0);
  }, []);

  const handleLoad = useCallback(() => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  const handleError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setImageError(false);
    setImageLoading(true);
    // Forçar re-render com um pequeno delay
    setTimeout(() => {
      setImageLoading(true);
    }, 100);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* Header com botões */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={toggleInfo}
          activeOpacity={0.7}
        >
          <Ionicons
            name={
              showInfo ? "information-circle" : "information-circle-outline"
            }
            size={28}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Área da imagem com zoom */}
      <ScrollView
        style={styles.container}
        maximumZoomScale={3}
        minimumZoomScale={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.imageWrapper,
            { backgroundColor: getBackgroundColor(photo.id) },
          ]}
        >
          {/* Loading State */}
          {imageLoading && !imageError && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="white" />
              <Text style={styles.loadingText}>Carregando imagem...</Text>
              <Text style={styles.loadingSubtext}>Foto #{photo.id}</Text>
            </View>
          )}

          {/* Error State */}
          {imageError && (
            <View style={styles.errorContainer}>
              <Ionicons name="image-outline" size={80} color="white" />
              <Text style={styles.errorTitle}>Foto #{photo.id}</Text>
              <Text style={styles.errorText}>{photo.title}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}
              >
                <Ionicons name="refresh" size={20} color="white" />
                <Text style={styles.retryText}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Imagem - ✅ CORREÇÃO: Renderizar apenas quando não houver erro */}
          {!imageError && (
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                source={{ uri: imageUrl }}
                style={styles.fullImage}
                resizeMode="contain"
                onLoadStart={handleLoadStart}
                onLoad={handleLoad}
                onError={handleError}
                // ✅ IMPORTANTE: Não usar onLoadEnd, usar apenas onLoad
              />
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {/* Info Overlay com animação */}
      <Animated.View
        style={[styles.infoOverlay, { opacity: fadeAnim }]}
        pointerEvents={showInfo ? "auto" : "none"}
      >
        <View style={styles.infoHeader}>
          <View style={styles.badge}>
            <Ionicons name="images" size={16} color={COLORS.primary} />
            <Text style={styles.badgeText}>Album {photo.albumId}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="pricetag" size={16} color="#F39C12" />
            <Text style={styles.badgeText}>ID: {photo.id}</Text>
          </View>
        </View>

        <Text style={styles.photoTitle} numberOfLines={3}>
          {photo.title}
        </Text>

        <View style={styles.infoFooter}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons name="download-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Hint para zoom */}
      {!imageLoading && !imageError && (
        <View style={styles.zoomHint}>
          <Ionicons name="expand" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.zoomHintText}>Pinch para zoom</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 8,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: width,
    height: height - 100,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
  },
  loadingSubtext: {
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
    fontSize: 14,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  errorTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },
  errorText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },
  retryText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  infoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoHeader: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    gap: 6,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  photoTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    lineHeight: 24,
  },
  infoFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  zoomHint: {
    position: "absolute",
    top: Platform.OS === "ios" ? 100 : 70,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  zoomHintText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "500",
  },
});
