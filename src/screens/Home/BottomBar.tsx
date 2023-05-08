import {
  Palette,
  FloppyDisk,
  ArrowsClockwise,
  GooglePhotosLogo,
} from 'phosphor-react-native';
import styles from './home.styles';
import {useEffect, useState} from 'react';
import SaveButton from './components/SaveButton';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import Animated, {
  FadeOut,
  runOnJS,
  SlideInDown,
  useSharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {StatusMsg} from '../../types/profile';
import {MdText} from '../../components/StyledText';
import {useNavigation} from '@react-navigation/native';
import useColorScheme from '../../hooks/useColorScheme';
import {hapticFeedback} from '../../utils/hapticFeedback';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useStore} from '../../context/AppContext';

type BottomBarprops = {
  openProfile: () => void;
  toggleCamera: () => boolean;
  saveCameraFrame?: () => Promise<boolean | null>;
  color: Animated.SharedValue<string>;
};

const BottomBar = ({
  color,
  toggleCamera,
  saveCameraFrame,
  openProfile,
}: BottomBarprops) => {
  const {addNewColor} = useStore();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#2d2d2d' : '#e4e4e4';
  const normalColor = isDark ? '#000000' : '#ffffff';

  const insets = useSafeAreaInsets();
  const isSaving = useSharedValue(false);
  const [saving, setSaving] = useState(false);

  const [localColor, setLocalColor] = useState('#000000');
  const [statusMsg, setStatusMsg] = useState<StatusMsg>(null);

  const showStatusMsg = (data: StatusMsg, cb?: () => void) => {
    setStatusMsg(data);

    setTimeout(() => {
      setStatusMsg(null);
      cb && cb();
    }, 3000);
  };

  const [recentImgUri, setRecentImgUri] = useState('');

  const getMostRecent = async () => {
    try {
      const lastSaved = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos',
      });
      const imgUri = lastSaved.edges[0].node.image.uri;
      Image.getSize(imgUri, (width, height) => {
        setRecentImgUri(imgUri);
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    getMostRecent();
  }, []);

  const wrapper = (col: string) => {
    setLocalColor(col);
  };
  useAnimatedReaction(
    () => color.value,
    (value, prev) => {
      if (value !== prev) {
        runOnJS(wrapper)(value);
      }
    },
    [color],
  );

  const saveColor = async (color = localColor || '#a25793') => {
    addNewColor(color);
  };

  useEffect(() => {
    if (!saving) return;

    saveColor();

    const id = setTimeout(() => {
      setSaving(false);
    }, 2000);

    return () => clearTimeout(id);
  }, [saving]);

  const processColor = () => {
    setSaving(true);
    hapticFeedback('notificationSuccess');
  };

  const actionButtons = [
    {
      icon: (
        <>
          {recentImgUri ? (
            <Image
              style={[
                styles.recentImage,
                {
                  borderColor: '#444',
                  backgroundColor: bgColor,
                },
              ]}
              source={{uri: recentImgUri}}
            />
          ) : (
            <GooglePhotosLogo color={'#fff'} size={24} weight="light" />
          )}
        </>
      ),
      onPress: () => {
        navigation.navigate('imagePalette');
      },
    },
    {
      // icon: <Icons.BodyScan size={18} color={invertedColor} />,
      icon: <FloppyDisk color="#fff" size={24} weight="regular" />,
      onPress: async () => {
        if (saveCameraFrame) {
          const result = await saveCameraFrame();
          if (result) {
            showStatusMsg({
              message: 'Image saved succesfully',
              type: 'success',
            });
            getMostRecent();
          } else if (result === null) {
            showStatusMsg(
              {
                message:
                  'Access to photo library was denied. Please grant access',
                type: 'error',
              },
              () => {
                Linking.openSettings();
              },
            );
          } else {
            showStatusMsg({
              message: 'Error saving captured image',
              type: 'error',
            });
          }
        }
      },
    },
    {
      icon: (
        <SaveButton isSaving={isSaving} saving={saving} color={normalColor} />
      ),
      onPress: processColor,
    },
    {
      icon: <ArrowsClockwise size={24} color="#fff" weight="regular" />,
      onPress: () => {
        if (toggleCamera) {
          const result = toggleCamera();
          if (!result) {
            showStatusMsg({
              message: 'Error switching camera',
              type: 'error',
            });
          }
        }
      },
    },
    {
      icon: <Palette size={24} color="#fff" weight="regular" />,
      onPress: () => openProfile(),
    },
  ];

  return (
    <View
      style={[
        styles.bottomBar,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={styles.statusMsgCover}>
        {(statusMsg?.message.length || 0) > 0 ? (
          <Animated.View
            exiting={FadeOut}
            entering={SlideInDown}
            style={styles.blockCenter}>
            <MdText
              style={[
                statusMsg?.type === 'error'
                  ? styles.warning_text
                  : statusMsg?.type === 'success'
                  ? styles.success_text
                  : styles.normal_text,
                {
                  fontSize: 13,
                },
              ]}>
              {statusMsg?.message}
            </MdText>
          </Animated.View>
        ) : (
          <></>
        )}
      </View>

      <View style={[styles.bottomBarBlock]}>
        {actionButtons.map((button, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                index === 2
                  ? [styles.mainButton, {borderColor: '#fff'}]
                  : styles.actionBtn,
              ]}
              onPress={button.onPress}>
              {button.icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomBar;
