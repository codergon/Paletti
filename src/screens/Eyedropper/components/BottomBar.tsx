import {View} from '@components/Themed';
import styles from '../eyedropper.styles';
import ColorDetails from './ColorDetails';
import PalettePreview from './PalettePreview';

const BottomBar = () => {
  return (
    <View style={[styles.bottomBar]}>
      <ColorDetails />
      <PalettePreview />
    </View>
  );
};

export default BottomBar;
