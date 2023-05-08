import {StyleSheet, View} from 'react-native';
import Img from '../../../components/common/Img';
import {useAuth} from '../../../context/AuthContext';
import {MdText, RgText} from '../../../components/StyledText';
import {TouchableOpacity} from 'react-native-gesture-handler';

type UserDetailsProps = {
  openSignInModal: () => void;
};

const UserDetails = ({openSignInModal}: UserDetailsProps) => {
  const {user} = useAuth();

  return (
    <View style={styles.userBlock}>
      <TouchableOpacity onPress={openSignInModal}>
        <Img
          size={64}
          background="#f1f1f1"
          // uri={user?.photo}
          source={require(`../../../assets/images/avatar.png`)}
        />
      </TouchableOpacity>
      <View style={[styles.textContainer]}>
        <MdText style={[styles.text]} numberOfLines={1}>
          {user?.name
            ? user.name?.length < 16
              ? user.name
              : user.name
                  .split(' ')
                  .map((name: string, index) =>
                    index > 1 ? '' : index === 1 ? name[0] + '.' : name,
                  )
                  .join(' ')
            : 'Hey there,'}
        </MdText>
        <RgText style={[styles.text__sub]}>
          {user?.email || 'Explore your saved colors'}
        </RgText>
      </View>
    </View>
  );
};

export default UserDetails;

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
    flex: 1,
    marginLeft: 16,
  },
  text: {
    width: '100%',
    fontSize: 29,
    color: '#000',
    fontWeight: '600',
    // textTransform: 'capitalize',
  },
  text__sub: {
    marginTop: 1,
    color: '#aaa',
    fontSize: 18.5,
  },
});
