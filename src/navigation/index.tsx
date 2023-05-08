import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Home from '../screens/Home';
import Splash from '../screens/Splash';
import {RootStackParamList} from '../types';
import {ColorSchemeName} from 'react-native';
import ImagePalette from '../screens/ImagePalette';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();
type Props = {colorScheme: ColorSchemeName};

export default function Navigation({colorScheme}: Props) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
        initialRouteName="home">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="imagePalette" component={ImagePalette} />
        <Stack.Screen name="splash" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
