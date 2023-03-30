import {StatusBar, StyleSheet} from 'react-native';
import {edges, padding} from '../../helpers/styles';

const HOR_PADDING = 20;
const statusBarHeight = StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  // Image
  recentImage: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 80,
  },

  // Status Messages
  block: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  normal_text: {
    color: '#fff',
  },

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

  actionBtnCover: {
    height: 45,
    width: 100,
    flexGrow: 0,
    flexDirection: 'row',
  },

  // Main Content

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#000',
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
    flexDirection: 'column',
  },

  bottomBarBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    ...padding(6, 6, 14),
    justifyContent: 'space-around',
  },
  actionBtn: {
    minWidth: 37,
    minHeight: 37,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
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
