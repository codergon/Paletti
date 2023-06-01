import {StyleSheet} from 'react-native';
import {Plus} from 'phosphor-react-native';
import {useStore} from '@context/AppContext';
import useColorScheme from '@hooks/useColorScheme';
import {TouchableOpacity} from '@components/Themed';

const CreatePaletteButton = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const darkColor = isDark ? '#000' : '#fff';

  const {createPalette} = useStore();

  return (
    <TouchableOpacity
      darkColor="#eee"
      lightColor="#000"
      style={[styles.button]}
      onPress={createPalette}>
      <Plus size={22} color={darkColor} weight="bold" />
    </TouchableOpacity>
  );
};

export default CreatePaletteButton;

const styles = StyleSheet.create({
  button: {
    width: 50,
    right: 20,
    height: 50,
    bottom: 34,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
