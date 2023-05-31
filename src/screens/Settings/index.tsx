import {
  Moon,
  CloudCheck,
  FunnelSimple,
  EnvelopeSimple,
  MusicNoteSimple,
} from 'phosphor-react-native';
import styles from './settings.styles';
import Config from './components/Config';
import Br from '../../components/common/Br';
import {View} from '../../components/Themed';
import {MdText} from '../../components/StyledText';
import {Container} from '../../components/Customized';
import AppStatusBar from '../../components/common/AppStatusBar';
import {useEffect} from 'react';
import {useLogic} from '../../context/LogicContext';
import {RootTabScreenProps} from '../../types';

const settings = [
  {
    key: 'sync',
    options: ['on', 'off'],
    title: 'iCloud Sync',
    icon: <CloudCheck size={19} color={'#8F8E93'} weight="duotone" />,
    description:
      'Sync your palettes across all your devices using your iCloud account',
  },
  {
    key: 'theme',
    title: 'Theme',
    options: ['dark', 'light', 'system'],
    icon: <Moon size={19} color={'#8F8E93'} weight="duotone" />,
    description: 'Choose a theme configuration for the app',
  },
  {
    key: 'sound',
    options: ['on', 'off'],
    title: 'Sound',
    icon: <MusicNoteSimple size={19} color={'#8F8E93'} weight="duotone" />,
    description: 'Play a sound when a color is copied',
  },
  {
    key: 'sorting',
    options: ['name', 'date'],
    title: 'Sort Palettes by',
    icon: <FunnelSimple size={19} color={'#8F8E93'} weight="duotone" />,
    description: 'Choose how you want to sort your palettes',
  },
  {
    key: 'contact',
    title: 'Contact Me',
    icon: <EnvelopeSimple size={19} color={'#8F8E93'} weight="duotone" />,
    description:
      'Share your review & improvement ideas regarding your experience',
  },
];

const Settings = ({navigation}: RootTabScreenProps<'settings'>) => {
  const {onScreenBlur} = useLogic();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onScreenBlur('settings');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container style={[styles.container]}>
      <AppStatusBar />

      <View style={[styles.header]}>
        <View style={[styles.headerTitle]}>
          <MdText style={[styles.headerTitleText]}>Settings</MdText>
        </View>
        <View style={[styles.headerSubtitle]}>
          <MdText style={[styles.headerSubtitleText]}>
            Optimize your Paletti experience by customizing the settings <Br />
            below to suit to your specific preferences.
          </MdText>
        </View>
      </View>

      <View style={[styles.settings]}>
        {settings?.map((config, index) => {
          return <Config key={config?.key} config={config} />;
        })}
      </View>
    </Container>
  );
};

export default Settings;
