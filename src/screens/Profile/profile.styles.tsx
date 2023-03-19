import {StyleSheet} from 'react-native';
import {edges, padding} from '../../helpers/styles';
import {MODAL_BACKGROUND} from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...padding(36, 0, 0),
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    ...padding(0, 14),
    flexDirection: 'column',
  },
  viewShot: {
    ...edges(40),
    width: '100%',
    ...padding(8, 16, 10),
    flexDirection: 'column',
    backgroundColor: MODAL_BACKGROUND,
  },
  colorShades: {
    flex: 1,
    width: '100%',
    ...padding(10, 0, 16),
  },
  scrollview: {
    minHeight: '100%',
  },
});

export default styles;
