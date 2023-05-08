import {Hue} from '../../../types/palette';
import Animated from 'react-native-reanimated';
import {MdText} from '../../../components/StyledText';
import {StyleSheet, View, useColorScheme} from 'react-native';

type ColorShadeProps = {
  item: Hue;
  highlightColor: string;
};
const ColorShade = ({item, highlightColor}: ColorShadeProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const darkColor = isDark ? '#fff' : '#000';
  const borderColor = isDark ? '#555' : '#d4d4d4';

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
          <MdText
            style={[
              styles.text,
              {
                color: darkColor,
              },
            ]}>
            {item?.displayName}
          </MdText>

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
    // padding: 14,
    // marginVertical: 10,

    width: '100%',
    borderRadius: 50,
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 8,
    color: '#999',
    fontSize: 14,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },

  shades: {
    width: 206,
    height: 34,
    maxWidth: '70%',
    borderRadius: 40,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  shade: {
    width: '25%',
    height: '100%',
  },
});
