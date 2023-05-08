import {useState} from 'react';
import {Hue} from '../../../types/profile';
import Icons from '../../../components/Icons';
import {useStore} from '../../../context/AppContext';
import {MdText} from '../../../components/StyledText';
import {edges, padding} from '../../../helpers/styles';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {XCircle, CheckCircle, PencilSimple} from 'phosphor-react-native';
import {
  View,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';

const ColorModal = () => {
  const {activeColor, deleteColor, setActiveColor, updateColorDisplayName} =
    useStore();

  const {close} = useBottomSheet();
  const [error, setError] = useState('');
  const [display, setDisplay] = useState('');
  const [editing, setEditing] = useState(false);

  const closeModal = () => {
    Keyboard.dismiss();
    setDisplay('');
    setError('');
    setEditing(false);
    setActiveColor();
    close();
  };

  const deleteActiveColor = () => {
    if (!activeColor) {
      closeModal();
    } else {
      deleteColor(activeColor?.id);
      closeModal();
    }
  };

  const updateDisplayName = () => {
    setError('');
    if (!activeColor) return;

    // Check if display name is valid
    if (display?.length < 3 || !/[a-zA-Z]{3,}/.test(display)) {
      setError('Display name must contain at least 3 letters');
      return;
    }

    updateColorDisplayName(activeColor.id, display);
    setDisplay('');
    setEditing(false);
  };

  if (!activeColor) {
    return <View />;
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.modal]}>
        <View style={[styles.title]}>
          <MdText style={[styles.titleText]}>
            {activeColor?.display_name || activeColor?.name}
          </MdText>

          <TouchableOpacity
            onPress={deleteActiveColor}
            style={[styles.closeBtn]}>
            <Icons.Delete size={25} />
          </TouchableOpacity>
        </View>

        <View style={[styles.colorDetails]}>
          {Object.keys(activeColor).map((key: string) => {
            return (
              !['id', 'display_name', 'user_id'].includes(key) && (
                <View key={key} style={[styles.itemRow]}>
                  <MdText style={[styles.listText]}>
                    {key === 'name'
                      ? 'Color name'
                      : key === 'color'
                      ? 'Hex Code'
                      : key}
                  </MdText>

                  {key !== 'shades' ? (
                    <MdText
                      style={[
                        styles.listText,
                        {
                          textTransform:
                            key === 'color' ? 'uppercase' : 'capitalize',
                        },
                      ]}>
                      {key === 'date_created'
                        ? dayjs(activeColor[key as keyof Hue] as number).format(
                            'MMM DD, YYYY',
                          )
                        : activeColor[key as keyof Hue]}
                    </MdText>
                  ) : (
                    <View style={[styles.shades]}>
                      {activeColor.shades?.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={[
                              styles.shade,
                              {
                                backgroundColor: item,
                              },
                            ]}>
                            <></>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              )
            );
          })}

          <View
            style={[
              styles.itemRow,
              {
                marginTop: 12,
              },
            ]}>
            <MdText style={[styles.listText]}>Display name</MdText>

            {editing ? (
              <View style={[styles.editDisplay]}>
                <TextInput
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
              </View>
            ) : (
              <TouchableOpacity
                onPressIn={() => setEditing(true)}
                style={[styles.editDisplayBtn]}>
                <MdText style={[styles.listText]}>
                  {activeColor?.display_name || activeColor?.name}
                </MdText>
                <PencilSimple size={14} weight="bold" style={{marginLeft: 4}} />
              </TouchableOpacity>
            )}
          </View>
        </View>

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
      </View>
    </View>
  );
};

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
