import {padding} from '@helpers/styles';
import {StyleSheet, View} from 'react-native';
import {MdText} from '@components/StyledText';

type RangeBarProps = {
  darkColor: string;
  borderColor: string;
};

const RangeBar = ({darkColor, borderColor}: RangeBarProps) => {
  return (
    <View
      style={[
        styles.rangeBar,
        {
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
        },
      ]}>
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
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    ...padding(10, 6, 20, 6),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
  },
  text: {
    color: '#aaa',
    fontSize: 13,
  },

  percentages: {
    width: 204,
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
