import {StyleSheet} from 'react-native';
import {View} from '../../../components/Themed';
import {RootStackScreenProps} from '../../../types';
import AppStatusBar from '../../../components/common/AppStatusBar';
import ColorItems from './ColorItems';
import {useStore} from '../../../context/AppContext';
import {useEffect, useMemo, useState} from 'react';
import {PaletteType} from '../../../types/palette';

const PaletteColors = ({
  route,
  navigation,
}: RootStackScreenProps<'paletteColors'>) => {
  const {palette} = route.params;
  const {collection} = useStore();
  const [paletteImg, setPaletteImg] = useState<string>('');

  const paletteItem = useMemo(() => {
    return collection.find(plt => plt.id === palette.id);
  }, [collection]);

  useEffect(() => {
    if (!paletteItem) {
      navigation.goBack();
    }
  }, [paletteItem]);

  return (
    <View style={[styles.container]}>
      <AppStatusBar />

      <ColorItems
        setPaletteImg={setPaletteImg}
        palette={paletteItem as PaletteType}
      />
    </View>
  );
};

export default PaletteColors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
