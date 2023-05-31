import {StyleSheet} from 'react-native';
import Layout from '../../../../constants/Layout';
import {View} from '../../../../components/Themed';
import {HexToRgb} from '../../../../helpers/colors';
import {ProgressChart} from 'react-native-chart-kit';
import {ChartConfig} from 'react-native-chart-kit/dist/HelperTypes';

interface ProgressringsProps {
  color1: string;
  color2: string;
}

const Progressrings = ({color1, color2}: ProgressringsProps) => {
  const width = Layout.window.width - 40 - 32;

  const data = {
    labels: ['Swim', 'Bike', 'Run'],
    data: [0.4, 0.8],
  };

  const data2 = {
    labels: ['Bike'],
    data: [0.6],
  };

  const chartConfig: ChartConfig = {
    strokeWidth: 2,
    backgroundGradientToOpacity: 0,
    useShadowColorFromDataset: false,
    backgroundGradientFromOpacity: 0,
    color: (opacity = 1) =>
      `rgba(${HexToRgb(color1).slice(4, -1)}, ${opacity + 0.25})`,
  };

  const chartConfig2: ChartConfig = {
    ...chartConfig,
    color: (opacity = 1) =>
      `rgba(${HexToRgb(color2).slice(4, -1)}, ${opacity + 0.4})`,
  };

  return (
    <View style={styles.container}>
      <ProgressChart
        radius={54}
        data={data}
        width={200}
        height={200}
        strokeWidth={16}
        hideLegend={!false}
        chartConfig={chartConfig}
      />

      <ProgressChart
        hideLegend
        radius={28}
        data={data2}
        width={width}
        height={220}
        strokeWidth={16}
        style={{
          position: 'absolute',
        }}
        chartConfig={chartConfig2}
      />
    </View>
  );
};

export default Progressrings;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
