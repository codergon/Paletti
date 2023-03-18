import {Pressable} from '../Themed';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme, StyleSheet} from 'react-native';
import {ArrowBendDoubleUpLeft} from 'phosphor-react-native';

const BackButton = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <Pressable
      style={({pressed}) => [styles.backBtn, {opacity: pressed ? 0.67 : 1}]}
      onPress={() => navigation.goBack()}>
      <ArrowBendDoubleUpLeft
        size={20}
        weight="bold"
        color={isDark ? '#fff' : '#000'}
      />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backBtn: {
    height: 27,
    paddingTop: 1,
    marginRight: 2,
    paddingRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
