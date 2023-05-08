import {Hue} from '../../../types/profile';
import Animated from 'react-native-reanimated';
import {useStore} from '../../../context/AppContext';
import {MdText} from '../../../components/StyledText';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

type ColorShadeProps = {
  item: Hue;
  openColorModal: () => void;
};
const ColorShade = ({item, openColorModal}: ColorShadeProps) => {
  const {setActiveColor} = useStore();
  const openColor = () => {
    const isValid = setActiveColor(item?.id);
    if (isValid) openColorModal();
  };

  return (
    <>
      <View style={[styles.cover]}>
        <TouchableOpacity onPress={openColor} style={[styles.container]}>
          <MdText style={[styles.text]}>{item?.display_name}</MdText>

          <View style={[styles.shades]}>
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
          </View>
        </TouchableOpacity>
      </View>
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
