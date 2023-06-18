import {useState} from 'react';
import {View} from 'react-native';
import Layout from '@constants/Layout';
import {BarChart} from 'react-native-gifted-charts';

interface LinegraphProps {
  color1: string;
  color2: string;
  textColor: string;
}

const Barchart = ({color1, color2, textColor}: LinegraphProps) => {
  const [height, setheight] = useState(0);
  const width = Layout.window.width - 40 - 32;

  const barData = [
    {value: 250, label: '  M'},
    {value: 500, label: '  T', frontColor: color2},
    {value: 745, label: '  W', frontColor: color2},
    {value: 320, label: '  T'},
    {value: 600, label: '  F', frontColor: color2},
    {value: 256, label: '  S'},
    {value: 300, label: '  S'},
  ];

  return (
    <View
      style={{
        width,
        flex: 1,
        overflow: 'hidden',
        alignItems: 'center',
      }}
      onLayout={e => setheight(e.nativeEvent.layout.height)}>
      {height > 0 && (
        <BarChart
          xAxisLabelTextStyle={{
            color: textColor,
          }}
          barWidth={16}
          data={barData}
          noOfSections={10}
          xAxisThickness={0}
          yAxisThickness={0}
          barBorderRadius={4}
          frontColor={color1}
          height={height - 50}
          hideAxesAndRules={true}
          initialSpacing={width * 0.1}
        />
      )}
    </View>
  );
};

export default Barchart;
