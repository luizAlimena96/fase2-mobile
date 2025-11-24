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
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Users"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Users" component={UsersScreen} />
      <Stack.Screen name="Albums" component={AlbumsScreen} />
      <Stack.Screen name="CreateAlbum" component={CreateAlbumScreen} />
      <Stack.Screen name="Album" component={AlbumScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
    </Stack.Navigator>
  );
}
