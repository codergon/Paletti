import {StyleSheet} from 'react-native';
import {Check, Trash} from 'phosphor-react-native';
import {useStore} from '../../../context/AppContext';
import {MdText} from '../../../components/StyledText';
import {ELEM_HEIGHT} from '../../../constants/Layout';
import {useLogic} from '../../../context/LogicContext';
import {SECONDARY_COLOR} from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import {TouchableOpacity, View} from '../../../components/Themed';
import PreviewColor from './PreviewColor';

const PalettePreview = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const {isDominant} = useLogic();
  const {isEmptyPreview, previewColors, clearPreview, savePreview} = useStore();

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.palette,
          {
            borderWidth: 1,
            borderColor: isDark ? '#888' : '#bbb',
          },
        ]}>
        {previewColors?.length > 0 ? (
          previewColors.map(preview => {
            return <PreviewColor key={preview?.id} preview={preview} />;
          })
        ) : (
          <View style={[styles.emptyState]}>
            <MdText
              style={{
                fontSize: 13,
                letterSpacing: 0.3,
                color: isDark ? '#999' : '#777',
              }}>
              Copied colors will appear here
            </MdText>
          </View>
        )}
      </View>

      {!isDominant && (
        <TouchableOpacity
          onPress={() => {
            clearPreview();
          }}
          style={[
            styles.deleteColorbtn,
            {
              borderColor: '#bc301a',
              backgroundColor: '#f4d6d7',
              opacity: isEmptyPreview ? 0.75 : 1,
            },
          ]}>
          <Trash color={'#bc301a'} size={21} weight="regular" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          savePreview();
        }}
        style={[
          styles.deleteColorbtn,
          {
            borderColor: '#1b5e21',
            backgroundColor: '#d3ead5',
            opacity: isEmptyPreview ? 0.75 : 1,
          },
        ]}>
        <Check color={'#1b5e21'} size={21} weight="bold" />
      </TouchableOpacity>
    </View>
  );
};

export default PalettePreview;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  palette: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    height: ELEM_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
  },
  paletteItem: {
    flex: 1,
    padding: 3,
    height: '100%',
    borderWidth: 0,
    borderRadius: 0,
    borderColor: SECONDARY_COLOR,
  },

  deleteColorbtn: {
    marginLeft: 12,
    borderRadius: 12,
    borderWidth: 0.3,
    alignItems: 'center',
    width: ELEM_HEIGHT - 5,
    height: ELEM_HEIGHT - 1,
    justifyContent: 'center',
    borderColor: SECONDARY_COLOR,
  },
  emptyState: {
    flex: 1,
    height: ELEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
