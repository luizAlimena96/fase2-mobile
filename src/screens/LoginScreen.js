import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Header />

        <View style={styles.card}>
          <Text style={styles.label}>email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.label}>password:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => navigation.replace("Albums")}
            style={styles.buttonPrimary}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.buttonSecondary}
          >
            <Text style={styles.buttonText}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "90%",
    paddingVertical: 30,
    paddingHorizontal: 22,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    marginTop: 10,
    ...SHADOW.neuSoft,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 8,
  },

  input: {
    backgroundColor: "#F4F4F4",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },

  buttonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonSecondary: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
