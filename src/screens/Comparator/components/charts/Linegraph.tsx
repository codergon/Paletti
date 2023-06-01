import Layout from '@constants/Layout';
import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

interface LinegraphProps {
  color1: string;
  color2: string;
}

const Linegraph = ({color1, color2}: LinegraphProps) => {
  const width = Layout.window.width - 40 - 32;
  const lineData = [
    {value: 0},
    {value: 10},
    {value: 8},
    {value: 58},
    {value: 56},
    {value: 78},
    {value: 74},
    {value: 98},
  ];
  const lineData2 = [
    {value: 0},
    {value: 20},
    {value: 18},
    {value: 40},
    {value: 36},
    {value: 60},
    {value: 54},
    {value: 35},
  ];

  return (
    <View
      style={{
        width,
        flex: 1,
        marginLeft: -16,
        overflow: 'hidden',
        alignItems: 'center',
      }}>
      <LineChart
        curved
        areaChart
        spacing={48}
        color2={color2}
        color1={color1}
        initialSpacing={0}
        // @ts-ignore
        data={lineData}
        // @ts-ignore
        data2={lineData2}
        //
        thickness={2}
        width={500}
        adjustToWidth
        hideDataPoints
        hideAxesAndRules
        endOpacity={0.3}
        startOpacity={0.8}
        scrollAnimation={false}
        startFillColor2={color2}
        startFillColor1={color1}
      />
    </View>
  );
};

export default Linegraph;

const styles = StyleSheet.create({});
