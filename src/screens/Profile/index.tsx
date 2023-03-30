import styles from './profile.styles';
import {observer} from 'mobx-react-lite';
import RangeBar from './components/RangeBar';
import ViewShot from 'react-native-view-shot';
import ColorShade from './components/ColorShade';
import UserDetails from './components/UserDetails';
import {MdText} from '../../components/StyledText';
import {useStores} from '../../store/RootStore';
import {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image, Linking, TouchableOpacity} from 'react-native';
import NewColorButton from './components/NewColorButton';
import {BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet';

type ProfileProps = {
  openColorModal: () => void;
  openSignInModal: () => void;
  openNewColorModal: () => void;
};

const Profile = observer<ProfileProps>(
  ({openColorModal, openSignInModal, openNewColorModal}) => {
    const store = useStores();
    const insets = useSafeAreaInsets();
    const viewShotRef = useRef<ViewShot>(null);

    const onCapture = useCallback((uri: string) => {
      store.collectionStore.setImgUri(uri);
    }, []);

    const [_, setRe] = useState({value: 10});

    function forceUpdate() {
      setRe(prev => {
        return {...prev};
      });
    }
    useEffect(() => {
      forceUpdate();

      const captureView = async () => {
        if (viewShotRef?.current?.capture) {
          await viewShotRef.current.capture();
        }
      };
      captureView();
    }, [store.collectionStore.collection]);

    return (
      <BottomSheetView style={[styles.container]}>
        <UserDetails openSignInModal={openSignInModal} />

        <BottomSheetView
          style={[
            styles.content,
            {
              paddingBottom: insets.bottom,
            },
          ]}>
          {store.collectionStore.collection.length > 0 ? (
            <Fragment>
              <RangeBar />
              <BottomSheetView style={[styles.colorShades]}>
                <BottomSheetScrollView
                  bounces={!false}
                  contentContainerStyle={[styles.scrollview]}>
                  <ViewShot
                    ref={viewShotRef}
                    onCapture={onCapture}
                    style={styles.viewShot}
                    options={{
                      quality: 0.9,
                      format: 'png',
                    }}>
                    {store.collectionStore.collection.map((item, index) => {
                      return (
                        <ColorShade
                          item={item}
                          key={item.id}
                          openColorModal={openColorModal}
                        />
                      );
                    })}
                  </ViewShot>
                </BottomSheetScrollView>

                <TouchableOpacity
                  style={[styles.devDetails]}
                  onPress={() =>
                    Linking.openURL('https://williamsatakere.com')
                  }>
                  <MdText style={[styles.devText]}>Built by </MdText>
                  <MdText style={[styles.developer]}>Kester A.</MdText>
                </TouchableOpacity>
              </BottomSheetView>
            </Fragment>
          ) : (
            <BottomSheetView style={styles.emptyStateContainer}>
              <BottomSheetView style={styles.emptyStateContent}>
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
              </BottomSheetView>
            </BottomSheetView>
          )}
        </BottomSheetView>

        <NewColorButton openColorModal={openNewColorModal} />
      </BottomSheetView>
    );
  },
);

export default Profile;
