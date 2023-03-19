import {
  ArrowsClockwise,
  GooglePhotosLogo,
  Palette,
} from 'phosphor-react-native';
import {TouchableOpacity, View} from 'react-native';
import Img from '../../components/common/Img';
import useColorScheme from '../../hooks/useColorScheme';
import RecentColors from './components/RecentColors';
import styles from './mainapp.styles';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSharedValue} from 'react-native-reanimated';
import Icons from '../../components/Icons';
import SaveButton from './SaveButton';
import {useEffect, useState} from 'react';
import {hapticFeedback} from '../../utils/hapticFeedback';
import chroma from 'chroma-js';
import ntc from '../../lib/ntc';
import {nanoid} from 'nanoid';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {setCollection} from '../../store/profile/profileSlice';

type BottomBarprops = {
  openProfile: () => void;
};

const BottomBar = ({openProfile}: BottomBarprops) => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const invCol = isDark ? '#ffffff' : '#000000';
  const realCol = isDark ? '#000000' : '#ffffff';

  const insets = useSafeAreaInsets();
  const isSaving = useSharedValue(false);
  const [saving, setSaving] = useState(false);

  const {collection} = useAppSelector(state => state.profile);

  const saveColor = () => {
    const color = '#af9e5f';

    if (
      (collection && collection[color]) ||
      typeof color !== 'string' ||
      color[0] !== '#' ||
      color.length < 4 ||
      color.length > 7 ||
      [3, 6].includes(color.length)
    )
      return;

    const hue = {
      color,
      id: nanoid(),
      name: ntc.name(color),
      shades: chroma.scale([color, '#ffffff']).colors(5).slice(0, 4),
    };

    const newCollection = {
      ...collection,
      [color]: hue,
    };

    dispatch(setCollection(newCollection));
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
    // isSaving.value = true;
    // setTimeout(() => (isSaving.value = false), 2000);
  };

  const actionButtons = [
    {
      icon: (
        <GooglePhotosLogo
          color={invCol}
          size={24}
          weight={isDark ? 'light' : 'regular'}
        />
      ),
      onPress: () => {},
    },
    {
      icon: <Icons.BodyScan size={18} color={invCol} />,
      onPress: () => {},
    },
    {
      icon: <SaveButton isSaving={isSaving} saving={saving} color={realCol} />,
      onPress: processColor,
    },
    {
      icon: (
        <ArrowsClockwise
          color={invCol}
          size={24}
          weight={isDark ? 'regular' : 'regular'}
        />
      ),
      onPress: () => {},
    },
    {
      icon: (
        <Palette
          color={invCol}
          size={24}
          weight={isDark ? 'regular' : 'regular'}
        />
      ),
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
      <View style={[styles.bottomBarBlock]}>
        {actionButtons.map((button, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                index === 2
                  ? [styles.mainButton, {borderColor: invCol}]
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
