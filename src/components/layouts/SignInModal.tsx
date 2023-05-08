import Icons from '../Icons';
import Img from '../common/Img';
import {useState} from 'react';
import {MdText, RgText} from '../StyledText';
import {SignOut} from 'phosphor-react-native';
import {useAuth} from '../../context/AuthContext';
import {edges, padding} from '../../helpers/styles';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SignInModal = () => {
  const {user, login, signout} = useAuth();

  const {close} = useBottomSheet();
  const insets = useSafeAreaInsets();
  const [error, setError] = useState('');

  const signIn = async () => {
    setError('');
    const isLoggedIn = await login();

    console.log(isLoggedIn);

    if (isLoggedIn === 'success') {
      setError('');
      close();
      return;
    }
    setError('An error occurred trying to sign in');
  };

  const signOut = async () => {
    setError('');
    const isLoggedOut = await signout();
    if (isLoggedOut === 'success') {
      setError('');
      close();
      return;
    }
    setError('An error occurred trying to sign out');
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
        {user?.id ? (
          <View style={styles.userBlock}>
            <Img
              size={50}
              background="#f1f1f1"
              uri={user?.photo}
              source={require(`../../assets/images/avatar.png`)}
            />

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
                  : 'User'}{' '}
              </MdText>
              <RgText style={[styles.text__sub]}>
                {user?.email || 'Generated colors'}
              </RgText>
            </View>

            <TouchableOpacity onPress={signOut} style={[styles.signOut]}>
              <SignOut size={26} />
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

        {!user?.id && (
          <MdText style={[styles.description]}>
            Connect account to sync collection on all devices
          </MdText>
        )}
        {error && (
          <MdText style={[styles.errorMsg]}>
            {error || 'An error occurred trying to sign in'}
          </MdText>
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
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
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
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  googleIcon: {
    left: 20,
    width: 18,
    height: 19,
    position: 'absolute',
  },
  signIn__text: {
    fontSize: 18,
    color: '#000',
  },

  description: {
    fontSize: 13,
    marginTop: 12,
    color: '#000',
    textAlign: 'center',
  },

  errorMsg: {
    fontSize: 13,
    marginTop: 7,
    color: '#e83a27',
    textAlign: 'center',
  },
});
