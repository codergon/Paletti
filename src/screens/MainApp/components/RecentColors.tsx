import {useState} from 'react';
import ColorItem from './ColorItem';
import {StyleSheet} from 'react-native';
import {ScrollView, View} from '../../../components/Themed';
import {actionsConfig} from '../../../constants/Colors';

const RecentColors = () => {
  const [current, setCurrent] = useState(-1);

  return (
    <ScrollView
      horizontal
      // bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{backgroundColor: 'transparent'}}
      contentContainerStyle={[styles.recentColors]}>
      {[...actionsConfig].map((item, index, arr) => {
        return (
          <ColorItem
            key={index}
            item={item}
            index={index}
            current={current}
            setCurrent={setCurrent}
            isLast={arr.length - 1 === index}
          />
        );
      })}
    </ScrollView>
  );
};

export default RecentColors;

const styles = StyleSheet.create({
  recentColors: {
    height: 44,
    paddingRight: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
