import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";

export default function Header({ title }) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      {canGoBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
            size={26}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      )}

      <Text style={styles.logo}>PhotoYou</Text>

      {title && (
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontSize: 38,
    fontWeight: "800",
    color: COLORS.textDark,
    textShadowColor: "rgba(0,0,0,0.08)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  backButton: {
    position: "absolute",
    left: 20,
    top: 14,
    padding: 5,
  },

  titleWrapper: {
    marginTop: 12,
    backgroundColor: COLORS.card,
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: COLORS.purpleGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 4,
  },

  title: {
    fontWeight: "700",
    fontSize: 19,
    color: COLORS.textDark,
    letterSpacing: 0.4,
  },
});
