import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersScreen from "../screens/UsersScreen";
import AlbumsScreen from "../screens/AlbumsScreen";
import CreateAlbumScreen from "../screens/CreateAlbumScreen";
import AlbumScreen from "../screens/AlbumScreen";
import PhotoScreen from "../screens/PhotoScreen";
import PhotoDetailScreen from "../screens/PhotoDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Users"
    >
      <Stack.Screen name="Users" component={UsersScreen} />
      <Stack.Screen name="Albums" component={AlbumsScreen} />
      <Stack.Screen name="CreateAlbum" component={CreateAlbumScreen} />
      <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} />
      <Stack.Screen name="Album" component={AlbumScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
    </Stack.Navigator>
  );
}
