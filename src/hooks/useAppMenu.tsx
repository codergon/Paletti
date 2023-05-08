import {
  Menu,
  renderers,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import styles from './styles';
import {useState} from 'react';
import {useColorScheme} from 'react-native';
import {MdText} from '../components/StyledText';
import {ScrollView} from '../components/Themed';
import {AppMenuType, useMenuType} from '../types/common';

const {ContextMenu} = renderers;

const useAppMenu: useMenuType = (defaultOption = null, items = []) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const menuBg = isDark ? '#181818' : '#fff';
  const activeColor = isDark ? '#fff' : '#000';
  const shadowColor = isDark ? '#555' : '#888';
  const inActiveColor = isDark ? '#888' : '#999';
  const borderColor = isDark ? '#444' : '#e1e1e1';
  const [activeOption, setActiveOption] = useState(
    defaultOption ?? items[0] ?? '',
  );

  const AppMenu: AppMenuType = ({
    full,
    align,
    children,
    capitals,
    offset = {
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
    },
    direction,
    itemHeight,
    containerStyle,
  }) => {
    return (
      <>
        <Menu
          renderer={ContextMenu}
          style={[
            styles.menuContainer,
            containerStyle,
            {
              alignItems:
                align === 'end' || align === 'start'
                  ? `flex-${align}`
                  : align === 'center'
                  ? 'center'
                  : 'stretch',
            },
          ]}>
          <MenuTrigger>{children}</MenuTrigger>

          <MenuOptions
            customStyles={{
              optionsWrapper: [
                styles.optionsWrapper,
                {
                  top: offset?.top,
                  left: offset?.left,
                  right: offset?.right,
                  bottom: offset?.bottom,
                  width: full ? '100%' : 'auto',
                },
              ],
              optionsContainer: [
                styles.optionsContainer,
                {
                  width: '100%',
                  paddingHorizontal: 20,
                },
              ],
            }}>
            <ScrollView
              bounces={false}
              decelerationRate={0.3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.menuListInner,
                {
                  shadowColor,
                  backgroundColor: menuBg,
                },
              ]}>
              {items.map((item, index) => {
                return (
                  <MenuOption
                    key={item}
                    style={[
                      styles.menuItem,
                      {
                        borderBottomColor: borderColor,
                        borderBottomWidth: index === items.length - 1 ? 0 : 0.7,
                      },
                    ]}
                    onSelect={() => console.log(`Delete`)}>
                    <>
                      <MdText
                        style={[
                          styles.menuItemLabel,
                          {
                            color:
                              activeOption === item
                                ? activeColor
                                : inActiveColor,
                            textTransform: capitals
                              ? 'uppercase'
                              : 'capitalize',
                          },
                        ]}>
                        {item}
                      </MdText>
                    </>
                  </MenuOption>
                );
              })}
            </ScrollView>
          </MenuOptions>
        </Menu>
      </>
    );
  };

  return [AppMenu, activeOption, setActiveOption];
};

export default useAppMenu;
