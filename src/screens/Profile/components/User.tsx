import {StyleSheet, View} from 'react-native';
import Img from '../../../components/common/Img';
import {MdText, RgText} from '../../../components/StyledText';

const User = () => {
  return (
    <View style={styles.userBlock}>
      <Img
        size={64}
        background="#f1f1f1"
        source={require(`../../../assets/images/avatar.png`)}
      />
      <View style={[styles.textContainer]}>
        <MdText style={[styles.text]}>Williams.a</MdText>
        <RgText style={[styles.text__sub]}>Generated colors</RgText>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  userBlock: {
    paddingBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 34,
    borderBottomColor: '#e4e4e4',
  },
  textContainer: {
    marginLeft: 16,
  },
  text: {
    fontSize: 30,
    color: '#000',
    fontWeight: '600',
  },
  text__sub: {
    fontSize: 19,
    color: '#aaa',
  },
});
