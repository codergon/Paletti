import {LightenDarkenColor, subtractHexColors} from '@helpers/colors';
import chroma from 'chroma-js';
import {Hue} from '@typings/palette';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Slider from '@react-native-community/slider';
import useColorScheme from '@hooks/useColorScheme';
import {TouchableOpacity} from '@components/Themed';
import {Equal, MinusIcon, PlusIcon, SunMedium} from 'lucide-react-native';

const circleSize = 60;

interface ColorMixtureProps {
  colors: Hue[];
}

interface CircleProps {
  color: string;
  size: number;
  borderColor: string;
  children?: React.ReactNode;
}

const Circle = ({color, borderColor, size, children}: CircleProps) => {
  return (
    <View
      style={[
        styles.colorCirlce,
        {
          backgroundColor: color,
          borderColor,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}>
      {children}
    </View>
  );
};

const ColorMixture = ({colors}: ColorMixtureProps) => {
  const [action, setAction] = useState('add');
  const isDark = useColorScheme() === 'dark';
  const btnBg = isDark ? '#3b3b3b' : '#444';
  const darkColor = isDark ? '#fff' : '#000';
  const borderColor = isDark ? '#666' : '#999';
  const [brightness, setBrightness] = useState(0.5);
  const maximumTrackTintColor = isDark ? '#555' : '#aaa';
  const minimumTrackTintColor = isDark ? '#fff' : '#111';
  const [addedMix, setAddedMix] = useState(colors[0]?.color ?? '#000');
  const [subtractedMix, setSubtractedMix] = useState(
    colors[0]?.color ?? '#000',
  );

  useEffect(() => {
    const mix = chroma.mix(
      colors[0]?.color ?? '#000',
      colors[1]?.color ?? '#000',
    );
    setAddedMix(mix.hex());
    const subtractedColor = subtractHexColors(
      colors[0]?.color ?? '#000',
      colors[1]?.color ?? '#000',
    );
    setSubtractedMix(subtractedColor);
  }, [colors]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <View style={styles.row}>
          <Circle
            size={circleSize}
            borderColor={borderColor}
            color={
              action === 'lighten'
                ? LightenDarkenColor(
                    colors[0]?.color ?? '#000',
                    brightness * 150,
                  )
                : colors[0]?.color ?? '#000'
            }
          />

          {action === 'add' ? (
            <PlusIcon
              size={24}
              weight="bold"
              strokeWidth={2.4}
              color={darkColor}
              // @ts-ignore
              style={styles.diffIcon}
            />
          ) : (
            <MinusIcon
              size={24}
              weight="bold"
              strokeWidth={2.4}
              color={darkColor}
              // @ts-ignore
              style={styles.diffIcon}
              opacity={action === 'minus' ? 1 : 0}
            />
          )}

          <Circle
            size={circleSize}
            borderColor={borderColor}
            color={
              action === 'lighten'
                ? LightenDarkenColor(
                    colors[1]?.color ?? '#000',
                    brightness * 150,
                  )
                : colors[1]?.color ?? '#000'
            }
          />
        </View>

        <Equal
          size={24}
          color={darkColor}
          style={{
            marginTop: 10,
            marginBottom: 16,
          }}
          opacity={action === 'lighten' ? 0 : 1}
        />

        <View style={styles.row}>
          {action === 'lighten' ? (
            <Slider
              style={{
                height: 40,
                width: 200,
                maxWidth: '80%',
                marginBottom: 16,
              }}
              value={0.25}
              minimumValue={0.3}
              maximumValue={1}
              maximumTrackTintColor={maximumTrackTintColor}
              minimumTrackTintColor={minimumTrackTintColor}
              onValueChange={value => setBrightness(value)}
            />
          ) : (
            <Circle
              size={circleSize}
              borderColor={borderColor}
              color={action === 'add' ? addedMix : subtractedMix}
            />
          )}
        </View>
      </View>

      {/* Controls */}
      <View
        style={{
          height: 150,
          marginLeft: 20,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {[
          {
            label: 'add',
            icon: (
              <PlusIcon
                color={'#fff'}
                size={action === 'add' ? 19 : 18}
                opacity={action === 'add' ? 1 : 0.7}
                strokeWidth={action === 'add' ? 2.6 : 2}
              />
            ),
          },
          {
            label: 'minus',
            icon: (
              <MinusIcon
                color={'#fff'}
                size={action === 'minus' ? 20 : 18}
                opacity={action === 'minus' ? 1 : 0.7}
                strokeWidth={action === 'minus' ? 2.8 : 2}
              />
            ),
          },
          {
            label: 'lighten',
            icon: (
              <SunMedium
                color={'#fff'}
                size={action === 'lighten' ? 19 : 18}
                opacity={action === 'lighten' ? 1 : 0.7}
                strokeWidth={action === 'lighten' ? 2.4 : 2}
              />
            ),
          },
        ].map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionBtn,
                {
                  backgroundColor: btnBg,
                  borderColor: borderColor,
                  borderWidth: action === item.label ? 1.2 : 0,
                },
              ]}
              onPress={() => setAction(item.label)}>
              {item.icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ColorMixture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 2,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  colorCirlce: {
    borderWidth: 1,
    borderRadius: 80,
    width: circleSize,
    height: circleSize,
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  diffIcon: {
    marginHorizontal: 20,
  },

  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 60,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
