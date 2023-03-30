import {
  Animated,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import styles from './splash.styles';
import {useRef, useState} from 'react';
import Br from '../../components/common/Br';
import {View} from '../../components/Themed';
import {ArrowRight} from 'phosphor-react-native';
import {RootStackScreenProps} from '../../types';
import {useStores} from '../../store/RootStore';
import FeaturesCard from './components/FeaturesCard';
import {MdText, RgText} from '../../components/StyledText';
import AppStatusBar from '../../components/common/AppStatusBar';
import data, {carouselSpec} from '../../constants/data/onboarding';

const {FULL_SIZE} = carouselSpec;

type CarouselProps = {
  item: (typeof data)[0];
  index: number;
};

const Splash = ({navigation}: RootStackScreenProps<'splash'>) => {
  const store = useStores();
  const [isLastItem, setIsLastItem] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const requestPermission = async () => {
    const isAuthorized = await store.appStore.requestCameraAccess();
    if (isAuthorized) {
      navigation.navigate('home');
    }
  };

  const carousel = ({item, index}: CarouselProps) => {
    const inputRange = [
      (index - 1) * FULL_SIZE,
      (index + 0) * FULL_SIZE,
      (index + 1) * FULL_SIZE,
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [40, 0, -0],
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [14, 0, -0],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 10.0],
      extrapolate: 'clamp',
    });

    return (
      <FeaturesCard feature={item}>
        <Animated.Text
          style={[
            styles.featuresCard__Text,
            {
              opacity: index < data.length - 1 || !isLastItem ? opacity : 1,
              transform: [
                {
                  translateX: index < data.length - 1 ? translateX : 0,
                },
                {
                  translateY: index < data.length - 1 ? translateY : 0,
                },
              ],
            },
          ]}>
          {item?.text}
        </Animated.Text>
      </FeaturesCard>
    );
  };

  return (
    <View lightColor="#111" style={[styles.container]}>
      <AppStatusBar barStyle={'dark-content'} />

      <View style={[styles.overlay]}>
        <View style={[styles.overlayHeading]}>
          <MdText style={[styles.overlayHeading__Text]}>
            Welcome to Paletti,
          </MdText>
          <RgText style={[styles.overlayHeading__Text__sub]}>
            Curate your personal collection of colors by scanning your
            surroundings anywhere, anytime.
          </RgText>
        </View>

        <View style={[styles.scrollviewContainer]}>
          <Animated.FlatList
            horizontal
            data={data}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: true,
                listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                  if (
                    e.nativeEvent.contentOffset.x >
                    (data?.length - 2) * FULL_SIZE
                  ) {
                    setIsLastItem(true);
                  } else {
                    setIsLastItem(false);
                  }
                },
              },
            )}
            decelerationRate="fast"
            snapToInterval={FULL_SIZE}
            keyExtractor={item => item.key}
            showsHorizontalScrollIndicator={false}
            renderItem={carousel}
          />
        </View>
      </View>

      <View style={[styles.footer]}>
        <View style={[styles.footer__Button__Container]}>
          <View style={[styles.footer__Button__Outline]} />

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={requestPermission}
            style={[styles.footer__Button]}>
            <RgText style={[styles.footer__Button__Text]}>
              To continue, Paletti needs access to your <Br />
              camera and photos
            </RgText>

            <View style={[styles.footer__Button__Icon]}>
              <ArrowRight weight="bold" color="#000" size={15} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Splash;
