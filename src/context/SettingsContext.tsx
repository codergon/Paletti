import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance, Linking} from 'react-native';
import Icons from '../components/Icons';

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
  openMail: () => void;
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
  openMail: () => {},
  setSettings: () => {},
  updateSettings: () => {},
});

interface SettingsProviderProps {
  children: React.ReactElement | React.ReactElement[];
}
export default function SettingsProvider({children}: SettingsProviderProps) {
  const [socialApps, setSupportedApps] = useState<SupportedApps>([]);

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

  const openMail = () => {};

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
        openMail,
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
