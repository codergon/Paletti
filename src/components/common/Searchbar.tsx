import Icons from '../Icons';
import {Pressable} from '../Themed';
import {InputBd, InputMd, InputRg} from '../StyledText';
import {padding} from '../../helpers/styles';
import {View, StyleSheet} from 'react-native';
import {useStore} from '../../context/AppContext';
import useColorScheme from '../../hooks/useColorScheme';

type SearchbarProps = {
  showMargin?: boolean;
  placeholder?: string;
};

const Searchbar = ({showMargin = true, placeholder}: SearchbarProps) => {
  const colorScheme = useColorScheme();
  const {search, setSearch} = useStore();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#ddd' : '#666';
  const textColor = isDark ? '#fff' : '#000';
  const darken = isDark ? '#282828' : '#eee';

  return (
    <View
      style={[
        styles.searchbar,
        {
          backgroundColor: darken,
          marginTop: showMargin ? 12 : 0,
        },
      ]}>
      {!search && (
        <View style={styles.searchbar__icon__cover}>
          <Icons.Search
            color={iconColor}
            size={14}
            style={styles.searchbar__icon}
          />
        </View>
      )}

      <InputRg
        value={search}
        color={textColor}
        onChangeText={setSearch}
        style={styles.searchbar__input}
        placeholder={placeholder ?? 'Search for something...'}
        placeholderTextColor={iconColor}
      />

      {search && (
        <Pressable
          onPress={_ => setSearch('')}
          style={{
            ...styles.close__icon__cover,
            backgroundColor: isDark ? '#555' : '#d8d8d8',
          }}>
          <Icons.Close size={11} fill={iconColor} />
        </Pressable>
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbar: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 10,
    ...padding(4, 12),
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchbar__icon__cover: {marginRight: 10, backgroundColor: 'transparent'},
  close__icon__cover: {
    width: 24,
    marginLeft: 10,
    marginRight: 0,
    aspectRatio: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbar__icon: {width: 19, height: 19},
  searchbar__input: {
    flex: 1,
    height: 30,
    fontSize: 14.5,
    letterSpacing: 0.35,
  },
});
