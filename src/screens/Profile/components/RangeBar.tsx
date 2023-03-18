import {StyleSheet, View} from 'react-native';
import {MdText} from '../../../components/StyledText';
import {padding} from '../../../helpers/styles';

const RangeBar = () => {
  return (
    <View style={styles.rangeBar}>
      <MdText style={[styles.label]}>Color value</MdText>

      <View style={[styles.percentages]}>
        <View style={[styles.percentage]}>
          <MdText style={[styles.text]}>100%</MdText>
        </View>
        <View style={[styles.percentage]}>
          <MdText style={[styles.text]}>80%</MdText>
        </View>
        <View style={[styles.percentage]}>
          <MdText style={[styles.text]}>60%</MdText>
        </View>
        <View style={[styles.percentage]}>
          <MdText style={[styles.text]}>40%</MdText>
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
    ...padding(36, 14, 16, 6),
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
