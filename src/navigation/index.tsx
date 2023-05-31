import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  RootTabParamList,
  RootStackParamList,
  RootTabScreenProps,
} from '../types';
import Colors from '../constants/Colors';
import {ColorSchemeName} from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import {Swatches, SlidersHorizontal} from 'phosphor-react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Icons from '../components/Icons';
import Palettes from '../screens/Palettes';
import Settings from '../screens/Settings';
import Eyedropper from '../screens/Eyedropper';
import Comparator from '../screens/Comparator';
import ModalScreen from '../screens/Modal/ModalScreen';
import PaletteColors from '../screens/Palettes/PaletteColors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// NAVIGATION CONTAINER
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

//  ROOT NAVIGATOR
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const theme = useColorScheme();
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          name="paletteColors"
          component={PaletteColors}
          options={({route, navigation}) => ({
            headerShown: !true,
            gestureEnabled: true,
          })}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: 'containedTransparentModal',
          animation: 'fade',
          animationDuration: 10,
        }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// BOTTOM TAB NAVIGATOR
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="eyedropper"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 100,
          paddingTop: 15,
          borderTopWidth: 1,
          paddingBottom: insets.bottom + 8,
          backgroundColor: Colors[colorScheme].tabBackground,
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="eyedropper"
        component={Eyedropper}
        options={({navigation}: RootTabScreenProps<'eyedropper'>) => ({
          tabBarIcon: ({color, focused}) => (
            <Icons.Camera size={28.5} color={color} strokeWidth={1.6} />
          ),
        })}
      />

      <BottomTab.Screen
        name="palettes"
        component={Palettes}
        options={({navigation}: RootTabScreenProps<'palettes'>) => ({
          tabBarIcon: ({color, focused}) => (
            <Swatches size={27} weight="regular" color={color} />
          ),
        })}
      />

      <BottomTab.Screen
        name="comparator"
        component={Comparator}
        options={({navigation}: RootTabScreenProps<'comparator'>) => ({
          tabBarIcon: ({color, focused}) => (
            <Icons.Exclude size={25} color={color} strokeWidth={1.2} />
          ),
        })}
      />

      <BottomTab.Screen
        name="settings"
        component={Settings}
        options={({navigation}: RootTabScreenProps<'settings'>) => ({
          tabBarIcon: ({color, focused}) => (
            <SlidersHorizontal size={26} color={color} weight="fill" />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
