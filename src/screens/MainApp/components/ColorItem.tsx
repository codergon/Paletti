import React, {useState} from 'react';
import {LightenDarkenColor} from '../../../helpers/colors';
import {MdText} from '../../../components/StyledText';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  withDelay,
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  item: {
    color: string;
  };
  index: number;
  isLast: boolean;
  current: number;
  setCurrent: (index: number | ((p: number) => number)) => void;
}

const shadeSize = 21;

const ColorItem = ({item, index, current, isLast, setCurrent}: Props) => {
  const [showName, setShowName] = useState(false);

  const left = useSharedValue(12);
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      transform: [{translateX: left.value}],
    };
  });

  const toggleName = (isForward: boolean) => {
    const DURATION = 200;
    left.value = withDelay(
      isForward ? 0 : DURATION,
      withTiming(isForward ? 0 : Math.round(shadeSize / 2) + 2, {
        duration: DURATION,
      }),
    );

    width.value = withSequence(
      withTiming(shadeSize + 12, {
        duration: DURATION,
      }),
      withTiming(isForward ? shadeSize + 76 : 0, {
        duration: DURATION,
      }),
    );

    height.value = withDelay(
      isForward ? 0 : DURATION,
      withTiming(isForward ? shadeSize + 9 : 0, {
        duration: DURATION,
      }),
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        toggleName(!showName);
        setShowName(p => !p);

        // setCurrent(p => {
        //   if (p === index) {
        //     toggleName(true);
        //     return -1;
        //   } else {
        //     toggleName(true);
        //     return index;
        //   }
        // });
      }}
      style={[
        styles.colorItem,
        {
          marginRight: isLast ? 0 : 8,
        },
      ]}>
      <View
        style={[
          styles.colorShade,
          {
            marginLeft: 5,
            backgroundColor: item.color,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.colorTextCover,
          {
            backgroundColor: LightenDarkenColor(item.color, 130),
          },

          animatedStyles,
        ]}>
        <MdText
          numberOfLines={1}
          style={[
            styles.colorText,
            {
              color: item.color,
            },
          ]}>
          {item.color}
        </MdText>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  colorItem: {
    height: 42,
    minWidth: 30,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "red",
  },
  colorShade: {
    zIndex: 2,
    width: shadeSize,
    height: shadeSize,
    borderRadius: 40,
    position: 'absolute',
  },
  colorTextCover: {
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorText: {
    fontSize: 12,
    marginLeft: 30,
  },
});
