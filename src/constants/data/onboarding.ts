import Layout from '../Layout';

export default [
  {
    key: '1',
    text: 'Scan your surroundings to save colors around you',
    // image: require("../assets/images/onboarding1.png"),
    image:
      'https://ik.imagekit.io/alphaknight/Illustration1__5__-zPvGh0j-.jpg?updatedAt=1678975196280',
  },
  {
    key: '2',
    text: 'View color names, hex codes and locations of your saved items',
    image:
      'https://ik.imagekit.io/alphaknight/Group_32956__4__oyFqfHiPP.png?updatedAt=1678972583392',
  },
  {
    key: '3',
    text: 'Get color palettes from your favorite images',
    image:
      'https://ik.imagekit.io/alphaknight/Illustration-2__3__tqBg3d1Pd.jpg?updatedAt=1678982810602',
  },
  {
    key: '4',
    // text: "Share your palettes with friends and family",
    text: 'Get recommendations on colors that match your skin tone',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/bf6b6a127390511.6140ebc5be3bb.jpg',
  },
];

const SPACING = 12;
const s = (Layout.window.width - 52) * 0.58;
export const carouselSpec = {
  SPACING,
  RADIUS: 6,
  ITEM_WIDTH: s,
  ITEM_HEIGHT: s * 1.4,
  FULL_SIZE: s + SPACING * 2,
};
