import styles from './profile.styles';
import RangeBar from './components/RangeBar';
import ViewShot from 'react-native-view-shot';
import ColorShade from './components/ColorShade';
import {useStore} from '../../context/AppContext';
import UserDetails from './components/UserDetails';
import {MdText} from '../../components/StyledText';
import NewColorButton from './components/NewColorButton';
import {Image, Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {Fragment, useCallback, useEffect, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSheet} from '../../context/SheetContext';

type ProfileProps = {
  openColorModal: () => void;
  openSignInModal: () => void;
  openNewColorModal: () => void;
};

const Profile = ({
  openColorModal,
  openSignInModal,
  openNewColorModal,
}: ProfileProps) => {
  const {collection} = useStore();
  const {setImgUri} = useSheet();
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot>(null);

  const onCapture = useCallback((uri: string) => {
    setImgUri(uri);
  }, []);

  useEffect(() => {
    const captureView = async () => {
      if (viewShotRef?.current?.capture) {
        await viewShotRef.current.capture();
      }
    };
    captureView();
  }, [collection]);

  return (
    <View style={[styles.container]}>
      <UserDetails openSignInModal={openSignInModal} />

      <View
        style={[
          styles.content,
          {
            paddingBottom: insets.bottom,
          },
        ]}>
        {Boolean(collection?.length > 0) ? (
          <Fragment>
            <RangeBar />
            <View style={[styles.colorShades]}>
              <ScrollView
                // bounces={!false}
                contentContainerStyle={[styles.scrollview]}>
                <ViewShot
                  ref={viewShotRef}
                  onCapture={onCapture}
                  style={styles.viewShot}
                  options={{
                    quality: 0.9,
                    format: 'png',
                  }}>
                  {collection?.map((item, index) => {
                    return (
                      <ColorShade
                        item={item}
                        key={item.id}
                        openColorModal={openColorModal}
                      />
                    );
                  })}
                </ViewShot>
              </ScrollView>

              <TouchableOpacity
                style={[styles.devDetails]}
                onPress={() => Linking.openURL('https://williamsatakere.com')}>
                <MdText style={[styles.devText]}>Built by </MdText>
                <MdText style={[styles.developer]}>Kester A.</MdText>
              </TouchableOpacity>
            </View>
          </Fragment>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateContent}>
              <Image
                resizeMode="cover"
                style={styles.emptyStateImage}
                source={require(`../../assets/images/emptystate/Search.png`)}
              />
              <MdText style={styles.emptyStateText}>
                Your collection is empty
              </MdText>
              <MdText style={[styles.emptyStateText__sub]}>
                Add colors to your collection and view them here
              </MdText>
            </View>
          </View>
        )}
      </View>

      <NewColorButton openColorModal={openNewColorModal} />
    </View>
  );
};
export default Profile;
