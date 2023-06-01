import {ViewStyle} from 'react-native';
import {ViewProps} from '@components/Themed';

export interface TopbarProp {
  title?: string;
  subtitle?: string;
}

export interface MenuItemProps extends ViewProps {
  value?: any;
  index?: number;
  isLast?: boolean;
  isActive?: boolean;
  itemHeight?: number;
  onSelect?: (value: any) => void;
}

export type MarginsType = {
  left?: number;
  right?: number;
};

export type MeasureType = {
  left?: number;
  right?: number;
  width?: any;
  height?: any;
  bottom?: any;
} | null;

export type AppMenuType = (
  props: ViewProps & {
    font?: number;
    full?: boolean;
    offset?: {
      top?: number;
      left?: number;
      right?: number;
      bottom?: number;
    };
    multiline?: boolean;
    capitals?: boolean;
    itemHeight?: number;
    containerStyle?: ViewStyle;
    direction?: 'top' | 'bottom';
    align?: 'center' | 'end' | 'start';
  },
) => React.ReactElement;

export type useMenuType = (
  defaultOption?: any,
  items?: any[],
  filter?: boolean,
  useFirst?: boolean,
  itemKey?: string,
) => [AppMenuType, any, any];

export type useClickOutType = (
  ref: React.RefObject<any>,
  onCallaback: () => any,
) => void;
