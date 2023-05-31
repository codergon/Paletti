import {useState} from 'react';
import {Replace} from 'lucide-react-native';
import {StyleSheet, View} from 'react-native';
import {Hue} from '../../../../types/palette';
import {padding} from '../../../../helpers/styles';
import {MdText} from '../../../../components/StyledText';
import useColorScheme from '../../../../hooks/useColorScheme';
import {TouchableOpacity} from '../../../../components/Themed';

interface ColorCardsProps {
  colors: Hue[];
}

const ColorCards = ({colors}: ColorCardsProps) => {
  const [swap, setSwap] = useState(false);
  const isDark = useColorScheme() === 'dark';
  const btnBg = isDark ? '#363636' : '#e8e8e8';

  return (
    <View style={[styles.container]}>
      <View style={[styles.actions]}>
        <View style={[styles.actionBtns]}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                backgroundColor: btnBg,
              },
            ]}
            onPress={() => setSwap(p => !p)}>
            <Replace size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View
          style={[
            styles.card1,
            {
              backgroundColor: colors[swap ? 1 : 0]?.color ?? '#000',
            },
          ]}>
          <View
            style={[
              styles.card2,
              {
                backgroundColor: colors[swap ? 0 : 1]?.color ?? '#000',
              },
            ]}>
            <View
              style={[
                styles.textContainer,
                {
                  backgroundColor: colors[swap ? 1 : 0]?.color ?? '#000',
                },
              ]}>
              <MdText
                style={[
                  styles.text,
                  {
                    color: colors[swap ? 0 : 1]?.color ?? '#000',
                  },
                ]}>
                {colors[swap ? 0 : 1].name}
              </MdText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ColorCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  actionBtns: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  actionBtn: {padding: 10, borderRadius: 6},

  // Cards
  cardContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  card1: {
    height: 200,
    padding: 40,
    width: '100%',
    borderRadius: 20,
    maxHeight: '100%',
  },
  card2: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    borderRadius: 40,
    ...padding(12, 22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    letterSpacing: 0.4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
