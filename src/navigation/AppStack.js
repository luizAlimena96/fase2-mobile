import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import AlbumsScreen from "../screens/AlbumsScreen";
import CreateAlbumScreen from "../screens/CreateAlbumScreen";
import AlbumScreen from "../screens/AlbumScreen";
import PhotoScreen from "../screens/PhotoScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#1976D2" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Cadastro" }}
      />
      <Stack.Screen
        name="Albums"
        component={AlbumsScreen}
        options={{ title: "Álbuns" }}
      />
      <Stack.Screen
        name="CreateAlbum"
        component={CreateAlbumScreen}
        options={{ title: "Criar Álbum" }}
      />
      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        options={{ title: "Álbum" }}
      />
      <Stack.Screen
        name="Photo"
        component={PhotoScreen}
        options={{ title: "Foto" }}
      />
    </Stack.Navigator>
  );
}
