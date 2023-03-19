import {Hue} from '../../../types/profile';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {MdText} from '../../../components/StyledText';

const ColorShade = ({color, shades, name}: Hue) => {
  return (
    <View style={[styles.container]}>
      <MdText style={[styles.text]}>{name}</MdText>

      <View style={[styles.shades]}>
        {shades?.map((item, index) => {
          return (
            <Animated.View
              key={index}
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
  );
};

export default ColorShade;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    width: '100%',
    borderRadius: 50,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 8,
    color: '#999',
    fontSize: 13.5,
    textTransform: 'capitalize',
  },

  shades: {
    width: 206,
    height: 40,
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
