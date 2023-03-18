import {CompositeScreenProps, NavigationProp} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  MainApp: undefined;
  Splash: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AppNavigationProp = NavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type RootTabParamList = {
  MainApp: undefined;
  Splash: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
