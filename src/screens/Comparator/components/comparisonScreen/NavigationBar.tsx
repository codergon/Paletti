import {useState} from 'react';
import {Hue} from '@typings/palette';
import {StyleSheet, View} from 'react-native';
import {MdText} from '@components/StyledText';
import useColorScheme from '@hooks/useColorScheme';
import {TouchableOpacity} from '@components/Themed';
import {User, BellDot, Newspaper, Replace, Search} from 'lucide-react-native';

interface NavigationBarProps {
  colors: Hue[];
}

const NavigationBar = ({colors}: NavigationBarProps) => {
  const [swap, setSwap] = useState(false);
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#fff' : '#000';
  const btnBorder = isDark ? '#555' : '#ccc';
  const btnBg = isDark ? '#383838' : '#e8e8e8';

  return (
    <View style={[styles.container]}>
      <View style={[styles.actions]}>
        <View style={[styles.actionBtns]}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                borderWidth: 1,
                borderColor: btnBorder,
                backgroundColor: btnBg,
              },
            ]}
            onPress={() => setSwap(p => !p)}>
            <Replace size={20} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View
          style={[
            styles.navbackground,
            {
              backgroundColor: colors[swap ? 1 : 0]?.color ?? '#000',
            },
          ]}>
          {[
            {
              icon: (
                <Newspaper
                  size={18}
                  color={colors[swap ? 0 : 1]?.color ?? '#000'}
                />
              ),
            },
            {
              icon: (
                <Search
                  size={18}
                  color={colors[swap ? 1 : 0]?.color ?? '#000'}
                />
              ),
            },
            {
              icon: (
                <BellDot
                  size={18}
                  color={colors[swap ? 0 : 1]?.color ?? '#000'}
                />
              ),
            },
            {
              icon: (
                <User size={18} color={colors[swap ? 0 : 1]?.color ?? '#000'} />
              ),
            },
          ].map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderRadius: index === 1 ? 20 : 0,
                    paddingVertical: index === 1 ? 8 : 4,
                    paddingHorizontal: index === 1 ? 10 : 6,
                    paddingRight: index === 1 ? 12 : 6,
                    backgroundColor:
                      index === 1 ? colors[swap ? 0 : 1]?.color : 'transparent',
                  },
                ]}>
                {item.icon}
                {index === 1 && (
                  <MdText
                    style={{
                      marginLeft: 8,
                      color: colors[swap ? 1 : 0]?.color,
                    }}>
                    Search
                  </MdText>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default NavigationBar;

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
  },
  actionBtns: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  actionBtn: {
    padding: 10,
    borderRadius: 6,
  },

  // Navbar
  cardContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  navbackground: {
    width: '100%',
    maxHeight: '100%',
    borderRadius: 100,
    paddingVertical: 13,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});
