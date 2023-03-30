import {useEffect, useState} from 'react';
import Layout from '../../constants/Layout';
import {View} from '../../components/Themed';
import {padding} from '../../helpers/styles';
import {CaretLeft} from 'phosphor-react-native';
import {MdText} from '../../components/StyledText';
import ImageColors from './components/ImageColors';
import ColorPicker from 'react-native-image-colors';
import useColorScheme from '../../hooks/useColorScheme';
import {Image, StatusBar, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {nanoid} from 'nanoid';

const IMAGE_RATIO = 0.6;
const CONTAINER_PADDING = 6;

const CONTENT_RATIO = 1 - IMAGE_RATIO;
const IMG_HEIGHT = Layout.window.height * IMAGE_RATIO;
const CONTENT_HEIGHT = Layout.window.height * CONTENT_RATIO;
const MAX_HEIGHT =
  CONTENT_HEIGHT > 194 ? IMG_HEIGHT : Layout.window.height - 194;
const MAX_WIDTH = Layout.window.width - 40 - CONTAINER_PADDING * 2;

const ImagePalette = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const borderColor = isDark ? '#2d2d2d' : '#e4e4e4';
  const normalColor = isDark ? '#000000' : '#ffffff';
  const invertedColor = isDark ? '#ffffff' : '#000000';

  const insets = useSafeAreaInsets();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [currentUri, setCurrentUri] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [recentImgUri, setRecentImgUri] = useState('');

  const goBack = () => navigation.goBack();

  useEffect(() => {
    const getMostRecent = async () => {
      const lastSaved = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos',
      });
      const imgUri = lastSaved.edges[0].node.image.uri;
      Image.getSize(imgUri, (width, height) => {
        setRecentImgUri(imgUri);
      });
    };

    getMostRecent();
    openGallery();
  }, []);

  const openGallery = async () => {
    launchImageLibrary(
      {
        quality: 1,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        presentationStyle: 'fullScreen',
      },
      async response => {
        const {assets} = response;
        if (assets) {
          const {uri} = assets[0];
          const imgWidth = assets[0].width || 0;
          const imgHeight = assets[0].height || 0;

          // Calculate Image Size
          const ratio = imgHeight / imgWidth;
          const minRatio = MAX_HEIGHT / MAX_WIDTH - 0.05;

          const calculatedWidth =
            ratio > 1
              ? imgWidth > MAX_WIDTH
                ? ratio < minRatio
                  ? MAX_WIDTH
                  : MAX_HEIGHT / ratio
                : imgHeight < MAX_HEIGHT
                ? imgWidth
                : MAX_HEIGHT / ratio
              : imgWidth < MAX_WIDTH
              ? imgWidth
              : MAX_WIDTH;

          const calculatedHeight =
            ratio > 1
              ? imgWidth > MAX_WIDTH
                ? ratio < minRatio
                  ? MAX_WIDTH * ratio
                  : MAX_HEIGHT
                : imgHeight < MAX_HEIGHT
                ? imgHeight
                : MAX_HEIGHT
              : imgWidth < MAX_WIDTH
              ? imgHeight
              : MAX_WIDTH * ratio;

          setWidth(calculatedWidth);
          setHeight(calculatedHeight);
          setCurrentUri(uri || '');

          const result = await ColorPicker.getColors(uri || '', {
            cache: false,
            key: nanoid(),
            fallback: '#228B22',
          });
          const colorResults = Object.values(result);
          setColors(colorResults);
        }
      },
    );
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            ...padding(insets.top + 4, 20, insets.bottom),
          },
        ]}>
        <StatusBar animated={true} barStyle="default" />

        <View
          style={[
            styles.header,
            {
              borderColor,

              borderBottomWidth: currentUri ? 1 : 0,
            },
          ]}>
          <TouchableOpacity
            onPress={goBack}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CaretLeft size={19} color={invertedColor} weight="bold" />
            <MdText
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: invertedColor,
              }}>
              Back
            </MdText>
          </TouchableOpacity>

          {currentUri && (
            <TouchableOpacity
              onPress={openGallery}
              style={[
                styles.recentImagePreview,
                {
                  borderColor: isDark ? '#444' : '#eee',
                  backgroundColor: borderColor,
                },
              ]}>
              {recentImgUri && (
                <Image
                  style={[styles.recentImage]}
                  source={{uri: recentImgUri}}
                />
              )}
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.imageDisplay]}>
          {currentUri ? (
            <View
              lightColor="#e8e8e8"
              darkColor="#2d2d2d"
              style={[styles.imageContainer]}>
              {currentUri && (
                <Image
                  style={{width, height, borderRadius: 8}}
                  source={{uri: currentUri}}
                />
              )}
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                paddingBottom: 70,
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <View
                style={{
                  paddingHorizontal: 2,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <Image
                  resizeMode="cover"
                  style={styles.emptyStateImage}
                  source={require(`../../assets/images/emptystate/Search.png`)}
                  // source={require(`../../assets/images/emptystate/NewItem.png`)}
                />

                <MdText
                  style={{
                    fontSize: 20,
                    lineHeight: 28,
                  }}>
                  Browse through your gallery to extract colors and create
                  palettes from your favorite images
                </MdText>
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={openGallery}
                  style={{
                    width: Layout.appWidth,
                    marginTop: 24,
                    borderRadius: 8,
                    alignItems: 'center',
                    flexDirection: 'row',
                    ...padding(10, 16, 11),
                    justifyContent: 'center',
                    backgroundColor: isDark ? '#f1f1f1' : '#111',
                  }}>
                  <MdText
                    style={{
                      fontSize: 15.5,
                      lineHeight: 28,
                      color: normalColor,
                      // textTransform: 'uppercase',
                    }}>
                    Select Image
                  </MdText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {Boolean(colors?.length > 0) && (
          <View style={[styles.bottomBar]}>
            <ImageColors colors={colors} />
          </View>
        )}
      </View>
    </>
  );
};

export default ImagePalette;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    ...padding(2, 0, 10),
    justifyContent: 'space-between',
  },

  // Recent Image Preveiw
  recentImagePreview: {
    width: 41,
    height: 41,
    borderWidth: 2,
    borderRadius: 80,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },

  // Selected Image Display
  imageDisplay: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: CONTAINER_PADDING,
  },

  // Bottom Bar
  bottomBar: {
    width: '100%',
    ...padding(0, 0, 20),
    flexDirection: 'column',
  },

  // Empty State
  emptyStateImage: {
    width: 130,
    height: 130,
    borderRadius: 90,
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
  },
});
