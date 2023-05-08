import chroma from 'chroma-js';
import RangeBar from './RangeBar';
import ColorShade from './ColorShade';
import ViewShot from 'react-native-view-shot';
import {View} from '../../../components/Themed';
import {ScrollView, StyleSheet} from 'react-native';
import {MdText} from '../../../components/StyledText';
import {edges, padding} from '../../../helpers/styles';
import useColorScheme from '../../../hooks/useColorScheme';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {PaletteType} from '../../../types/palette';

type ExportContentType = {
  palette: PaletteType;
  highlightColor: string;
  setPaletteImg: (uri: string) => void;
};

const ExportContent = ({
  palette,
  setPaletteImg,
  highlightColor,
}: ExportContentType) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const viewShotRef = useRef<ViewShot>(null);
  const darkColor = isDark ? '#fff' : '#000';
  const borderColor = isDark ? '#444' : '#ccc';

  const onCapture = useCallback((uri: string) => {
    setPaletteImg(uri);
  }, []);

  useEffect(() => {
    const captureView = async () => {
      if (viewShotRef?.current?.capture) {
        await viewShotRef.current.capture();
      }
    };
    captureView();
  }, [palette?.colors]);

  const paletteColors = useMemo(() => {
    return palette?.colors?.map(color => {
      return {
        ...color,
        shades: chroma.scale([color?.color, '#ffffff']).colors(5).slice(0, 4),
      };
    });
  }, [palette?.colors]);

  return (
    <View style={[styles.content]}>
      <ScrollView bounces={false} contentContainerStyle={[styles.scrollview]}>
        <ViewShot
          ref={viewShotRef}
          onCapture={onCapture}
          style={{
            ...styles.viewShot,
            backgroundColor: highlightColor,
          }}
          options={{
            quality: 0.9,
            format: 'png',
          }}>
          {palette?.name && (
            <View style={[styles.colorsHeader]}>
              <MdText style={[styles.colorsHeaderTxt]}>{palette?.name}</MdText>
            </View>
          )}

          <RangeBar borderColor={borderColor} darkColor={darkColor} />

          {paletteColors?.map((item, index) => {
            return (
              <ColorShade
                item={item}
                key={item.id}
                highlightColor={highlightColor}
              />
            );
          })}
        </ViewShot>
      </ScrollView>
    </View>
  );
};

export default ExportContent;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    marginTop: 14,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  scrollview: {
    minHeight: '100%',
    ...padding(0, 18, 0),
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  viewShot: {
    ...edges(20),
    width: '100%',
    position: 'relative',
    ...padding(20, 16, 6),
    flexDirection: 'column',
  },
  colorsHeader: {
    width: '100%',
    marginBottom: 18,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  colorsHeaderTxt: {
    fontSize: 16,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
});
