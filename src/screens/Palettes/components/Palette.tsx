import {Alert, Animated, StyleSheet} from 'react-native';
import {TouchableOpacity, View} from '../../../components/Themed';
import {MdText} from '../../../components/StyledText';
import Colors, {SECONDARY_COLOR} from '../../../constants/Colors';
import {padding} from '../../../helpers/styles';
import {PaletteType} from '../../../types/palette';
import TimeAgo from '../../../components/common/TimeAgo';
import {ContextMenuView} from 'react-native-ios-context-menu';
import {useRef, useState} from 'react';
import {useStore} from '../../../context/AppContext';
import {PushPinSimple, Trash} from 'phosphor-react-native';
import useColorScheme from '../../../hooks/useColorScheme';
import {useNavigation} from '@react-navigation/native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';

interface PaletteProps {
  listIndex: number;
  palette: PaletteType;
  closeOthers: (id: string) => void;
  palettesRef: React.MutableRefObject<Swipeable[]>;
}

const Palette = ({
  palette,
  listIndex,
  closeOthers,
  palettesRef,
}: PaletteProps) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const emptyList = isDark ? '#353535' : '#ddd';
  const emptyListText = isDark ? '#cccc' : '#888';
  const darken = isDark ? '#1c1c1e' : '#f2f2f2';
  const borderColor = isDark ? '#555' : '#e2e2e2';
  const [visible, setVisible] = useState(false);
  const paletteBg = isDark ? Colors.dark.background : Colors.light.background;
  const {renamePalette, deletePalette, togglePinnedStatus} = useStore();

  // Swipeable & Context-Menu Logic
  const swipeableRef = useRef<Swipeable>(null);
  const [swiping, setSwiping] = useState(false);
  const onPressMenu = (actionKey: string) => {
    const details = {
      id: palette?.id,
      name: palette?.name,
      pinned: palette?.pinned,
    };
    switch (actionKey) {
      case 'rename':
        renamePalette(details);
        break;
      case 'pin':
        togglePinnedStatus(details);
        break;
      case 'share':
        if (palette?.colors?.length) {
          navigation.navigate('Modal', {
            data: palette,
          });
        } else {
          Alert.alert('No colors in palette', 'Add colors to palette to share');
        }
        break;
      case 'delete':
        deletePalette(details);
        break;
    }
  };

  return (
    <>
      <Swipeable
        id={palette?.id}
        // ref={swipeableRef}
        ref={el => (palettesRef.current[listIndex] = el as Swipeable)}
        overshootFriction={4}
        containerStyle={{
          marginBottom: 2,
          borderRadius: 22,
          backgroundColor: paletteBg,
        }}
        onActivated={() => {
          setSwiping(true);
        }}
        onSwipeableClose={() => {
          setSwiping(false);
        }}
        renderRightActions={(progress, dragX) => {
          const trans = dragX.interpolate({
            inputRange: [-101, -100, -50, 0],
            outputRange: [0, 0, 0, 20],
            extrapolate: 'clamp',
          });

          const opacity = dragX.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          });

          return (
            // @ts-ignore
            <RectButton
              style={styles.leftAction}
              onPress={() => {
                onPressMenu('delete');
              }}>
              <Animated.View
                style={[
                  styles.swipeDelete,
                  {
                    opacity,
                    transform: [{translateX: trans}],
                  },
                ]}>
                <Trash size={26} color={'#fff'} weight="fill" />
              </Animated.View>
            </RectButton>
          );
        }}>
        <ContextMenuView
          style={[
            styles.contextMenuView,
            {
              backgroundColor: isDark && visible ? '#333' : paletteBg,
            },
          ]}
          isContextMenuEnabled={true}
          shouldWaitForMenuToHideBeforeFiringOnPressMenuItem={!true}
          onPressMenuItem={({nativeEvent}) => {
            onPressMenu(nativeEvent.actionKey);
          }}
          onMenuWillShow={() => setVisible(true)}
          onMenuWillHide={() => setVisible(false)}
          menuConfig={{
            menuTitle: palette?.name ?? '',
            menuItems: [
              {
                type: 'menu',
                menuTitle: '',
                menuOptions: ['displayInline'],
                menuItems: [
                  {
                    actionKey: 'rename',
                    actionTitle: 'Rename',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'pencil',
                        weight: 'regular',
                      },
                    },
                  },
                  {
                    actionKey: 'pin',
                    actionTitle: palette?.pinned ? 'Unpin' : 'Pin',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: palette?.pinned ? 'pin.slash' : 'pin',
                        weight: 'regular',
                      },
                    },
                  },
                  {
                    actionKey: 'share',
                    actionTitle: 'Share',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'arrowshape.turn.up.right',
                        weight: 'regular',
                      },
                    },
                  },
                ],
              },
              {
                type: 'menu',
                menuTitle: '',
                menuOptions: ['displayInline'],
                menuItems: [
                  {
                    actionKey: 'delete',
                    actionTitle: 'Delete',
                    menuAttributes: ['destructive'],
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'trash',
                        hierarchicalColor: 'red',
                      },
                    },
                  },
                ],
              },
            ],
          }}>
          <TouchableOpacity
            activeOpacity={1}
            delayLongPress={100}
            onLongPress={() => {}}
            onPress={() => {
              if (!swiping) {
                navigation.navigate('paletteColors', {
                  palette: palette,
                });
                closeOthers('');
              } else {
                closeOthers(palette?.id);
              }
            }}
            style={[
              styles.palette,
              {
                backgroundColor: darken,
              },
            ]}>
            <View style={[styles.palette__details]}>
              <MdText style={[styles.palette__details__name]}>
                {palette?.name}
              </MdText>

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                }}>
                {!isNaN(palette?.lastUpdated) && (
                  <TimeAgo
                    date={palette?.lastUpdated}
                    textStyle={[styles.palette__details__date]}
                  />
                )}

                {palette?.pinned && (
                  <PushPinSimple
                    size={12.6}
                    style={{marginLeft: 10}}
                    weight="fill"
                    color={'#a1a1a1'}
                  />
                )}
              </View>
            </View>

            <View
              style={[
                styles.swatches,
                {
                  borderColor,
                  borderWidth: 0.7,
                  backgroundColor: emptyList,
                },
              ]}>
              {palette?.colors?.length > 0 ? (
                palette?.colors?.map((item, index) => {
                  return (
                    <View
                      key={item?.id}
                      style={[
                        styles.swatchesItem,
                        {
                          backgroundColor: item?.color,
                        },
                      ]}
                    />
                  );
                })
              ) : (
                <View style={[styles.emptyList]}>
                  <MdText
                    style={{
                      fontSize: 12.6,
                      letterSpacing: 0.2,
                      color: emptyListText,
                    }}>
                    Empty Palette
                  </MdText>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </ContextMenuView>
      </Swipeable>
    </>
  );
};

export default Palette;

const styles = StyleSheet.create({
  // Swipeable
  leftAction: {
    borderRadius: 16,
    marginLeft: -100,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#dd2c00',
  },
  swipeDelete: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20 + 94,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  // Context Menu
  contextMenuView: {
    padding: 8,
    borderRadius: 22,
  },
  palette: {
    width: '100%',
    borderRadius: 16,
    ...padding(13, 17, 15),
    flexDirection: 'column',
  },
  palette__details: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  palette__details__name: {
    fontSize: 15,
  },
  palette__details__date: {
    fontSize: 12.6,
    letterSpacing: 0.2,
    color: '#a1a1a1',
  },
  swatches: {
    height: 34,
    marginTop: 16,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
  },
  swatchesItem: {
    flex: 1,
    padding: 3,
    height: '100%',
    borderColor: SECONDARY_COLOR,
  },
  emptyList: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
