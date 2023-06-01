import {
  HexToHcl,
  HexToHsl,
  HexToRgb,
  getColorDifferencePercentage,
} from '@helpers/colors';
import chroma from 'chroma-js';
import {Hue} from '@typings/palette';
import {StyleSheet} from 'react-native';
import {View} from '@components/Themed';
import {BadgeInfo} from 'lucide-react-native';
import useColorScheme from '@hooks/useColorScheme';
import {MdText, RgText} from '@components/StyledText';

interface ColorsDetailsProps {
  colors: Hue[];
}

const ColorsDetails = ({colors}: ColorsDetailsProps) => {
  const isDark = useColorScheme() === 'dark';
  const primary = isDark ? '#fff' : '#000';
  const secondary = isDark ? '#ccc' : '#000';

  return (
    <View style={[styles.container]}>
      <View style={[styles.infoContainer]}>
        <MdText
          style={[
            styles.label,
            {
              marginTop: 0,
              color: primary,
            },
          ]}>
          Color formats & spaces
        </MdText>

        {['rgb', 'hsl', 'hcl'].map((item, index) => {
          return (
            <View key={index} style={[styles.row]}>
              {colors?.map((color, index) => {
                return (
                  <RgText
                    key={index}
                    style={[
                      styles.value,
                      {
                        color: secondary,
                        textTransform: 'uppercase',
                      },
                    ]}>
                    {item === 'rgb'
                      ? `${HexToRgb(color.color)}`
                      : item === 'hsl'
                      ? `${HexToHsl(color.color)}`
                      : item === 'hcl'
                      ? `${HexToHcl(color.color)}`
                      : ''}
                  </RgText>
                );
              })}
            </View>
          );
        })}

        <View
          style={[
            styles.rowStart,
            {
              marginTop: 24,
            },
          ]}>
          <RgText
            style={[
              styles.value,
              {
                color: secondary,
                textTransform: 'uppercase',
              },
            ]}>
            Contrast ratio: &nbsp;
          </RgText>

          <RgText
            style={[
              styles.value,
              {
                color: primary,
              },
            ]}>
            {chroma
              .contrast(colors[0]?.color ?? '#000', colors[1]?.color ?? '#000')
              .toFixed(2)}{' '}
            out of 21
          </RgText>
        </View>
        <View style={[styles.rowStart]}>
          <RgText
            style={[
              styles.value,
              {
                color: secondary,
                textTransform: 'uppercase',
              },
            ]}>
            Percentage Difference: &nbsp;
          </RgText>

          <RgText
            style={[
              styles.value,
              {
                color: primary,
              },
            ]}>
            {getColorDifferencePercentage(
              colors[0]?.color ?? '#000',
              colors[1]?.color ?? '#000',
            )}
            %
          </RgText>
        </View>
      </View>

      <View style={[styles.noteContainer]}>
        <BadgeInfo
          size={14}
          color={secondary}
          style={{
            marginTop: 3,
          }}
        />
        <RgText
          style={[
            styles.note,
            {
              fontSize: 13,
              lineHeight: 18,
              color: secondary,
            },
          ]}>
          WCAG advises a
          <MdText
            style={[
              {
                color: primary,
              },
            ]}>
            &nbsp;4.5&nbsp;
          </MdText>
          contrast ratio between text (including images) and their background.
        </RgText>
      </View>
    </View>
  );
};

export default ColorsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 2,
    paddingHorizontal: 20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  infoContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 18,
    marginTop: 12,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  row: {
    marginVertical: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  rowStart: {
    marginVertical: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  value: {
    fontSize: 13,
    letterSpacing: 0.25,
  },

  //Note
  noteContainer: {
    width: '100%',
    paddingTop: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  note: {
    marginLeft: 8,
    letterSpacing: 0.25,
  },
});
