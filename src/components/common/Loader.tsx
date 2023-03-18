import {View} from '../Themed';
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Icons from '../Icons';
import {useRef} from 'react';
import {MdText} from '../StyledText';

const Loader = ({
  pb = 0,
  size = 70,
  message = '',
  nextline = '',
  spinner = false,
  animated = false,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const altColor = isDark ? '#bbb' : '#808080';

  const fadeAnim = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const interpolated = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolated,
      },
    ],
  };

  return (
    <View style={{...styles.container, paddingBottom: pb}}>
      <Animated.View style={animated ? [animatedStyle] : []}>
        {spinner ? (
          <ActivityIndicator size="large" color={altColor} />
        ) : (
          <Icons.Logo
            style={{
              width: size,
              height: size,
            }}
          />
        )}
      </Animated.View>

      {message && (
        <MdText style={{...styles.message, marginTop: 20}}>{message}</MdText>
      )}
      {nextline && (
        <MdText style={{...styles.message, marginTop: 4}}>{nextline}</MdText>
      )}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 15,
    color: '#8E8E93',
  },
});
