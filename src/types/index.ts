import {
  NavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {PaletteType} from './palette';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type ModalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Modal'
>;

export type RootTabParamList = {
  eyedropper: undefined;
  settings: undefined;
  palettes: undefined;
  comparator: undefined;
};

export type RootStackParamList = {
  Modal: {
    data:
      | PaletteType
      | {
          showColorPicker: boolean;
          paletteId: string;
        }
      | any;
  };
  paletteColors: {
    name?: string;
    palette: PaletteType;
  };
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AppNavigationProp = NavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
