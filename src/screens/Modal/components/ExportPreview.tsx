import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from '../../../components/Themed';
import {PaletteType} from '../../../types/palette';
import {BdText, MdText} from '../../../components/StyledText';
import {Export, Hash, Icon, X, YinYang} from 'phosphor-react-native';
import useColorScheme from '../../../hooks/useColorScheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {edges} from '../../../helpers/styles';
import Icons from '../../../components/Icons';
import {preferredSocials, useSettings} from '../../../context/SettingsContext';
import ExportContent from './ExportContent';
import {useState} from 'react';
import Share, {ShareOptions} from 'react-native-share';

type ExportPreviewProps = {
  palette: PaletteType;
  closeModal: () => void;
};

const ExportPreview = ({palette, closeModal}: ExportPreviewProps) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const {supportedApps} = useSettings();
  const isDark = colorScheme === 'dark';
  const darkColor = isDark ? '#fff' : '#000';
  const lightColor = isDark ? '#000' : '#fff';
  const headerBg = isDark ? '#242424' : '#eee';
  const containerBg = isDark ? '#121212' : '#fff';
  const [paletteImg, setPaletteImg] = useState<string>('');

  const sharePalette = async (platform: string) => {
    const shareOptions = {
      url: paletteImg,
      type: 'image/png',
      failOnCancel: false,
      title: 'Share Palette',
      filename: 'palette.png',
      message:
        platform.toLowerCase() !== 'whatsapp'
          ? 'Check out this palette I made with Paletti'
          : undefined,
    };

    try {
      if (preferredSocials?.find(item => item === platform && false)) {
        await Share.shareSingle({
          ...shareOptions,
          // @ts-ignore
          social: platform.toLowerCase(),
        });
      } else {
        await Share.open(shareOptions);
      }
    } catch (error) {
      // @ts-ignore
      // console.log(error?.message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: containerBg,
        },
      ]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: headerBg,
          },
        ]}>
        <TouchableOpacity
          onPress={closeModal}
          style={[styles.cancelBtn]}
          activeOpacity={1}>
          <X size={28} color={darkColor} weight="regular" />
        </TouchableOpacity>
        <MdText style={[styles.headerText]}>Preview</MdText>
      </View>

      <ExportContent
        palette={palette}
        highlightColor={headerBg}
        setPaletteImg={setPaletteImg}
      />

      <View
        style={[
          styles.footer,
          {
            backgroundColor: headerBg,
            paddingBottom: insets.bottom + 30,
          },
        ]}>
        {supportedApps?.length > 1 ? (
          <>
            <View
              style={[
                styles.footer__row,
                {
                  marginBottom: 14,
                },
              ]}>
              {supportedApps?.slice(0, 4)?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item?.platform}
                    style={[styles.platformBtn]}
                    onPress={() => sharePalette(item?.platform)}>
                    {item?.icon ?? (
                      <Hash size={40} weight="light" color={darkColor} />
                    )}
                    <MdText style={[styles.platformText]}>
                      {item?.platform}
                    </MdText>
                  </TouchableOpacity>
                );
              })}
            </View>
            {supportedApps?.length > 4 && (
              <View style={[styles.footer__row]}>
                {supportedApps?.slice(4)?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item?.platform}
                      style={[styles.platformBtn]}
                      onPress={() => sharePalette(item?.platform)}>
                      {item?.icon ?? (
                        <YinYang size={40} weight="light" color={darkColor} />
                      )}
                      <MdText style={[styles.platformText]}>
                        {item?.platform}
                      </MdText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.shareOptionBtn,
                {
                  marginTop: 30,
                  backgroundColor: darkColor,
                },
              ]}
              onPress={() => sharePalette('')}>
              <MdText
                style={[
                  styles.shareOptionText,
                  {
                    color: lightColor,
                  },
                ]}>
                Share
              </MdText>

              <Export
                size={18}
                weight="bold"
                color={lightColor}
                style={{
                  position: 'absolute',
                  right: 20,
                }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ExportPreview;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  cancelBtn: {
    top: 0,
    left: 10,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  footer: {
    width: '100%',
    paddingTop: 16,
    minHeight: 190,
    ...edges(16, 0),
    paddingHorizontal: 36,
    flexDirection: 'column',
  },
  footer__row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },

  // Share Platforms
  platformBtn: {
    minWidth: 62,
    alignItems: 'center',
    flexDirection: 'column',
  },
  platformText: {
    fontSize: 12,
    marginTop: 5,
    letterSpacing: 0.3,
  },
  shareOptionBtn: {
    height: 48,
    width: '100%',
    borderRadius: 80,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareOptionText: {
    fontSize: 16.5,
    letterSpacing: 0.3,
    marginHorizontal: 10,
  },
});
