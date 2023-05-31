import {
  DropHalf,
  Eyedropper,
  ArchiveTray,
  EyedropperSample,
} from 'phosphor-react-native';
import {nanoid} from 'nanoid';
import ntc from '../../lib/ntc';
import {Hue} from '../../types/palette';
import styles from './comparator.styles';
import {useEffect, useState} from 'react';
import {View} from '../../components/Themed';
import {RootTabScreenProps} from '../../types';
import {useLogic} from '../../context/LogicContext';
import Timeline from './components/timeline/Timeline';
import {useIsFocused} from '@react-navigation/native';
import {Container} from '../../components/Customized';
import ColorsPreview from './components/ColorsPreview';
import {useSharedValue} from 'react-native-reanimated';
import useColorScheme from '../../hooks/useColorScheme';
import {hapticFeedback} from '../../utils/hapticFeedback';
import {MdText, RgText} from '../../components/StyledText';
import ComparisonScreen from './components/comparisonScreen';
import ImageColors from './components/selectors/ImageColors';
import ColorsPicker from './components/selectors/ColorsPicker';
import CameraScanner from './components/selectors/CameraScanner';
import OptionsSwitch from './components/menu-buttons/OptionsSwitch';

const iconSize = 17;
const timelineIcons = [
  <Eyedropper size={iconSize} weight="regular" />,
  <EyedropperSample size={iconSize} weight="regular" />,
  <DropHalf size={iconSize} weight="regular" />,
  <ArchiveTray size={iconSize} weight="regular" />,
];

const Comparator = ({navigation}: RootTabScreenProps<'comparator'>) => {
  const isFocused = useIsFocused();
  const isDark = useColorScheme() === 'dark';
  const actionCenterColor = isDark ? '#222' : '#eee';

  const color = useSharedValue('#e0ce7e');
  const [option, setOption] = useState('picker');
  const [activeStep, setActiveStep] = useState(0);
  const [colors, setColors] = useState<Hue[]>([]);
  const [imageHeight, setImageHeight] = useState(0);
  const [changedImage, setChangedImage] = useState(false);

  const [comparisonMethod, setComparisonMethod] = useState('charts');

  const {activeColor, onScreenBlur, selectedImg, selectImage, removeImage} =
    useLogic();

  // Animate Timeline based on colors
  const colorBasedAnimation = () => {
    if (colors.length === 0) {
      setActiveStep(0);
    } else if (colors.length === 1) {
      setActiveStep(1);
    } else if (colors.length === 2) {
      setActiveStep(2);
    }
  };

  useEffect(() => {
    colorBasedAnimation();
  }, [colors]);

  // Handle navigation
  const handleNavigation = (action: 'inc' | 'dec' = 'inc') => {
    if (action === 'inc') {
      if (activeStep === 3 || activeStep === 2) return;
      if (activeStep === 1 && colors.length === 1) return;
      if (activeStep === 0 && colors.length === 0) return;
      setActiveStep(p => p + 1);
    } else {
      if (activeStep === 0) return;
      setActiveStep(p => p - 1);
    }
  };

  // Monitor screen focus
  useEffect(() => {
    if (isFocused) {
      onScreenBlur('comparator');
    } else {
      if (!!selectedImg && changedImage) {
        setOption('picker');
        removeImage();
      }
      setChangedImage(false);
    }
  }, [isFocused]);

  // Add current color to the list
  const addCurrentColor = () => {
    const present = Date.now();
    const name = ntc.name(
      option === 'picker' ? color.value : activeColor.value,
    );
    const newColor = {
      name,
      id: nanoid(),
      displayName: name,
      createdAt: present,
      color: option === 'picker' ? color.value : activeColor.value,
    };

    setColors(prevColors => {
      if (prevColors.length >= 2) {
        // Replace the second color with the new color
        return activeStep === 0
          ? [newColor, prevColors[1]]
          : [prevColors[0], newColor];
      } else {
        // Append the new color to the array
        return prevColors.length === 1 && activeStep === 0
          ? [newColor]
          : [...prevColors, newColor];
      }
    });
  };

  // Delete color from the list
  const deleteColor = (id: string) => {
    setColors(p => p.filter(c => c.id !== id));
  };

  // Switch between options to add colors
  const onSwitch = async (option: string) => {
    if (option === 'image') {
      const response = await selectImage(imageHeight);

      if (response === 'success') {
        setOption(option);
        setChangedImage(true);
        hapticFeedback('impactLight');
      }
    } else {
      setOption(option);
      hapticFeedback('impactLight');
    }
  };

  const resetAll = () => {
    setColors([]);
    setOption('picker');
  };

  return (
    <Container style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.headerTitle]}>
          <MdText style={[styles.headerTitleText]}>Comparator</MdText>
        </View>
        <View style={[styles.headerSubtitle]}>
          <RgText style={[styles.headerSubtitleText]}>
            Easily compare and measure the difference between two colors, and
            optionally save them to a palette.
          </RgText>
        </View>
      </View>

      <Timeline activeStep={activeStep} icons={timelineIcons} />

      <View style={[styles.content]}>
        <OptionsSwitch
          option={option}
          onSwitch={onSwitch}
          activeStep={activeStep}
          handleNavigation={handleNavigation}
          comparisonMethod={comparisonMethod}
          setComparisonMethod={setComparisonMethod}
        />

        <View style={[styles.screensContainer]}>
          <>
            <View
              style={[
                styles.actionCenter,
                {
                  // marginTop: 40,
                  backgroundColor: actionCenterColor,
                },
              ]}
              onLayout={e => {
                const {height} = e.nativeEvent.layout;
                setImageHeight(height);
              }}>
              {option === 'picker' ? (
                <ColorsPicker color={color} />
              ) : option === 'camera' ? (
                isFocused && <CameraScanner />
              ) : (
                <ImageColors />
              )}
            </View>

            <ColorsPreview
              comparedColors={colors}
              deleteColor={deleteColor}
              addCurrentColor={addCurrentColor}
            />
          </>

          {activeStep >= 2 ? (
            <ComparisonScreen
              colors={colors}
              resetAll={resetAll}
              setActiveStep={setActiveStep}
              comparisonMethod={comparisonMethod}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </Container>
  );
};

export default Comparator;
