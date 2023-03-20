import Icons from '../Icons';
import Img from '../common/Img';
import {AppStorage} from '../../store/mmkv';
import {MdText, RgText} from '../StyledText';
import auth from '@react-native-firebase/auth';
import {edges, padding} from '../../helpers/styles';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {setUserData} from '../../store/user/userSlice';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SignInModal = () => {
  const {close} = useBottomSheet();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {currentUser} = useAppSelector(state => state.user);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const res = await auth().signInWithCredential(googleCredential);
      const user = {
        id: res.user.uid,
        email: res.user.email,
        photo: res.user.photoURL,
        name: res.user.displayName,
      };
      dispatch(setUserData(user));
      AppStorage.set('user', JSON.stringify(user || ''));
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      dispatch(setUserData(null));
      AppStorage.set('user', '');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 6,
        },
      ]}>
      <View style={styles.content}>
        {currentUser ? (
          <View style={styles.userBlock}>
            <Img
              size={50}
              background="#f1f1f1"
              uri={currentUser?.photo}
              source={require(`../../assets/images/avatar.png`)}
            />

            <View style={[styles.textContainer]}>
              <MdText style={[styles.text]} numberOfLines={1}>
                {currentUser?.name
                  ? currentUser.name?.length < 16
                    ? currentUser.name
                    : currentUser.name
                        .split(' ')
                        .map((name: string, index) =>
                          index > 1 ? '' : index === 1 ? name[0] + '.' : name,
                        )
                        .join(' ')
                  : 'User'}{' '}
              </MdText>
              <RgText style={[styles.text__sub]}>
                {currentUser?.email || 'Generated colors'}
              </RgText>
            </View>

            <TouchableOpacity onPress={signOut} style={[styles.signOut]}>
              <Icons.SignOut size={28} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={signIn}
            activeOpacity={0.6}
            style={[styles.signIn]}>
            <Icons.Google style={styles.googleIcon} size={24} />
            <MdText style={[styles.signIn__text]}>Sign in with Google</MdText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignInModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...padding(36, 0),
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  content: {
    ...edges(30),
    ...padding(20, 16),
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#e4e4e4',
  },
  userBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  text: {
    fontSize: 21.5,
    color: '#000',
    width: '100%',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  text__sub: {
    fontSize: 16,
    color: '#888',
  },

  // Sign out
  signOut: {
    width: 42,
    height: 50,
    paddingLeft: 5,
    paddingRight: 2,
    paddingBottom: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  // Sign in
  signIn: {
    width: '100%',
    borderRadius: 24,
    ...padding(17, 0),
    borderColor: '#aaa',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
  },
  googleIcon: {position: 'absolute', left: 20, width: 18, height: 19},
  signIn__text: {
    fontSize: 18,
    color: '#000',
  },
});
