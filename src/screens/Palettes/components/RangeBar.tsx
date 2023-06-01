import {padding} from '@helpers/styles';
import {StyleSheet, View} from 'react-native';
import {MdText} from '@components/StyledText';
import useColorScheme from '@hooks/useColorScheme';

type RangeBarProps = {};

const RangeBar = ({}: RangeBarProps) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const darkColor = isDark ? '#777' : '#aaa';

  return (
    <View style={[styles.rangeBar]}>
      <MdText
        style={[
          styles.label,
          {
            color: darkColor,
          },
        ]}>
        Color Shades
      </MdText>

      <View style={[styles.percentages]}>
        <View style={[styles.percentage]}>
          <MdText
            style={[
              styles.text,
              {
                color: darkColor,
              },
            ]}>
            100%
          </MdText>
        </View>
        <View style={[styles.percentage]}>
          <MdText
            style={[
              styles.text,
              {
                color: darkColor,
              },
            ]}>
            80%
          </MdText>
        </View>
        <View style={[styles.percentage]}>
          <MdText
            style={[
              styles.text,
              {
                color: darkColor,
              },
            ]}>
            60%
          </MdText>
        </View>
        <View style={[styles.percentage]}>
          <MdText
            style={[
              styles.text,
              {
                color: darkColor,
              },
            ]}>
            40%
          </MdText>
        </View>
      </View>
    </View>
  );
};

export default RangeBar;

const styles = StyleSheet.create({
  rangeBar: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    ...padding(6, 35, 16, 6),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
  },
  text: {
    color: '#aaa',
    fontSize: 14,
  },

  percentages: {
    width: 236 - 50,
    maxWidth: '70%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  percentage: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
