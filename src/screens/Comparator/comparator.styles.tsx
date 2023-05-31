import {StyleSheet} from 'react-native';
import {padding} from '../../helpers/styles';
import {ELEM_HEIGHT} from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  // Header
  header: {
    marginBottom: 34,
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
    fontSize: 26,
    letterSpacing: 0.4,
  },

  headerSubtitle: {
    marginTop: 12,
    width: '100%',
  },
  headerSubtitleText: {
    fontSize: 15,
    letterSpacing: 0.2,
    lineHeight: 15 * 1.3,
  },

  // Content
  content: {
    flex: 1,
    width: '100%',
    paddingBottom: 46,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  // Section title and nav buttons
  sectionTitle: {
    marginTop: 30,
    width: '100%',
    marginBottom: 26,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  selectorSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Nav buttons
  navBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBtn: {
    marginLeft: 12,
    borderRadius: 6,
    ...padding(7, 8),
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Screens container
  screensContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },

  // Action center
  actionCenter: {
    flex: 1,
    marginTop: 0,
    borderRadius: 10,
    marginBottom: 14,
    overflow: 'hidden',
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  // Preview
  previewContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  preview: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    height: ELEM_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
  },
  saveBtn: {
    marginLeft: 20,
    borderRadius: 12,
    borderWidth: 1.2,
    height: ELEM_HEIGHT,
    alignItems: 'center',
    width: ELEM_HEIGHT - 2,
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    height: ELEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
