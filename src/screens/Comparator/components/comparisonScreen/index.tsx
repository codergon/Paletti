import {useState} from 'react';
import {Hue} from '@typings/palette';
import Layout from '@constants/Layout';
import {StyleSheet} from 'react-native';
import {View} from '@components/Themed';
import {useStore} from '@context/AppContext';
import {MdText} from '@components/StyledText';
import useColorScheme from '@hooks/useColorScheme';

import Charts from '../charts';
import Gradient from './Gradient';
import ColorCards from './ColorCards';
import SaveButton from '../SaveButton';
import ColorMixture from './ColorMixture';
import NavigationBar from './NavigationBar';
import ColorsDetails from './ColorsDetails';

interface ComparisonScreenProps {
  colors: Hue[];
  resetAll: () => void;
  comparisonMethod: string;
  setActiveStep: (step: number) => void;
}

const ComparisonScreen = ({
  colors,
  resetAll,
  setActiveStep,
  comparisonMethod,
}: ComparisonScreenProps) => {
  const {saveColorArray} = useStore();
  const isDark = useColorScheme() === 'dark';
  const [saving, setSaving] = useState(false);
  const displayBg = isDark ? '#222' : '#f8f8f8';
  const displayBorder = isDark ? '#222' : '#ccc';

  // Save colors to palette
  const saveColors = async () => {
    setSaving(true);
    setActiveStep(3);
    const hexcodes = colors.map(c => c.color);
    await saveColorArray(hexcodes, 'Compared Colors', 1500);
    setSaving(false);
    resetAll();
  };

  return (
    <View style={[styles.comparisonScreen, {borderColor: '#555'}]}>
      <View style={[styles.content]}>
        <View style={[styles.colorsDetails]}>
          {colors?.map((color, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={[
                    styles.colorBox,
                    {
                      borderColor: '#444',
                      backgroundColor: color.color,
                    },
                  ]}
                />

                <View
                  style={{
                    flexDirection: 'column',
                  }}>
                  <MdText style={[styles.colorName]}>{color.name}</MdText>
                  <MdText
                    style={{
                      textTransform: 'uppercase',
                    }}>
                    {color.color}
                  </MdText>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={[
            styles.comparisonDisplay,
            {
              borderWidth: 1,
              borderColor: displayBorder,
              backgroundColor: displayBg,
            },
          ]}>
          {comparisonMethod === 'gradient' ? (
            <Gradient colors={colors} />
          ) : comparisonMethod === 'blend' ? (
            <ColorMixture colors={colors} />
          ) : comparisonMethod === 'details' ? (
            <ColorsDetails colors={colors} />
          ) : comparisonMethod === 'cards' ? (
            <ColorCards colors={colors} />
          ) : comparisonMethod === 'charts' ? (
            <Charts colors={colors} />
          ) : comparisonMethod === 'navbar' ? (
            <NavigationBar colors={colors} />
          ) : null}
        </View>

        <SaveButton saving={saving} saveColors={saveColors} />
      </View>
    </View>
  );
};

export default ComparisonScreen;

const styles = StyleSheet.create({
  comparisonScreen: {
    top: 0,
    left: 0,
    zIndex: 100,
    height: '100%',
    position: 'absolute',
    marginHorizontal: 20,
    width: Layout.window.width - 40,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 4,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'column',
  },

  colorsDetails: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  colorName: {
    fontSize: 15,
    lineHeight: 16,
    marginBottom: 2,
    textTransform: 'capitalize',
  },

  comparisonDisplay: {
    flex: 1,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Button
  compareButton: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 27,
    justifyContent: 'center',
  },
  buttinText: {
    fontSize: 22,
    letterSpacing: 0.5,
  },
});
