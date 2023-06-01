import {
  Path,
  Cards,
  TextAa,
  Gradient,
  CaretDown,
  CircleHalf,
  ChartLineUp,
} from 'phosphor-react-native';
import {StyleSheet} from 'react-native';
import {MdText} from '@components/StyledText';
import useColorScheme from '@hooks/useColorScheme';
import {TouchableOpacity, View} from '@components/Themed';
import {ContextMenuButton} from 'react-native-ios-context-menu';

interface MethodSwitchProps {
  comparisonMethod: string;
  setComparisonMethod: (method: string) => void;
}

const MethodSwitch = ({
  comparisonMethod,
  setComparisonMethod,
}: MethodSwitchProps) => {
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#fff' : '#000';

  return (
    <ContextMenuButton
      isMenuPrimaryAction
      onPressMenuItem={async ({nativeEvent}) => {
        setComparisonMethod(nativeEvent.actionKey);
      }}
      menuConfig={{
        menuTitle: 'Choose Color Comparison Method',
        menuItems: [
          {
            type: 'menu',
            menuTitle: '',
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'gradient',
                actionTitle: 'Gradient',
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'slider.horizontal.below.rectangle',
                    weight: 'regular',
                  },
                },
              },

              {
                actionKey: 'blend',
                actionTitle: 'Color Blend',
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'paintpalette',
                    weight: 'regular',
                  },
                },
              },
              {
                actionKey: 'details',
                actionTitle: 'Details',
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'textformat',
                    weight: 'regular',
                  },
                },
              },
            ],
          },

          // Components
          {
            type: 'menu',
            menuTitle: 'Components',
            menuOptions: ['displayInline'],
            menuItems: [
              {
                actionKey: 'cards',
                actionTitle: 'Cards / Button',
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'rectangle.on.rectangle.angled',
                    weight: 'regular',
                  },
                },
              },
              {
                actionKey: 'charts',
                actionTitle: 'Charts',
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'chart.pie',
                    weight: 'regular',
                  },
                },
              },
              {
                actionKey: 'navbar',
                actionTitle: 'Navbar',
                icon: {
                  type: 'IMAGE_SYSTEM',
                  imageValue: {
                    systemName: 'list.bullet.rectangle.portrait',
                    weight: 'regular',
                  },
                },
              },
            ],
          },
        ],
      }}>
      <TouchableOpacity style={[styles.methodSwitch]}>
        {comparisonMethod === 'gradient' ? (
          <Gradient
            size={17.5}
            weight="bold"
            color={iconColor}
            style={{
              marginRight: 6,
            }}
          />
        ) : comparisonMethod === 'blend' ? (
          <CircleHalf
            size={16.5}
            weight="bold"
            color={iconColor}
            style={{
              marginRight: 6,
            }}
          />
        ) : comparisonMethod === 'details' ? (
          <View style={[styles.iconCover]}>
            <TextAa size={13} weight="bold" color={iconColor} style={{}} />
          </View>
        ) : comparisonMethod === 'cards' ? (
          <Cards
            size={16.5}
            weight="bold"
            color={iconColor}
            style={{
              marginRight: 6,
            }}
          />
        ) : comparisonMethod === 'charts' ? (
          <ChartLineUp
            size={16.5}
            weight="bold"
            color={iconColor}
            style={{
              marginRight: 6,
            }}
          />
        ) : comparisonMethod === 'navbar' ? (
          <Path
            size={16.5}
            weight="bold"
            color={iconColor}
            style={{
              marginRight: 6,
            }}
          />
        ) : null}

        <MdText style={[styles.selectedMethod]}>
          {comparisonMethod === 'cards'
            ? 'Cards / Button'
            : comparisonMethod === 'blend'
            ? 'Color Blend'
            : comparisonMethod}
        </MdText>

        <View
          style={{
            marginLeft: 10,
          }}>
          <CaretDown size={15} color={iconColor} weight="bold" />
        </View>
      </TouchableOpacity>
    </ContextMenuButton>
  );
};

export default MethodSwitch;

const styles = StyleSheet.create({
  methodSwitch: {
    paddingVertical: 6,
    borderColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMethod: {
    fontSize: 15,
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
  iconCover: {
    marginRight: 6,
    paddingBottom: 0.8,
    borderColor: '#ddd',
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
