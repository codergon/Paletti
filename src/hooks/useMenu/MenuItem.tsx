import styles from './styles';
import {MenuItemProps} from '../../types/common';
import {Pressable, useColorScheme} from 'react-native';

const MenuItem = ({
  value,
  isLast,
  children,
  onSelect,
  // isActive,
  itemHeight,
}: MenuItemProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const borderBottomColor = isDark ? '#444' : '#e1e1e1';

  return (
    <Pressable
      onPress={() => onSelect && onSelect(value)}
      style={[
        styles.menuItem,
        {
          borderBottomColor,
          minHeight: itemHeight,
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}>
      {children}
    </Pressable>
  );
};

export default MenuItem;
