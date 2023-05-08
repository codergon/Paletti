import {ColorSchemeName, useColorScheme as _useColorScheme} from 'react-native';
import {useSettings} from '../context/SettingsContext';

export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const {settings} = useSettings();
  const systemTheme = _useColorScheme() as NonNullable<ColorSchemeName>;

  if (settings.theme === 'system') return systemTheme;
  if (settings.theme === 'light') return 'light';
  return 'dark';
}
