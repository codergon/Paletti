import {StatusBar, StyleSheet} from 'react-native';
import {edges, padding} from '../../helpers/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...padding(36, 0, 0),
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },

  content: {
    flex: 1,
    ...padding(0, 30),
    flexDirection: 'column',
  },
  colorShades: {
    // flex: 1,
    width: '100%',
    ...padding(10, 0),
  },
  scrollview: {
    paddingBottom: 30,
  },
});

export default styles;
