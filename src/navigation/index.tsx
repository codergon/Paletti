import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {ColorSchemeName} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import Loader from '../components/common/Loader';
import MainApp from '../screens/MainApp';
import Splash from '../screens/Splash';
import {RootStackParamList} from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {colorScheme: ColorSchemeName};

export default function Navigation({colorScheme}: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await Camera.getCameraPermissionStatus();
        setHasPermission(result === 'authorized');
      } catch (e) {
        setHasPermission(false);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <Loader />;
  }

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          // gestureEnabled: false,
        }}
        initialRouteName={hasPermission ? 'MainApp' : 'Splash'}
        //
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
