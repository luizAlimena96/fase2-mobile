import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getUsers } from "../api/jsonplaceholder";
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const u = await getUsers();
      setUsers(u);
    }
    load();
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Blobs />
      <Header title="Usuários" />

      <View style={styles.card}>
        <TextInput
          placeholder="Buscar usuário..."
          placeholderTextColor={COLORS.textLight}
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userRow}
              onPress={() =>
                // Aqui passamos userId
                navigation.navigate("Albums", { userId: item.id })
              }
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name[0].toUpperCase()}
                </Text>
              </View>
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  card: {
    width: "90%",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    padding: 24,
    alignSelf: "center",
    flex: 1,
    ...SHADOW.neuSoft,
  },
  search: {
    borderWidth: 1,
    borderColor: COLORS.textLight,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.textLight,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  name: { fontSize: 16 },
});
