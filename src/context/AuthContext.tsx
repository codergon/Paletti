import auth from '@react-native-firebase/auth';
import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export type User = {
  id?: string;
  name?: string;
  photo?: string;
  email?: string;
};

type ContextType = {
  loading: boolean;
  user: User | null;
  login: () => Promise<string>;
  signout: () => Promise<string>;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  loading: false,
  login: () => Promise.resolve(''),
  signout: () => Promise.resolve(''),
});

interface AuthProviderProps {
  children: React.ReactElement | React.ReactElement[];
}
export default function AuthContextProvider({children}: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User) => {
    setUser(newUser);
    AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const fetchUser = async () => {
    const userRes = await AsyncStorage.getItem('user');
    if (userRes) setUser(JSON.parse(userRes));
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signout = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('user');
      setUser(null);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const login = async () => {
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
      } as User;

      updateUser(user);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signout,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
