import {useState} from 'react';
import Linegraph from './Linegraph';
import {StyleSheet} from 'react-native';
import Progressrings from './Progressrings';
import {Replace} from 'lucide-react-native';
import {Hue} from '../../../../types/palette';
import {TouchableOpacity, View} from '../../../../components/Themed';
import useColorScheme from '../../../../hooks/useColorScheme';
import Piechart from './Piechart';

interface ChartsProps {
  colors: Hue[];
}

const Charts = ({colors}: ChartsProps) => {
  const [type, setType] = useState('line');
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#fff' : '#000';
  const btnBorder = isDark ? '#555' : '#ccc';
  const btnBg = isDark ? '#383838' : '#e8e8e8';

  return (
    <View style={[styles.container]}>
      <View style={[styles.actions]}>
        <View style={[styles.actionBtns]}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                borderWidth: 1,
                borderColor: btnBorder,
                backgroundColor: btnBg,
              },
            ]}
            onPress={() =>
              setType(p =>
                p === 'line'
                  ? 'piechart'
                  : p === 'piechart'
                  ? 'progress'
                  : 'line',
              )
            }>
            <Replace size={20} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
      {type === 'progress' ? (
        <Progressrings
          color1={colors[0]?.color ?? '#000'}
          color2={colors[1]?.color ?? '#000'}
        />
      ) : type === 'line' ? (
        <Linegraph
          color1={colors[0]?.color ?? '#000'}
          color2={colors[1]?.color ?? '#000'}
        />
      ) : (
        <Piechart
          color1={colors[0]?.color ?? '#000'}
          color2={colors[1]?.color ?? '#000'}
        />
      )}
    </View>
  );
};

export default Charts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  actions: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  actionBtns: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  actionBtn: {
    padding: 9,
    borderRadius: 6,
  },
});
