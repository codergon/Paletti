import {Hue} from '../../../types/profile';
import Animated from 'react-native-reanimated';
import {MdText} from '../../../components/StyledText';
import {useStores} from '../../../store/RootStore';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';

type ColorShadeProps = {
  item: Hue;
  openColorModal: () => void;
};
const ColorShade = ({item, openColorModal}: ColorShadeProps) => {
  const store = useStores();
  const openColor = () => {
    store.collectionStore.setActiveId(item.id);
    openColorModal();
  };
  return (
    <>
      <BottomSheetView style={[styles.cover]}>
        <TouchableOpacity onPress={openColor} style={[styles.container]}>
          <MdText style={[styles.text]}>{item?.display_name}</MdText>

          <BottomSheetView style={[styles.shades]}>
            {item?.shades?.map((item, index) => {
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.shade,
                    {
                      backgroundColor: item,
                    },
                  ]}
                />
              );
            })}
          </BottomSheetView>
        </TouchableOpacity>
      </BottomSheetView>
    </>
  );
};

export default ColorShade;

const styles = StyleSheet.create({
  cover: {
    width: '100%',
  },
  container: {
    padding: 14,
    width: '100%',
    borderRadius: 50,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 8,
    color: '#999',
    fontSize: 13.5,
    textTransform: 'capitalize',
  },

  shades: {
    width: 206,
    height: 40,
    maxWidth: '70%',
    borderRadius: 40,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  shade: {
    width: '25%',
    height: '100%',
  },
});
