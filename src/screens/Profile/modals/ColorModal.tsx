import {useEffect, useState} from 'react';
import {Hue} from '../../../types/profile';
import {observer} from 'mobx-react-lite';
import {edges, padding} from '../../../helpers/styles';
import {
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import {useStores} from '../../../store/RootStore';
import {InputMd, MdText} from '../../../components/StyledText';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {X, XCircle, CheckCircle, PencilSimple} from 'phosphor-react-native';
import Icons from '../../../components/Icons';

const ColorModal = observer(() => {
  const store = useStores();
  const {close} = useBottomSheet();
  const [error, setError] = useState('');
  const [display, setDisplay] = useState('');
  const [editing, setEditing] = useState(false);

  const closeModal = () => {
    Keyboard.dismiss();
    setDisplay('');
    setEditing(false);
    store.collectionStore.setActiveId('');
    close();
  };

  const deleteColor = () => {
    if (!colorItem) {
      closeModal();
    } else {
      store.collectionStore.deleteColor(colorItem?.id);
      closeModal();
    }
  };

  const updateDisplayName = () => {
    if (!colorItem) return;

    // Check if display name is valid
    if (display?.length < 3 || !/[a-zA-Z]{3,}/.test(display)) {
      setError('Display name must contain at least 3 letters');
      return;
    }

    // Update display name in collection array
    const newCollection = store?.collectionStore?.collection.map(
      (item: Hue) => {
        if (item?.id === colorItem?.id) {
          return {
            ...item,
            display_name: display,
          };
        }
        return item;
      },
    );

    store.collectionStore.setCollection([...newCollection]);
    setDisplay('');
    setEditing(false);
  };

  //
  const [colorItem, setColorItem] = useState<Hue | undefined>(undefined);

  const FetchColorItem = () => {
    if (!store.collectionStore.activeId) return;

    const activeColor = store.collectionStore.collection.find(
      item => item.id === store.collectionStore.activeId,
    );

    if (activeColor) {
      setColorItem(activeColor);
    }
  };

  useEffect(() => {
    FetchColorItem();
  }, [store?.collectionStore.activeId]);

  if (!colorItem) {
    return (
      <View>
        <MdText>Loading</MdText>
      </View>
    );
  }

  return (
    <BottomSheetView style={[styles.container]}>
      <BottomSheetView style={[styles.modal]}>
        <BottomSheetView style={[styles.title]}>
          <MdText style={[styles.titleText]}>
            {colorItem?.display_name || colorItem?.name}
          </MdText>

          <TouchableOpacity onPress={deleteColor} style={[styles.closeBtn]}>
            <Icons.Delete size={25} />
          </TouchableOpacity>
        </BottomSheetView>

        <BottomSheetView style={[styles.colorDetails]}>
          {Object.keys(colorItem).map((key: string) => {
            return (
              !['id', 'display_name', 'user_id'].includes(key) && (
                <BottomSheetView key={key} style={[styles.itemRow]}>
                  <MdText style={[styles.listText]}>
                    {key === 'name'
                      ? 'Color name'
                      : key === 'color'
                      ? 'Hex Code'
                      : key}
                  </MdText>

                  {key !== 'shades' ? (
                    <MdText style={[styles.listText]}>
                      {colorItem[key as keyof Hue]}
                    </MdText>
                  ) : (
                    <BottomSheetView style={[styles.shades]}>
                      {colorItem.shades?.map((item, index) => {
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

          <BottomSheetView
            style={[
              styles.itemRow,
              {
                marginTop: 12,
              },
            ]}>
            <MdText style={[styles.listText]}>Display name</MdText>

            {editing ? (
              <BottomSheetView style={[styles.editDisplay]}>
                <BottomSheetTextInput
                  maxLength={25}
                  value={display}
                  autoFocus={true}
                  numberOfLines={1}
                  style={[styles.editInput]}
                  placeholderTextColor="#888"
                  onSubmitEditing={Keyboard.dismiss}
                  placeholder="eg. Ambra's favorite"
                  onChange={e => setDisplay(e.nativeEvent.text)}
                />

                {display?.length > 0 ? (
                  <TouchableOpacity
                    onPressIn={updateDisplayName}
                    style={styles.actionBtn}>
                    <CheckCircle size={18} weight="bold" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPressIn={() => {
                      setError('');
                      setDisplay('');
                      setEditing(false);
                    }}
                    style={styles.actionBtn}>
                    <XCircle size={18} weight="bold" />
                  </TouchableOpacity>
                )}
              </BottomSheetView>
            ) : (
              <TouchableOpacity
                onPressIn={() => setEditing(true)}
                style={[styles.editDisplayBtn]}>
                <MdText style={[styles.listText]}>
                  {colorItem?.display_name || colorItem?.name}
                </MdText>
                <PencilSimple size={14} weight="bold" style={{marginLeft: 4}} />
              </TouchableOpacity>
            )}
          </BottomSheetView>
        </BottomSheetView>

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
      </BottomSheetView>
    </BottomSheetView>
  );
});

export default ColorModal;

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
    // backgroundColor: 'red',
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
    // borderWidth: 1.7,
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
    ...padding(10, 0),
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
