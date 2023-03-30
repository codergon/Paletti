import {
  useBottomSheet,
  BottomSheetView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import chroma from 'chroma-js';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Hue} from '../../../types/profile';
import {Plus} from 'phosphor-react-native';
import {useStores} from '../../../store/RootStore';
import {MdText} from '../../../components/StyledText';
import {edges, padding} from '../../../helpers/styles';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';

const NewColorModal = observer(() => {
  const store = useStores();
  const {close} = useBottomSheet();
  const [error, setError] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newlyCreated, setNewlyCreated] = useState<Hue | undefined>(undefined);

  const addNewColor = async () => {
    if (newColor.length !== 3 && newColor.length !== 6) {
      setError('Hex code must contain at 3 or 6 letters');
      return;
    }
    if (!chroma.valid('#' + newColor)) {
      setError('Not a valid hex code');
      return;
    }

    setError('');
    const createdColor = await store.collectionStore.addColor('#' + newColor);
    setNewColor('');
    if (createdColor !== undefined) {
      setNewlyCreated(undefined);
      setNewlyCreated({...createdColor});
    }
  };

  const closeModal = () => {
    Keyboard.dismiss();
    setError('');
    setNewlyCreated(undefined);
    close();
  };

  // Force update
  const [state, setState] = useState({value: 10});

  function forceUpdate() {
    setState(prev => {
      return {...prev};
    });
  }
  useEffect(() => {
    forceUpdate();
  }, [store?.collectionStore.collection]);

  return (
    <BottomSheetView style={[styles.container]}>
      <BottomSheetView style={[styles.modal]}>
        <>
          <BottomSheetView style={[styles.title]}>
            {store.collectionStore.collection?.length > 0 && (
              <MdText style={[styles.titleText]}>
                {newlyCreated
                  ? newlyCreated?.name + ' added'
                  : 'Add a new color'}
              </MdText>
            )}
          </BottomSheetView>

          {!newlyCreated && (
            <BottomSheetView style={[styles.colorDetails]}>
              <>
                <BottomSheetView style={[styles.addColorContainer]}>
                  <BottomSheetView style={[styles.addColorBlock]}>
                    <MdText style={[styles.addColorHash]}>#</MdText>
                    <BottomSheetTextInput
                      maxLength={6}
                      value={newColor}
                      autoFocus={!true}
                      numberOfLines={1}
                      style={[styles.addColorInput]}
                      placeholderTextColor="#888"
                      onSubmitEditing={Keyboard.dismiss}
                      placeholder="Enter hex code eg #2b0FFF"
                      onChange={e => setNewColor(e.nativeEvent.text)}
                    />
                  </BottomSheetView>

                  <TouchableOpacity
                    onPressIn={addNewColor}
                    style={styles.addColorBtn}>
                    <Plus size={16} color="#fff" weight="bold" />
                  </TouchableOpacity>
                </BottomSheetView>
              </>
            </BottomSheetView>
          )}

          {newlyCreated && (
            <BottomSheetView style={[styles.colorDetails]}>
              {Object.keys(newlyCreated).map((key: string) => {
                return (
                  !['id', 'display_name', 'user_id', 'date_created'].includes(
                    key,
                  ) && (
                    <BottomSheetView key={key} style={[styles.itemRow]}>
                      <MdText style={[styles.listText]}>
                        {key === 'name'
                          ? 'Color name'
                          : key === 'color'
                          ? 'Hex Code'
                          : key.replace('_', ' ')}
                      </MdText>

                      {key !== 'shades' ? (
                        <MdText style={[styles.listText]}>
                          {newlyCreated[key as keyof Hue]}
                        </MdText>
                      ) : (
                        <BottomSheetView style={[styles.shades]}>
                          {newlyCreated?.shades?.map((item, index) => {
                            return (
                              <BottomSheetView
                                key={index}
                                style={[
                                  styles.shade,
                                  {
                                    backgroundColor: item,
                                  },
                                ]}>
                                <></>
                              </BottomSheetView>
                            );
                          })}
                        </BottomSheetView>
                      )}
                    </BottomSheetView>
                  )
                );
              })}
            </BottomSheetView>
          )}

          {error && <MdText style={[styles.errorMsg]}>{error}</MdText>}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => closeModal()}
            style={[styles.deleteBtn]}>
            <MdText
              style={{
                color: '#fff',
              }}>
              Close
            </MdText>
          </TouchableOpacity>
        </>
      </BottomSheetView>
    </BottomSheetView>
  );
});

export default NewColorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...padding(30),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modal: {
    ...edges(20),
    width: '100%',
    ...padding(24, 26, 24),
    backgroundColor: '#fff',
  },
  title: {
    width: '100%',
    ...padding(0, 0, 20),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    color: '#000',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    marginTop: 14,
    borderRadius: 10,
    ...padding(16, 16),
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },

  colorDetails: {
    width: '100%',
    ...padding(10, 0, 6),
    flexDirection: 'column',
  },
  itemRow: {
    width: '100%',
    ...padding(2, 0),
    marginVertical: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listText: {
    color: '#000',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  shades: {
    width: 140,
    height: 16,
    maxWidth: '70%',
    borderRadius: 40,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  shade: {
    width: '25%',
    height: '100%',
  },

  // Add Color
  addColorContainer: {
    width: '100%',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addColorBlock: {
    flex: 1,
    borderRadius: 8,
    ...padding(10, 14),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  addColorBtn: {
    width: 29,
    height: 29,
    marginLeft: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },

  addColorHash: {
    fontSize: 15,
    color: '#000',
    paddingRight: 6,
    textAlignVertical: 'center',
  },
  addColorInput: {
    // width: 148,
    color: '#000',
    fontSize: 15,
    textAlignVertical: 'center',
  },

  // Edit Dipslay
  editDisplayBtn: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  editDisplay: {
    borderRadius: 8,
    ...padding(6, 10),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  editInput: {
    width: 148,
    color: '#000',
    fontSize: 13.5,
    textAlignVertical: 'center',
  },
  actionBtn: {
    height: 18,
    paddingLeft: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontFamily: 'NeueMontreal-Medium',
  },

  errorMsg: {
    fontSize: 12,
    marginBottom: 2,
    color: '#ea7f27',
    textAlign: 'center',
  },
});
