import {useState} from 'react';
import {Hue} from '@typings/palette';
import {StyleSheet} from 'react-native';
import {View} from '@components/Themed';
import useColorScheme from '@hooks/useColorScheme';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';

interface GradientProps {
  colors: Hue[];
}

const Gradient = ({colors}: GradientProps) => {
  const isDark = useColorScheme() === 'dark';
  const maximumTrackTintColor = isDark ? '#555' : '#aaa';
  const minimumTrackTintColor = isDark ? '#fff' : '#111';
  const [angle, setAngle] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        paddingVertical: 2,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
      }}>
      <Slider
        value={0.25}
        minimumValue={0}
        maximumValue={1}
        maximumTrackTintColor={maximumTrackTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
        onValueChange={value => {
          setAngle(value * 360);
        }}
        style={{width: '100%', height: 40, marginBottom: 16}}
      />

      <LinearGradient
        angle={angle}
        useAngle={true}
        style={styles.linearGradient}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={[...colors?.map(item => item.color)]}
      />
    </View>
  );
};

export default Gradient;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#999',
  },
});
