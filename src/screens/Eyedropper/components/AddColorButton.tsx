import {StyleSheet} from 'react-native';
import {Plus} from 'phosphor-react-native';
import Animated from 'react-native-reanimated';
import {useLogic} from '@context/LogicContext';
import {TouchableOpacity} from '@components/Themed';

const AddColorButton = () => {
  const {addToPreview} = useLogic();

  return (
    <TouchableOpacity
      style={[[styles.mainButton, {borderColor: '#fff'}]]}
      onPress={addToPreview}>
      <Animated.View style={[styles.mainButton__inner]}>
        <Plus size={22} color="#000" weight="bold" />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AddColorButton;

const styles = StyleSheet.create({
  mainButton: {
    // right: 20,

    width: 54,
    bottom: 25,
    height: 54,
    borderWidth: 2,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  mainButton__inner: {
    width: 44,
    paddingTop: 2,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  svg: {
    width: '66%',
    height: '66%',
  },
});
