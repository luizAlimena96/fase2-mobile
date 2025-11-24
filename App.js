// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/AppStack";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <AppStack />
    </NavigationContainer>
  );
}
