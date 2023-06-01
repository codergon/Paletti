import {StyleSheet} from 'react-native';
import {View} from '@components/Themed';
import {PieChart} from 'react-native-gifted-charts';

interface ProgressringsProps {
  color1: string;
  color2: string;
}

const Piechart = ({color1, color2}: ProgressringsProps) => {
  const pieData = [
    {value: 36, color: color1},
    {value: 23, color: color2},
    {value: 22, color: color1},
    {value: 19, color: color2},
  ];

  return (
    <View style={styles.container}>
      <PieChart
        showText
        radius={82}
        focusOnPress
        data={pieData}
        key={Math.random()}
        showValuesAsLabels={false}
        showTextBackground={false}
      />
    </View>
  );
};

export default Piechart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
