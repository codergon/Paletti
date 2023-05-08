import {View} from 'react-native';
import styles from '../settings.styles';
import {CaretRight} from 'phosphor-react-native';
import {capitalize} from '../../../helpers/common';
import {MdText} from '../../../components/StyledText';
import useColorScheme from '../../../hooks/useColorScheme';
import {TouchableOpacity} from '../../../components/Themed';
import {ContextMenuButton} from 'react-native-ios-context-menu';
import {Settings, useSettings} from '../../../context/SettingsContext';

interface ConfigProps {
  config: {
    title: string;
    description?: string;
    icon: React.ReactElement;
    options?: string[];
    key: string;
  };
}
const Config = ({config}: ConfigProps) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const {openMail, settings, updateSettings} = useSettings();
  const borderBottomColor = isDark ? '#444' : '#e1e1e1';

  const ConfigRenderer = () => {
    return (
      <>
        <View
          style={[
            styles.settings__item__icon,
            {
              height: config?.description ? 48 : 34,
            },
          ]}>
          {config?.icon}
        </View>

        <View style={[styles.settings__item__details]}>
          <View style={[styles.settings__item__details__info]}>
            <MdText
              style={[
                styles.settings__item__details__info__title,
                {
                  marginBottom: config?.description ? 3 : 0,
                },
              ]}>
              {`${config?.title}${
                config?.key !== 'contact' ? ':' : ''
              } ${capitalize(settings[config?.key as keyof Settings] ?? '')}`}
            </MdText>
            {config?.description && (
              <MdText
                style={[
                  styles.settings__item__details__info__subtitle,
                  {
                    color: '#8F8E93',
                  },
                ]}>
                {config?.description}
              </MdText>
            )}
          </View>
          {!['contact', 'developer', 'sync'].includes(config?.key) && (
            <View style={[styles.settings__item__details__icon]}>
              {/* <Icons.CaretUpDown
                size={14}
                color={'#8F8E93'}
                strokeWidth={0.8}
              /> */}

              <CaretRight size={18} weight="bold" color={'#8F8E93'} />
            </View>
          )}
        </View>
      </>
    );
  };

  return !['contact', 'developer'].includes(config?.key) ? (
    <ContextMenuButton
      isMenuPrimaryAction
      onPressMenuItem={({nativeEvent}) => {
        updateSettings(
          config?.key as keyof Settings,
          nativeEvent.actionKey as Settings[keyof Settings],
        );
      }}
      menuConfig={{
        menuTitle: '',
        menuItems: config?.options?.map(option => {
          return {
            actionKey: option,
            actionTitle: capitalize(option),
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName:
                  settings[config?.key as keyof Settings] === option
                    ? 'checkmark'
                    : '',
                weight: 'regular',
              },
            },
          };
        }),
      }}>
      <View
        style={[
          styles.settings__item,
          {
            borderBottomColor,
            paddingTop: config?.description ? 12 : 14,
            // borderBottomWidth: config?.key !== 'developer' ? 1 : 0,
          },
        ]}>
        <ConfigRenderer />
      </View>
    </ContextMenuButton>
  ) : (
    <TouchableOpacity
      onPress={() => {
        if (config?.key === 'contact') {
          openMail();
        }
      }}
      style={[
        styles.settings__item,
        {
          borderBottomColor,
          paddingTop: config?.description ? 12 : 14,
          //   borderBottomWidth: config?.key !== 'developer' ? 1 : 0,
        },
      ]}>
      <ConfigRenderer />
    </TouchableOpacity>
  );
};

export default Config;
