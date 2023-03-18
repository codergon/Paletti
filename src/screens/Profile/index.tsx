import styles from './profile.styles';
import {ScrollView, View} from 'react-native';
import User from './components/User';
import RangeBar from './components/RangeBar';
import ColorShade from './components/ColorShade';
import {useMMKVObject} from 'react-native-mmkv';
import {Collection} from '../../types/profile';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {setImgUri} from '../../store/profile/profileSlice';

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const {imgUri} = useAppSelector(state => state.profile);
  const [collection, setCollection] = useMMKVObject<Collection>('collection');

  const onCapture = useCallback((uri: string) => {
    dispatch(setImgUri(uri));
    console.log('do something with ', uri);
  }, []);

  return (
    <View style={[styles.container]}>
      <User />

      <View
        style={[
          styles.content,
          {
            paddingBottom: insets.bottom + 6,
          },
        ]}>
        <RangeBar />

        <ViewShot
          captureMode="mount"
          onCapture={onCapture}
          style={styles.colorShades}
          options={{fileName: 'Your-File-Name', format: 'jpg', quality: 0.9}}>
          {/* <View style={[styles.colorShades]}> */}
          {/* Map through collection and display view with background color */}
          <ScrollView contentContainerStyle={[styles.scrollview]}>
            {collection &&
              Object.keys(collection).map(key => {
                return (
                  <ColorShade
                    key={key}
                    color={key}
                    name={collection[key].name}
                    shades={collection[key].shades}
                  />
                );
              })}
          </ScrollView>
          {/* </View> */}
        </ViewShot>

        {/*  */}
      </View>
    </View>
  );
};

export default Profile;
