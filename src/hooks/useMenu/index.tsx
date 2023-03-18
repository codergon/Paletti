import styles from './styles';
import MenuItem from './MenuItem';
import {View} from '../../components/Themed';
import {MdText} from '../../components/StyledText';
import {ScrollView, useColorScheme} from 'react-native';
import {AppMenuType, MeasureType, useMenuType} from '../../types/common';
import {useState, ReactElement, cloneElement, useLayoutEffect} from 'react';

const useMenu: useMenuType = (
  defaultOption = null,
  items,
  filter,
  useFirst,
  itemKey,
) => {
  const colorScheme = useColorScheme();
  const [showMenu, setShowMenu] = useState(false);
  const [currentOption, setCurrentOption] = useState(
    defaultOption || (useFirst === false ? '' : items[0]),
  );

  const isDark = colorScheme === 'dark';
  const menuBg = isDark ? '#222' : '#fff';
  const shadowColor = isDark ? '#555' : '#888';
  const containerBorderColor = isDark ? '#444' : '#e1e1e1';

  const AppMenu: AppMenuType = ({
    full,
    font,
    align,
    children,
    capitals,
    direction,
    itemHeight,
    multiline,
    containerStyle,
  }) => {
    const [measure, setMeasure] = useState<MeasureType>(null);

    const MenuTrigger = cloneElement(children as React.ReactElement<any>, {
      // ref: childRef,
      onPress: () => {
        setShowMenu(!showMenu);
      },
    });

    useLayoutEffect(() => {
      const updateDimensions = () => {
        const childStyles = (children as ReactElement)?.props?.style;
        const leftMargin =
          childStyles?.marginLeft ||
          childStyles?.marginHorizontal ||
          childStyles?.margin ||
          childStyles?.left ||
          0;
        const rightMargin =
          childStyles?.marginRight ||
          childStyles?.marginHorizontal ||
          childStyles?.margin ||
          childStyles?.right ||
          0;

        const bottomMargin =
          childStyles?.marginBottom ||
          childStyles?.marginVertical ||
          childStyles?.margin ||
          0;

        const width = childStyles?.width || 0;
        const height = childStyles?.height || 0;

        setMeasure(p => {
          return {
            ...p,
            width,
            height,
            left: leftMargin,
            right: rightMargin,
            bottom: bottomMargin,
          };
        });
      };

      updateDimensions();
    }, [children]);

    return (
      <>
        <View
          style={[
            styles.menuContainer,
            containerStyle,
            {
              alignItems:
                align === 'end' || align === 'start'
                  ? `flex-${align}`
                  : align === 'center'
                  ? 'center'
                  : 'flex-end',
              backgroundColor: 'transparent',
            },
          ]}>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'row',
                width: measure?.width === '100%' ? '100%' : 'auto',
                flex: measure?.height === '100%' ? 1 : 0,
                backgroundColor: 'transparent',
              },
            ]}>
            {MenuTrigger}
          </View>

          {showMenu && items.length > 0 && (
            <View
              style={[
                styles.menuList,
                {
                  [direction === 'top' ? 'bottom' : 'top']: '100%',
                  marginLeft: measure?.left,
                  marginRight: measure?.right,
                  width: full ? '100%' : 'auto',
                },
              ]}>
              <ScrollView
                bounces={false}
                decelerationRate={0.3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={[
                  styles.menuListInner,
                  {
                    borderWidth: 1,
                    borderColor: containerBorderColor,

                    shadowColor,
                    backgroundColor: menuBg,
                    maxHeight: multiline
                      ? items.length > 4
                        ? 4.5 * (itemHeight || 45)
                        : 'auto'
                      : (itemHeight ? itemHeight : 45) *
                        (items.length > 4 ? 4.1 : items?.length),
                  },
                ]}>
                {items
                  ?.filter(_i =>
                    filter
                      ? itemKey
                        ? _i[itemKey] !== currentOption[itemKey]
                        : _i !== currentOption
                      : true,
                  )
                  ?.map((item, ind, arr) => (
                    <MenuItem
                      key={ind}
                      index={ind}
                      value={item}
                      itemHeight={itemHeight}
                      onSelect={val => {
                        setCurrentOption(val);
                        setShowMenu(false);
                      }}
                      isLast={ind === arr.length - 1}
                      isActive={
                        itemKey
                          ? item[itemKey] === currentOption[itemKey]
                          : item === currentOption
                      }>
                      <MdText
                        numberOfLines={multiline ? 2 : 1}
                        style={[
                          styles.menuItemLabel,
                          {
                            textAlign: 'center',
                            lineHeight: (font || 15) + 4,
                            fontSize: font || 15,
                            textTransform: capitals
                              ? 'uppercase'
                              : 'capitalize',
                          },
                        ]}
                        darkColor={
                          (
                            itemKey
                              ? item[itemKey] === currentOption[itemKey]
                              : item === currentOption
                          )
                            ? '#fff'
                            : '#bbb'
                        }
                        lightColor={
                          (
                            itemKey
                              ? item[itemKey] === currentOption[itemKey]
                              : item === currentOption
                          )
                            ? '#222'
                            : '#666'
                        }>
                        {(itemKey ? item[itemKey] : item).replace('-', ' ')}
                      </MdText>
                    </MenuItem>
                  ))}
              </ScrollView>
            </View>
          )}
        </View>
      </>
    );
  };

  return [AppMenu, currentOption, setCurrentOption];
};

export default useMenu;
