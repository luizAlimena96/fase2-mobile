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
import { COLORS, RADIUS, SHADOW } from "../styles/theme";
import Blobs from "../components/Blobs";
import Header from "../components/Header";
import { getUsers } from "../api/jsonplaceholder";

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const response = await getUsers();
      setUsers(response);
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
              onPress={() => navigation.navigate("Albums", { userId: item.id })}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.substring(0, 1)}
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
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
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
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    fontSize: 16,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.borderLight,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  name: {
    fontSize: 17,
    fontWeight: "500",
  },
});
