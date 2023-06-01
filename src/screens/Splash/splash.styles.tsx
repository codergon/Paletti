import {StyleSheet} from 'react-native';
import Layout from '@constants/Layout';
import {edges, padding} from '@helpers/styles';
import {PRIMARY_COLOR} from '@constants/Colors';
import {carouselSpec} from '@constants/data/onboarding';

const HOR_PADDING = 20;
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING} = carouselSpec;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  // Overlay
  overlay: {
    flex: 1,
    zIndex: 2,
    paddingBottom: 42,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },

  overlayTopbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    paddingHorizontal: HOR_PADDING,
  },

  overlayHeading: {
    marginTop: 16,
    marginBottom: 40,
    flexDirection: 'column',
    paddingHorizontal: HOR_PADDING,
    backgroundColor: 'transparent',
  },
  overlayHeading__Text: {
    fontSize: 33,
    letterSpacing: 0.3,
    color: PRIMARY_COLOR,
  },
  overlayHeading__Text__sub: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
  },
  scrollviewContainer: {
    width: '100%',
    paddingLeft: HOR_PADDING - SPACING,
    backgroundColor: 'transparent',
  },

  // Fearures Cards
  featuresCard: {
    margin: SPACING,
    width: ITEM_WIDTH,
    backgroundColor: 'transparent',
  },
  featuresCard__Image: {
    width: '100%',
    overflow: 'hidden',
    height: ITEM_HEIGHT,
    borderRadius: RADIUS,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  featuresCard__Text__Cover: {
    marginTop: 18,
    overflow: 'hidden',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  featuresCard__Text: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'NeueMontreal-Medium',
  },

  // Footer
  footer: {
    width: '100%',
    paddingTop: 20,
    ...edges(0, 34),
    paddingBottom: 70,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: HOR_PADDING,
  },
  footer__Title: {
    fontSize: 24,
    marginBottom: 30,
  },

  footer__Button__Container: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  footer__Button__Outline: {
    top: 12,
    zIndex: -1,
    height: '100%',
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#333',
    position: 'absolute',
    backgroundColor: 'transparent',
    width: Layout.window.width - 40 - 20,
  },
  footer__Button: {
    marginLeft: 12,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    ...padding(20, 22, 24),
    justifyContent: 'space-between',
    width: Layout.window.width - 40 - 14,
    backgroundColor: '#1e1e1e' || '#5611f7' || PRIMARY_COLOR,
  },
  footer__Button__Text: {
    fontSize: 13.8,
    lineHeight: 21,
    color: '#fff',
    letterSpacing: 0.6,
  },
  footer__Button__Icon: {
    width: 34,
    height: 34,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default styles;
