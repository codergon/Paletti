import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Hue} from '../../../../types/palette';
import {edges} from '../../../../helpers/styles';
import {Backspace} from 'phosphor-react-native';
import {View} from '../../../../components/Themed';
import {StyleSheet, useColorScheme} from 'react-native';
import {BdText, MdText} from '../../../../components/StyledText';

type PreviewColorProps = {
  preview: Hue;
  deleteColor: (id: string) => void;
};
const PreviewColor = ({preview, deleteColor}: PreviewColorProps) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const darkColor = isDark ? '#fff' : '#000';
  const bgColor = isDark ? '#383838' : '#eee';
  const hexColor = isDark ? '#aeaeae' : '#666';
  const borderColor = isDark ? '#444' : '#ccc';

  return (
    <>
      <Menu style={[styles.paletteItem]}>
        <MenuTrigger>
          <View
            style={[
              styles.palletteItemInner,
              {
                backgroundColor: preview?.color,
              },
            ]}
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: styles.optionsContainer,
            optionsWrapper: {
              borderColor,
              borderWidth: 1,
              ...styles.optionsWrapper,
              backgroundColor: bgColor,
            },
          }}>
          <View style={styles.colorDetails}>
            <BdText
              style={[
                styles.colorName,
                {
                  color: darkColor,
                },
              ]}>
              {preview?.name}
            </BdText>
            <MdText
              style={[
                styles.colorHex,
                {
                  color: hexColor,
                },
              ]}>
              {preview?.color}
            </MdText>
          </View>

          <MenuOption
            style={[styles.deleteBtn]}
            onSelect={() => {
              deleteColor(preview?.id);
            }}>
            <Backspace color={'#bc301a'} size={21} weight="regular" />
          </MenuOption>
        </MenuOptions>
      </Menu>
    </>
  );
};

export default PreviewColor;

const styles = StyleSheet.create({
  paletteItem: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  palletteItemInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  optionsContainer: {
    width: 'auto',
    marginTop: -66,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  optionsWrapper: {
    padding: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    ...edges(10, 15, 15, 10),
  },
  colorDetails: {
    minWidth: 94,
    height: '100%',
    paddingLeft: 6,
    marginRight: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  colorName: {
    fontSize: 15,
    marginBottom: 1,
    letterSpacing: 0.45,
    textTransform: 'capitalize',
  },
  colorHex: {
    marginTop: 1,
    fontSize: 13,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  deleteBtn: {
    width: 43,
    height: 43,
    borderWidth: 0.3,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#bc301a',
    justifyContent: 'center',
    backgroundColor: '#f4d6d7',
  },
});
