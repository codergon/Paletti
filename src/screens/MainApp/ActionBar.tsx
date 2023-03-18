import {
  ArrowsClockwise,
  Lightning,
  LightningSlash,
} from 'phosphor-react-native';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icons from '../../components/Icons';
import useColorScheme from '../../hooks/useColorScheme';
import styles from './mainapp.styles';

type Props = {
  flashMode: any;
  setFlashMode?: (f: any) => void;
  toggleCameraType: () => void;
};

const ActionBar = ({flashMode, toggleCameraType, setFlashMode}: Props) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const invCol = isDark ? '#ffffff' : '#ffffff';

  return (
    <View
      style={[
        styles.topBar,
        {
          top: insets.top + 10,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.actionButton,
          styles.coveredBtn,
          {
            width: 36,
            height: 36,
          },
        ]}
        onPress={toggleCameraType}>
        <View style={[styles.bgActBtn]} />
        <Icons.BodyScan size={18} color={invCol} />
      </TouchableOpacity>

      <View style={[styles.topActionBtns]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.actionButton,
            styles.coveredBtn,
            {
              marginLeft: 16,
            },
          ]}
          onPress={() => {
            const newVal = flashMode === 'on' ? 'off' : 'on';
            setFlashMode && setFlashMode(newVal);
          }}>
          <View style={[styles.bgActBtn]} />
          {flashMode === true ? (
            <LightningSlash size={19} color={invCol} weight="fill" />
          ) : (
            <Lightning size={19} color={invCol} weight="fill" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.actionButton,
            styles.coveredBtn,
            {
              marginLeft: 16,
            },
          ]}
          onPress={toggleCameraType}>
          <View style={[styles.bgActBtn]} />
          <ArrowsClockwise size={20} color={invCol} weight="bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionBar;
