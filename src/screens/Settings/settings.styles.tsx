import {StyleSheet} from 'react-native';
import {padding} from '@helpers/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerTitle: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerSubtitle: {
    marginTop: 14,
    width: '100%',
  },
  headerSubtitleText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#8F8E93',
    letterSpacing: 0.2,
  },

  headerTitleText: {
    fontSize: 25,
    letterSpacing: 0.4,
  },
  searchbar__cover: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paletteList: {
    marginTop: 6,
    width: '100%',
    flexDirection: 'column',
  },

  // SETTINGS
  settings: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'column',
  },
  settings__item: {
    width: '100%',
    ...padding(12, 0, 13),
    alignItems: 'center',
    flexDirection: 'row',
  },
  settings__item__icon: {
    width: 44,
    paddingRight: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings__item__details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settings__item__details__info: {
    flex: 1,
    flexDirection: 'column',
  },
  settings__item__details__info__title: {
    fontSize: 15.6,
    letterSpacing: 0.4,
  },
  settings__item__details__info__subtitle: {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  settings__item__details__icon: {
    marginLeft: 20,
  },
});

export default styles;
