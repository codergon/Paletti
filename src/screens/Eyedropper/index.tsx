import {useEffect} from 'react';
import styles from './eyedropper.styles';
import {View} from '../../components/Themed';
import BottomBar from './components/BottomBar';
import {RootTabScreenProps} from '../../types';
import CameraView from './components/CameraView';
import ImageColors from './components/ImageColors';
import {useLogic} from '../../context/LogicContext';
import useColorScheme from '../../hooks/useColorScheme';
import AddColorButton from './components/AddColorButton';
import AppStatusBar from '../../components/common/AppStatusBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Eyedropper = ({navigation}: RootTabScreenProps<'eyedropper'>) => {
  const scheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const {isDominant, onScreenBlur, setMaxHeight, selectedImg} = useLogic();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onScreenBlur('eyedropper');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <AppStatusBar />

      <View
        style={[
          styles.container,
          {
            backgroundColor: scheme === 'dark' ? '#888' : '#bbb',
          },
        ]}>
        <View
          onLayout={e => {
            const {height} = e.nativeEvent.layout;
            setMaxHeight(height - insets.top);
          }}
          style={[
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              paddingTop: selectedImg ? insets.top : 0,
            },
          ]}>
          {!selectedImg ? <CameraView /> : <ImageColors />}
          {!isDominant && <AddColorButton />}
        </View>

        <BottomBar />
      </View>
    </>
  );
};

export default Eyedropper;
