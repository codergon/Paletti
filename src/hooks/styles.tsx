import {SECONDARY_COLOR} from '../constants/Colors';
import {padding} from '../helpers/styles';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  menuContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },

  menuListInner: {
    flexDirection: 'column',
  },
  optionsWrapper: {
    shadowRadius: 3,
    borderRadius: 14,
    shadowOpacity: 0.2,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowOffset: {width: -1, height: 1},
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  menuItem: {
    minWidth: 170,
    width: '100%',
    display: 'flex',
    ...padding(12, 0),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  menuItemLabel: {
    fontSize: 15,
    letterSpacing: 0.35,
    textTransform: 'capitalize',
  },
});
