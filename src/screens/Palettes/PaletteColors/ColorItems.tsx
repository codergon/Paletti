import chroma from 'chroma-js';
import RangeBar from '../components/RangeBar';
import ColorShade from '../components/ColorShade';
import ViewShot from 'react-native-view-shot';
import {TouchableOpacity, View} from '../../../components/Themed';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {MdText} from '../../../components/StyledText';
import {edges, padding} from '../../../helpers/styles';
import useColorScheme from '../../../hooks/useColorScheme';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {PaletteType} from '../../../types/palette';
import {Container} from '../../../components/Customized';
import {useNavigation} from '@react-navigation/native';
import {
  CaretLeft,
  DotsThree,
  Drop,
  Plus,
  PlusCircle,
} from 'phosphor-react-native';
import Colors from '../../../constants/Colors';
import {ContextMenuButton} from 'react-native-ios-context-menu';
import {useStore} from '../../../context/AppContext';

type ExportContentType = {
  palette: PaletteType;
  setPaletteImg: (uri: string) => void;
};

const ColorItems = ({palette, setPaletteImg}: ExportContentType) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const viewShotRef = useRef<ViewShot>(null);
  const darkColor = isDark ? '#eee' : '#2c2c2c';
  const lightColor = isDark ? '#000' : '#fff';
  const headerBorder = isDark ? '#2d2d2d' : '#ddd';
  const highlightColor = isDark ? '#242424' : '#eee';

  const {renamePalette, deletePalette} = useStore();

  const onCapture = useCallback((uri: string) => {
    setPaletteImg(uri);
  }, []);

  useEffect(() => {
    const captureView = async () => {
      if (viewShotRef?.current?.capture) {
        await viewShotRef.current.capture();
      }
    };
    captureView();
  }, [palette?.colors]);

  const paletteColors = useMemo(() => {
    return palette?.colors?.map(color => {
      return {
        ...color,
        shades: chroma.scale([color?.color, '#ffffff']).colors(5).slice(0, 4),
      };
    });
  }, [palette?.colors]);

  return (
    <Container paddingTop={0} style={[styles.content]}>
      <View
        style={[
          styles.colorsHeader,
          {
            borderBottomColor: headerBorder,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[styles.headerBtn]}>
          <CaretLeft
            size={24}
            weight="bold"
            color={Colors[colorScheme].primary}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.headerTextCover,
            {
              paddingLeft: 40,
            },
          ]}>
          <MdText style={[styles.headerText]}>{palette?.name}</MdText>
        </View>

        <View style={[styles.rightHeaderBtns]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Modal', {
                data: {
                  showColorPicker: true,
                  paletteId: palette?.id,
                },
              });
            }}
            style={[
              styles.headerBtn,
              {
                marginRight: 10,
              },
            ]}>
            <Plus size={20} weight="bold" color={Colors[colorScheme].primary} />
          </TouchableOpacity>

          <ContextMenuButton
            isMenuPrimaryAction
            style={[styles.headerBtn]}
            onPressMenuItem={({nativeEvent}) => {
              const details = {
                id: palette?.id,
                name: palette?.name,
              };
              switch (nativeEvent.actionKey) {
                case 'rename':
                  renamePalette(details);
                  break;
                case 'share':
                  if (palette?.colors?.length) {
                    navigation.navigate('Modal', {
                      data: palette,
                    });
                  } else {
                    Alert.alert(
                      'No colors in palette',
                      'Add colors to palette to share',
                    );
                  }
                  break;
                case 'delete':
                  deletePalette(details);
                  break;
              }
            }}
            menuConfig={{
              menuTitle: '',
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
            <View style={[styles.headerBtn]}>
              <DotsThree
                size={26}
                weight="bold"
                color={Colors[colorScheme].primary}
              />
            </View>
          </ContextMenuButton>
        </View>
      </View>

      {palette && (
        <ScrollView bounces={false} contentContainerStyle={[styles.scrollview]}>
          {paletteColors?.length > 0 ? (
            <ViewShot
              ref={viewShotRef}
              onCapture={onCapture}
              style={{
                ...styles.viewShot,
                // backgroundColor: highlightColor,
              }}
              options={{
                quality: 0.9,
                format: 'png',
              }}>
              <RangeBar />

              {paletteColors?.map((item, index) => {
                return (
                  <ColorShade
                    item={item}
                    key={item.id}
                    highlightColor={highlightColor}
                  />
                );
              })}
            </ViewShot>
          ) : (
            <View style={[styles.emptyState]}>
              <MdText style={[styles.emptyState__text]}>
                No colour in your Palette yet
              </MdText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Modal', {
                    data: {
                      showColorPicker: true,
                      paletteId: palette?.id,
                    },
                  });
                }}
                style={[
                  styles.emptyStateBtn,
                  {
                    backgroundColor: darkColor,
                  },
                ]}>
                <Plus size={16} weight="bold" color={lightColor} />
                <MdText
                  style={[styles.emptyStateBtn__text, {color: lightColor}]}>
                  Add New Colour
                </MdText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </Container>
  );
};

export default ColorItems;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
    overflow: 'hidden',
    paddingTop: 20,
  },
  scrollview: {
    minHeight: '80%',
    ...padding(0, 14, 0),
    backgroundColor: 'transparent',
  },
  viewShot: {
    ...edges(20),
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    ...padding(10, 0, 6),
    flexDirection: 'column',
  },
  colorsHeader: {
    width: '100%',
    paddingTop: 2,
    marginBottom: 14,
    paddingBottom: 10,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderBottomWidth: 0.7,
    justifyContent: 'space-between',
  },
  headerTextCover: {
    height: '100%',
    maxHeight: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 17,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
  headerBtn: {
    width: 40,
    maxHeight: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorsHeaderTxt: {
    fontSize: 16,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
  rightHeaderBtns: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  // Empty State
  emptyState: {
    flex: 1,
    width: '100%',
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState__text: {
    fontSize: 17,
    color: '#8F8E93',
  },
  emptyStateBtn: {
    marginTop: 22,
    borderRadius: 8,
    ...padding(13, 16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  emptyStateBtn__text: {
    fontSize: 15,
    marginLeft: 8,
    letterSpacing: 0.2,
  },
});
