import {StatusBar, StyleSheet} from 'react-native';
import {edges, padding} from '../../helpers/styles';

const HOR_PADDING = 20;
const statusBarHeight = StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  blackscreen: {
    flex: 1,
    backgroundColor: 'black',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },

  // Camera
  cameraCover: {
    flex: 1,
    ...edges(0, 14),
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  camera: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurredTop: {
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    height: statusBarHeight,
  },

  // Top and Bottom Bar
  bgActBtn: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.15,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: '#000',
  },

  actionButtonCover: {
    width: 37,
    height: 37,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  coveredBtn: {
    width: 34,
    height: 34,
    borderRadius: 100,
  },

  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  topBar: {
    left: 0,
    width: '100%',
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',

    paddingHorizontal: HOR_PADDING,
    justifyContent: 'space-between',
  },
  topActionBtns: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  // Bottom Bar
  bottomBar: {
    width: '100%',
    // paddingTop: 16,
    flexDirection: 'column',
    // backgroundColor: '#888',
  },

  bottomBarBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    ...padding(26, 6, 12),
    justifyContent: 'space-around',
  },
  actionBtn: {
    minWidth: 37,
    minHeight: 37,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f00',
  },

  mainButton: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default styles;
