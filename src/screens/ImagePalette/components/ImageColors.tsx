import ntc from '../../../lib/ntc';
import Layout from '../../../constants/Layout';
import {padding} from '../../../helpers/styles';
import {View} from '../../../components/Themed';
import {CheckCircle} from 'phosphor-react-native';
import {useStore} from '../../../context/AppContext';
import {MdText} from '../../../components/StyledText';
import {validateColor} from '../../../helpers/colors';
import {StyleSheet, TouchableOpacity} from 'react-native';
import useColorScheme from '../../../hooks/useColorScheme';

interface ImageColorsProps {
  colors?: string[];
}

const ImageColors = ({colors}: ImageColorsProps) => {
  const colorScheme = useColorScheme();
  const {isColorInCollection, addNewColor} = useStore();

  const isDark = colorScheme === 'dark';
  const borderColor = isDark ? '#2d2d2d' : '#e4e4e4';
  const invertedColor = isDark ? '#ffffff' : '#000000';

  const saveColor = (color: string) => addNewColor(color);

  return (
    <View style={styles.colorsItems}>
      {colors?.slice(0, 4).map((item, index) => {
        const colorExists = isColorInCollection(item);

        return (
          <View
            key={item}
            style={[
              styles.colorItem,

              {
                borderColor,
                backgroundColor: isDark ? '#333' : '#eee',
              },
            ]}>
            <View style={[styles.rowCenter, styles.colorContent]}>
              <View
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: validateColor(item) ? item : '#000',
                  },
                ]}
              />

              <View
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                }}>
                <MdText
                  style={[
                    styles.colorName,
                    {
                      color: invertedColor,
                    },
                  ]}
                  numberOfLines={1}>
                  {ntc.name(item) || item}
                </MdText>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => saveColor(validateColor(item) ? item : '#000')}
              style={[
                styles.saveBtn,
                {
                  borderColor,
                },
              ]}>
              <CheckCircle
                size={colorExists ? 19.5 : 18}
                weight={colorExists ? 'fill' : 'bold'}
                color={invertedColor}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ImageColors;

const styles = StyleSheet.create({
  colorsItems: {
    width: '100%',
    flexWrap: 'wrap',
    ...padding(8, 0, 0),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  colorItem: {
    borderRadius: 16,
    ...padding(7, 7),
    marginVertical: 7,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    width: Layout.appWidth / 2 - 14 / 2,
  },
  colorContent: {
    overflow: 'hidden',
  },
  colorBox: {
    width: 24,
    height: 24,
    borderRadius: 10,
  },
  colorName: {
    fontSize: 13,
    marginLeft: 8,
    marginRight: 5,
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  saveBtn: {
    width: 24,
    marginLeft: 3,
    marginRight: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
