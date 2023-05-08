import {View} from '../Themed';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useRef} from 'react';
import {MdText} from '../StyledText';
import useColorScheme from '../../hooks/useColorScheme';

const Loader = ({
  pb = 0,
  size = 120,
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
      <StatusBar barStyle="light-content" />

      <Animated.View style={animated ? [animatedStyle] : []}>
        {spinner ? (
          <ActivityIndicator size="large" color={altColor} />
        ) : (
          <Image
            source={require('../../assets/images/icon_transparent.png')}
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
    backgroundColor: '#111',
  },
  message: {
    fontSize: 15,
    color: '#8E8E93',
  },
});
