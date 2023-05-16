import {Linking, useColorScheme} from 'react-native';
import Icons from '../components/Icons';
import overrideColorScheme from 'react-native-override-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';

const CONTACT_URL = 'https://alphaglitch.dev';

export type Settings = {
  sync: 'on' | 'off';
  sound: 'on' | 'off';
  theme: 'light' | 'dark' | 'system';
  sorting: 'name' | 'date';
};

export const preferredSocials = [
  'WhatsApp',
  'Twitter',
  'Snapchat',
  'Discord',
  'Telegram',
  'TikTok',
];

type SupportedApps = (typeof preferredSocials)[number][];

type ContextType = {
  settings: Settings;
  supportedApps: {
    platform: string;
    icon: React.ReactElement;
  }[];
  openContact: () => void;
  updateSettings: (
    key: keyof Settings,
    value: Settings[keyof Settings],
  ) => void;
  setSettings: (settings: Settings) => void;
};

export const SettingsContext = createContext<ContextType>({
  settings: {
    sync: 'off',
    sound: 'on',
    theme: 'system',
    sorting: 'name',
  },
  supportedApps: [],
  openContact: () => {},
  setSettings: () => {},
  updateSettings: () => {},
});

interface SettingsProviderProps {
  children: React.ReactElement | React.ReactElement[];
}
export default function SettingsProvider({children}: SettingsProviderProps) {
  const [socialApps, setSupportedApps] = useState<SupportedApps>([]);
  const systemTheme = useColorScheme();

  const [settings, setSettings] = useState<Settings>({
    sync: 'off',
    sound: 'on',
    theme: 'system',
    sorting: 'name',
  });

  const getSupportedApps = async () => {
    const installed = [];

    for (const app of preferredSocials) {
      const isInstalled = await Linking.canOpenURL(`${app.toLowerCase()}://`);
      if (isInstalled && installed.length < 4) {
        installed.push(app);
      }
    }
    setSupportedApps(installed);
  };

  useEffect(() => {
    if (socialApps.length === 0) {
      getSupportedApps();
    }
  }, []);

  const openContact = () => {
    Linking.canOpenURL(CONTACT_URL).then(supported => {
      if (supported) {
        Linking.openURL(CONTACT_URL);
      }
    });
  };

  useEffect(() => {
    if (settings.theme === 'dark' || settings.theme === 'light') {
      overrideColorScheme.setScheme(settings.theme);
    } else {
      overrideColorScheme.setScheme();
    }
  }, [settings.theme]);

  const updateSettings = async (
    key: keyof Settings,
    value: Settings[keyof Settings],
  ) => {
    setSettings({...settings, [key]: value});
    await AsyncStorage.setItem(
      'settings',
      JSON.stringify({...settings, [key]: value}),
    );
  };

  const getIcon = (platform: keyof typeof Icons) => {
    const Icon = Icons[platform];
    return Icon ? <Icon size={40} /> : <></>;
  };

  const supportedApps = useMemo(() => {
    const socials = socialApps.map(app => {
      return {
        platform: app,
        icon: getIcon(app as keyof typeof Icons),
      };
    });
    return socials.length >= 4
      ? [
          ...socials,
          {
            platform: 'More',
            icon: <Icons.More size={40} />,
          },
        ]
      : [
          {
            platform: 'More',
            icon: <Icons.More size={40} />,
          },
          ...socials,
        ];
  }, [socialApps]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        openContact,
        setSettings,
        updateSettings,

        supportedApps,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
