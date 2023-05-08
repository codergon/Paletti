import {StyleSheet} from 'react-native';
import {edges, padding} from '../../helpers/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  headerTitle: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitleText: {
    fontSize: 25,
    letterSpacing: 0.4,
  },
  headerBtns: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbar__cover: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Status Message
  statusMsgCover: {
    height: 34,
    width: '100%',
    paddingTop: 6,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  blockCenter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning_text: {
    color: '#fca75d',
  },
  error_text: {
    color: '#ef857a',
  },
  success_text: {
    color: '#3cf2af',
  },

  // Palette List
  paletteList: {
    width: '100%',
    paddingHorizontal: 6,
    flexDirection: 'column',
  },
  viewShot: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 6,
    flexDirection: 'column',
  },
  divider: {
    flex: 1,
    height: 2,
    marginTop: 3,
    marginBottom: 9,
    borderRadius: 10,
    marginHorizontal: 14,
  },

  // Empty State
  emptyState: {
    flex: 1,
    width: '100%',
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState__text: {
    fontSize: 15,
    color: '#8F8E93',
  },
});

export default styles;
