import Layout from '../Layout';

export default [
  {
    key: '1',
    image: require('../../assets/images/onboarding/1.jpeg'),
    text: 'Scan your surroundings to save colors around you',
  },
  {
    key: '2',
    image: require('../../assets/images/onboarding/2.png'),
    text: 'View color names, hex codes and locations of your saved items',
  },
  {
    key: '3',
    image: require('../../assets/images/onboarding/3.jpeg'),
    text: 'Get color palettes from your favorite images',
  },
  {
    key: '4',
    image: require('../../assets/images/onboarding/4.jpg'),
    text: 'Get suggestions for colors that complement your skin tone',
  },
];

const SPACING = 12;
const s = (Layout.window.width - 52) * 0.58;
const h = Layout.window.height * 0.33;

export const carouselSpec = {
  SPACING,
  RADIUS: 6,

  // ITEM_WIDTH: s,
  // ITEM_HEIGHT: s * 1.4,

  ITEM_HEIGHT: h,
  ITEM_WIDTH: h / 1.4,

  FULL_SIZE: s + SPACING * 2,
};
