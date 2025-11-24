import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      {/* LOGO */}
      <Text style={styles.logo}>PhotoYou</Text>

      {/* TÍTULO DA TELA */}
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
    marginBottom: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontSize: 40,
    fontWeight: "800",
    color: COLORS.textDark,
    letterSpacing: 1.2,
    marginBottom: 18,

    // sombra suave para dar profundidade
    textShadowColor: "rgba(0,0,0,0.10)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },

  titleWrapper: {
    backgroundColor: COLORS.card,
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",

    // glow colorido mais elegante e suave
    shadowColor: COLORS.purpleGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 3,
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.textDark,
    letterSpacing: 0.3,
  },
});
