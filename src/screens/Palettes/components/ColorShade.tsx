import {Hue} from '@typings/palette';
import Colors from '@constants/Colors';
import {HexToRgb} from '@helpers/colors';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {MdText} from '@components/StyledText';
import {CopySimple} from 'phosphor-react-native';
import useColorScheme from '@hooks/useColorScheme';
import {hapticFeedback} from '@utils/hapticFeedback';
import Clipboard from '@react-native-clipboard/clipboard';
import {ContextMenuButton} from 'react-native-ios-context-menu';

type ColorShadeProps = {
  item: Hue;
  highlightColor: string;
};
const ColorShade = ({item, highlightColor}: ColorShadeProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const darkColor = isDark ? '#fff' : '#000';
  const darkColorHex = isDark ? '#bbb' : '#666';
  const borderColor = isDark ? '#555' : '#e2e2e2';

  return (
    <>
      <View style={[styles.cover]}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: highlightColor,
            },
          ]}>
          <View style={[styles.colorDetails]}>
            <MdText
              style={[
                styles.text,
                {
                  color: darkColor,
                },
              ]}>
              {item?.displayName}
            </MdText>
            <MdText
              style={[
                styles.hex,
                {
                  color: darkColorHex,
                },
              ]}>
              {item?.color}
            </MdText>
          </View>

          <View style={[styles.actionsContainer]}>
            <View
              style={[
                styles.shades,
                {
                  borderColor,
                  borderWidth: 1,
                },
              ]}>
              {item?.shades?.map((item, index) => {
                return (
                  <Animated.View
                    key={item + index}
                    style={[
                      styles.shade,
                      {
                        backgroundColor: item,
                      },
                    ]}
                  />
                );
              })}
            </View>

            <ContextMenuButton
              isMenuPrimaryAction
              style={[styles.copyBtn]}
              onPressMenuItem={({nativeEvent}) => {
                switch (nativeEvent.actionKey) {
                  case 'hexcode':
                    if (typeof item?.color === 'string' && !!item?.color)
                      Clipboard.setString(item?.color);
                    break;
                  case 'name':
                    if (typeof item?.name === 'string' && !!item?.name)
                      Clipboard.setString(item?.name);
                    break;
                  case 'rgb':
                    if (typeof item?.color === 'string' && !!item?.color) {
                      const rgb = HexToRgb(item?.color);
                      Clipboard.setString(rgb);
                    }
                    break;
                  default:
                    break;
                }
                hapticFeedback('rigid');
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
                        actionKey: 'hexcode',
                        actionTitle: 'HEX CODE',
                        icon: {
                          type: 'IMAGE_SYSTEM',
                          imageValue: {
                            systemName: 'number',
                            weight: 'regular',
                          },
                        },
                      },
                      {
                        actionKey: 'name',
                        actionTitle: 'COLOR NAME',
                        icon: {
                          type: 'IMAGE_SYSTEM',
                          imageValue: {
                            systemName: 'textformat',
                            weight: 'regular',
                          },
                        },
                      },
                      {
                        actionKey: 'rgb',
                        actionTitle: 'RGB',
                        icon: {
                          type: 'IMAGE_SYSTEM',
                          imageValue: {
                            systemName: 'chevron.right.square',
                            weight: 'regular',
                          },
                        },
                      },
                    ],
                  },
                ],
              }}>
              <View style={[styles.copyBtn]}>
                <CopySimple
                  size={24}
                  weight="regular"
                  color={Colors[colorScheme].primary}
                />
              </View>
            </ContextMenuButton>
          </View>
        </View>
      </View>
    </>
  );
};

export default ColorShade;

const styles = StyleSheet.create({
  cover: {
    width: '100%',
  },
  container: {
    width: '100%',
    paddingLeft: 12,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  colorDetails: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
    color: '#999',
    marginBottom: 2,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
  hex: {
    fontSize: 12.5,
    marginLeft: 8,
    color: '#999',
    marginTop: 2,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },

  actionsContainer: {
    width: 236,
    maxWidth: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shades: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  shade: {
    width: '25%',
    height: '100%',
  },

  copyBtn: {
    marginLeft: 3.5,
    maxHeight: 40,
    height: '100%',
    paddingLeft: 3,
    paddingRight: 7.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
