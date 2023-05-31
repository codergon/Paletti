import {RootTabScreenProps} from '../../types';
import {ScrollView, TouchableOpacity, View} from '../../components/Themed';
import {MdText} from '../../components/StyledText';
import styles from './palettes.styles';
import {Container} from '../../components/Customized';
import CreatePaletteButton from './components/CreatePaletteButton';
import {Export, SortAscending, SortDescending} from 'phosphor-react-native';
import Searchbar from '../../components/common/Searchbar';
import {useCallback, useEffect, useRef} from 'react';
import Palette from './components/Palette';
import {useStore} from '../../context/AppContext';
import ViewShot from 'react-native-view-shot';
import {useShare} from '../../context/ShareContext';
import Animated, {FadeOut, SlideInDown} from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import AppStatusBar from '../../components/common/AppStatusBar';
import {Swipeable} from 'react-native-gesture-handler';
import {useLogic} from '../../context/LogicContext';

const PalettesCollection = ({navigation}: RootTabScreenProps<'palettes'>) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const darkColor = isDark ? '#fff' : '#000';
  const successColor = isDark ? '#3cf2af' : '#279F73';
  const paletteBg = isDark ? Colors.dark.background : Colors.light.background;
  const {onScreenBlur} = useLogic();
  const {setImgUri, savePalette, sharePalette, statusMsg} = useShare();
  const {pinnedPalettes, filteredPalettes, order, toggleOrder} = useStore();
  const viewShotRef = useRef<ViewShot>(null);

  const onCapture = useCallback((uri: string) => {
    setImgUri(uri);
  }, []);

  useEffect(() => {
    const captureView = async () => {
      if (viewShotRef?.current?.capture) {
        await viewShotRef.current.capture();
      }
    };
    captureView();
  }, [filteredPalettes]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onScreenBlur('palettes');
    });

    return unsubscribe;
  }, [navigation]);

  const saveScreenshot = async () => {
    await savePalette();
  };
  const shareScreenshot = async () => {
    await sharePalette();
  };

  const palettesRef = useRef<Swipeable[]>([]);

  const closeOthers = (paletteId: string) => {
    palettesRef.current.forEach((swipeable, index) => {
      if (swipeable?.props?.id !== paletteId) {
        swipeable?.close();
      }
    });
  };

  return (
    <Container style={[styles.container]}>
      <AppStatusBar />

      <View style={[styles.header]}>
        <View style={[styles.headerTitle]}>
          <MdText style={[styles.headerTitleText]}>Saved Palettes</MdText>

          <View style={[styles.headerBtns]}>
            <TouchableOpacity
              onPress={toggleOrder}
              style={[
                styles.headerBtn,
                {
                  marginRight: 20,
                },
              ]}>
              {order === 'asc' ? (
                <SortAscending size={26} color={darkColor} weight="regular" />
              ) : (
                <SortDescending size={26} color={darkColor} weight="regular" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={shareScreenshot}
              style={[styles.headerBtn]}>
              <Export
                size={25}
                color={filteredPalettes?.length > 0 ? darkColor : '#8F8E93'}
                weight="regular"
              />
            </TouchableOpacity>
          </View>
        </View>

        {(statusMsg?.message?.length || 0) > 0 && (
          <View style={styles.statusMsgCover}>
            <Animated.View
              exiting={FadeOut}
              entering={SlideInDown}
              style={styles.blockCenter}>
              <MdText
                style={[
                  statusMsg?.type === 'error'
                    ? styles.warning_text
                    : statusMsg?.type === 'success'
                    ? {color: successColor}
                    : {color: darkColor},
                  {
                    fontSize: 13,
                  },
                ]}>
                {statusMsg?.message}
              </MdText>
            </Animated.View>
          </View>
        )}

        <View style={[styles.searchbar__cover]}>
          <Searchbar
            showMargin={!((statusMsg?.message?.length || 0) > 0)}
            placeholder="Search for a palette"
          />
        </View>
      </View>

      {filteredPalettes?.length > 0 || pinnedPalettes?.length > 0 ? (
        <ScrollView contentContainerStyle={[styles.paletteList]}>
          <ViewShot
            ref={viewShotRef}
            onCapture={onCapture}
            style={{
              ...styles.viewShot,
              backgroundColor: paletteBg,
            }}
            options={{
              quality: 0.9,
              format: 'png',
            }}>
            {pinnedPalettes?.map((item, index) => {
              return (
                <Palette
                  key={item?.id}
                  palette={item}
                  listIndex={index}
                  closeOthers={closeOthers}
                  palettesRef={palettesRef}
                />
              );
            })}

            {pinnedPalettes?.length > 0 && (
              <View
                style={[
                  styles.divider,
                  {
                    backgroundColor: isDark ? '#3b3b3b' : '#ebebeb',
                  },
                ]}
              />
            )}

            {filteredPalettes?.map((item, index) => {
              return (
                <Palette
                  key={item?.id}
                  palette={item}
                  closeOthers={closeOthers}
                  palettesRef={palettesRef}
                  listIndex={pinnedPalettes?.length + index}
                />
              );
            })}
          </ViewShot>
        </ScrollView>
      ) : (
        <View style={[styles.emptyState]}>
          <MdText style={[styles.emptyState__text]}>
            No palette in your collection yet
          </MdText>
        </View>
      )}

      <CreatePaletteButton />
    </Container>
  );
};

export default PalettesCollection;
