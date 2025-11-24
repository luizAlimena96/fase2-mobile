import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title="Criar conta" />

      <View style={styles.card}>
        <Text style={styles.label}>email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.buttonPrimary}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    padding: 26,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    alignSelf: "center",
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
    paddingHorizontal: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
