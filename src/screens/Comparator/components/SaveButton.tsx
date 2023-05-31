import {StyleSheet, View} from 'react-native';
import {MdText} from '../../../components/StyledText';
import useColorScheme from '../../../hooks/useColorScheme';
import {TouchableOpacity} from '../../../components/Themed';
import AnimatedCheck from './comparisonScreen/AnimatedCheck';

interface SaveButtonProps {
  saving: boolean;
  saveColors: () => void;
}

const SaveButton = ({saving, saveColors}: SaveButtonProps) => {
  const isDark = useColorScheme() === 'dark';
  const darkColor = isDark ? '#ddd' : '#000';
  const lightColor = isDark ? '#000' : '#fff';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.shareOptionBtn,
        {
          marginTop: 30,
          backgroundColor: darkColor,
        },
      ]}
      onPress={saveColors}>
      <MdText
        style={[
          styles.shareOptionText,
          {
            color: lightColor,
          },
        ]}>
        Save Colors
      </MdText>

      <View
        style={{
          width: 22,
          right: 20,
          height: 22,
          borderWidth: 1,
          borderRadius: 40,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          borderColor: saving ? '#000' : 'transparent',
        }}>
        {saving ? <AnimatedCheck /> : null}
      </View>
    </TouchableOpacity>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  shareOptionBtn: {
    height: 48,
    width: '100%',
    borderRadius: 80,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareOptionText: {
    fontSize: 16.5,
    letterSpacing: 0.3,
    marginHorizontal: 10,
  },
});
