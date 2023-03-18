import Icons from '../Icons';
import {padding} from '../../utils';
import {InputBd} from '../StyledText';
import {View, useColorScheme, StyleSheet} from 'react-native';
import {Pressable} from '../Themed';

type SearchbarProps = {
  search: string;
  setSearch: (text: string) => void;
};

const Searchbar = ({search, setSearch}: SearchbarProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#ddd' : '#666';
  const textColor = isDark ? '#fff' : '#000';
  const darken = isDark ? '#2b2b2b' : '#f2f2f2';

  return (
    <View style={[styles.searchbar, {backgroundColor: darken}]}>
      {!search && (
        <View style={styles.searchbar__icon__cover}>
          <Icons.Search color={iconColor} style={styles.searchbar__icon} />
        </View>
      )}

      <InputBd
        value={search}
        color={textColor}
        onChangeText={setSearch}
        style={styles.searchbar__input}
        placeholder="Search for a task"
        placeholderTextColor={'#808080'}
      />

      {search && (
        <Pressable
          onPress={_ => setSearch('')}
          style={{
            ...styles.close__icon__cover,
            backgroundColor: isDark ? '#555' : '#d8d8d8',
          }}>
          <Icons.Close size={12} fill={iconColor} />
        </Pressable>
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbar: {
    flex: 1,
    height: 42,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    ...padding(2, 10),
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
    fontSize: 16,
    paddingTop: 2,
  },
});
