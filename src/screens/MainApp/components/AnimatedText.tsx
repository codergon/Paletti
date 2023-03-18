import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

const AnimatedText = () => {
  const price = useSharedValue('#ff0');
  const formattedPrice = useDerivedValue(() => price.value);

  useEffect(() => {
    price.value = withDelay(
      2000,
      withTiming('#0f0', {
        duration: 2000,
      }),
    );
  }, []);

  return (
    <ReText
      text={formattedPrice}
      style={{color: 'black', fontVariant: ['tabular-nums']}}
    />
  );
};

export default AnimatedText;

const styles = StyleSheet.create({});
