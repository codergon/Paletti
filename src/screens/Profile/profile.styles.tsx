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
    // minHeight: '100%',
    ...padding(8, 16, 10),
    flexDirection: 'column',
    backgroundColor: MODAL_BACKGROUND,
  },
  colorShades: {
    flex: 1,
    width: '100%',
    ...padding(10, 0, 0),
  },
  scrollview: {
    minHeight: '100%',
    backgroundColor: MODAL_BACKGROUND,
  },

  devDetails: {
    width: '100%',
    marginTop: 4,
    ...padding(10, 0, 6),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  devText: {
    fontSize: 12,
    color: '#000',
  },
  developer: {
    fontSize: 12,
    color: '#00f',
  },

  // Empty state
  emptyStateContainer: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    ...padding(0, 0, '35%'),
  },
  emptyStateContent: {
    marginBottom: 20,
    alignItems: 'center',
  },
  emptyStateImage: {
    width: 144,
    height: 144,
    borderRadius: 90,
    backgroundColor: '#f1f1f1',
  },
  emptyStateText: {
    width: '100%',
    fontSize: 22,
    color: '#000',
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyStateText__sub: {
    marginTop: 8,
    fontSize: 16,
    color: '#a3a3a3',
    textAlign: 'center',
  },
});

export default styles;
