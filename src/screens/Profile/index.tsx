import {useCallback, useEffect, useRef} from 'react';
import User from './components/User';
import styles from './profile.styles';
import RangeBar from './components/RangeBar';
import ViewShot from 'react-native-view-shot';
import {ScrollView, View} from 'react-native';
import ColorShade from './components/ColorShade';
import {setImgUri} from '../../store/profile/profileSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot>(null);
  const {collection} = useAppSelector(state => state.profile);

  const onCapture = useCallback((uri: string) => {
    dispatch(setImgUri(uri));
  }, []);

  useEffect(() => {
    viewShotRef?.current?.capture && viewShotRef?.current?.capture();
  }, [collection]);

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
        {!!collection && (
          <>
            <RangeBar />

            {/* Map through collection and display view with background color */}
            <View style={[styles.colorShades]}>
              <ScrollView contentContainerStyle={[styles.scrollview]}>
                <ViewShot
                  ref={viewShotRef}
                  // captureMode="mount"
                  onCapture={onCapture}
                  style={styles.viewShot}
                  options={{
                    quality: 0.9,
                    format: 'png',
                  }}>
                  {Object.keys(collection).map(key => {
                    return (
                      <ColorShade
                        key={key}
                        color={key}
                        name={collection[key].name}
                        shades={collection[key].shades}
                      />
                    );
                  })}
                </ViewShot>
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Profile;
