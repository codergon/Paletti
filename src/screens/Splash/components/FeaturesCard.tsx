import {Animated} from 'react-native';
import styles from '../splash.styles';
import {View, ViewProps} from '@components/Themed';

interface FeaturesCardProps extends ViewProps {
  feature: {
    image: any;
    key: string;
    text: string;
  };
  scale?: Animated.AnimatedInterpolation<number> | number;
}

const FeaturesCard = ({feature, children, scale = 1}: FeaturesCardProps) => {
  return (
    <View style={styles.featuresCard}>
      <View style={styles.featuresCard__Image}>
        <Animated.Image
          source={feature.image}
          style={[
            {
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              transform: [{scale}],
            },
          ]}
        />
      </View>

      <View style={styles.featuresCard__Text__Cover}>
        {children && children}
      </View>
    </View>
  );
};

export default FeaturesCard;
