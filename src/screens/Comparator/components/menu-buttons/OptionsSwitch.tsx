import MethodSwitch from './MethodSwitch';
import styles from '../../comparator.styles';
import {MdText} from '@components/StyledText';
import useColorScheme from '@hooks/useColorScheme';
import {TouchableOpacity, View} from '@components/Themed';
import {ContextMenuButton} from 'react-native-ios-context-menu';
import {ArrowLeft, ArrowRight, CaretDown} from 'phosphor-react-native';

interface OptionsSwitchProps {
  option: string;
  activeStep: number;
  comparisonMethod: string;
  onSwitch: (option: string) => Promise<void>;
  setComparisonMethod: (method: string) => void;
  handleNavigation: (action: 'inc' | 'dec') => void;
}

const OptionsSwitch = ({
  option,
  onSwitch,
  activeStep,
  handleNavigation,
  comparisonMethod,
  setComparisonMethod,
}: OptionsSwitchProps) => {
  const isDark = useColorScheme() === 'dark';
  const textColor = isDark ? '#fff' : '#000';
  const navBtnColor = isDark ? '#444' : '#ededed';

  return (
    <View style={[styles.sectionTitle]}>
      {activeStep >= 2 ? (
        <MethodSwitch {...{comparisonMethod, setComparisonMethod}} />
      ) : (
        <ContextMenuButton
          isMenuPrimaryAction
          style={[styles.selectorSwitch]}
          onPressMenuItem={async ({nativeEvent}) => {
            await onSwitch(nativeEvent.actionKey);
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
                    actionKey: 'picker',
                    actionTitle: 'Color picker',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'slider.horizontal.below.rectangle',
                        weight: 'regular',
                      },
                    },
                  },
                  {
                    actionKey: 'camera',
                    actionTitle: 'Camera',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'camera.viewfinder',
                        weight: 'regular',
                      },
                    },
                  },
                  {
                    actionKey: 'image',
                    actionTitle: 'Image',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'rectangle.split.3x1',
                        weight: 'regular',
                      },
                    },
                  },
                  {
                    actionKey: 'input',
                    actionTitle: 'Input',
                    icon: {
                      type: 'IMAGE_SYSTEM',
                      imageValue: {
                        systemName: 'textbox',
                        weight: 'regular',
                      },
                    },
                  },
                ],
              },
            ],
          }}>
          <View style={[styles.selectorSwitch]}>
            <MdText
              style={{
                fontSize: 19,
                color: textColor,
                letterSpacing: 0.35,
              }}>
              {option === 'picker'
                ? 'Color Picker'
                : option === 'camera'
                ? 'Camera'
                : option === 'image'
                ? 'Image'
                : 'Manual Input'}
            </MdText>
            <CaretDown
              size={15}
              weight="bold"
              color={'#8F8E93'}
              style={{
                marginTop: 3,
                marginLeft: 8,
              }}
            />
          </View>
        </ContextMenuButton>
      )}

      <View style={[styles.navBtns]}>
        <TouchableOpacity
          onPress={() => handleNavigation('dec')}
          style={[
            styles.navBtn,
            {
              backgroundColor: navBtnColor,
            },
          ]}>
          <ArrowLeft size={16} weight="bold" color={textColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNavigation('inc')}
          style={[
            styles.navBtn,
            {
              backgroundColor: navBtnColor,
            },
          ]}>
          <ArrowRight size={16} weight="bold" color={textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OptionsSwitch;
