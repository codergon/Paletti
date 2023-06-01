import chroma from 'chroma-js';
import {Hash} from 'lucide-react-native';
import {useEffect, useState} from 'react';
import {Path, Svg} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';
import useColorScheme from '@hooks/useColorScheme';
import {InputMd, MdText} from '@components/StyledText';
import {KeyboardAvoidingView, ScrollView} from '@components/Themed';

interface ColorInputProps {
  hexInput: string;
  setHexInput: (hex: string) => void;
}

const ColorInput = ({hexInput, setHexInput}: ColorInputProps) => {
  const blobSize = 42;
  const [hex, setHex] = useState('');

  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? '#fff' : '#444';
  const textColor = isDark ? '#fff' : '#000';
  const iconBorder = isDark ? '#777' : '#ccc';
  const blobBorder = isDark ? '#ccc' : '#444';
  const borderColor = isDark ? '#777' : '#ccc';
  const iconBg = isDark ? '#333333' : '#e8e8e8';
  const placeholderColor = isDark ? '#ccc' : '#888';

  const handleChange = (text: string) => {
    // Remove any non-alphanumeric characters from the input
    const sanitizedText = text.replace(/[^a-fA-F0-9]/g, '');
    const formattedText = sanitizedText.slice(0, 6);
    setHex(formattedText.toUpperCase());
  };

  useEffect(() => {
    if (chroma.valid(hex)) {
      setHexInput(chroma(hex).hex());
    }
  }, [hex]);

  return (
    <ScrollView
      scrollEnabled={false}
      style={{
        backgroundColor: 'transparent',
      }}
      contentContainerStyle={[styles.container]}>
      <View style={[styles.header]}>
        <MdText style={[styles.title, {color: textColor}]}>
          Type in a hex code
        </MdText>
      </View>

      <KeyboardAvoidingView style={[styles.content]}>
        <View
          style={[
            styles.inputbar,
            {
              borderColor: borderColor,
            },
          ]}>
          <View
            style={[
              styles.hashIcon,
              {
                backgroundColor: iconBg,
                borderRightColor: iconBorder,
              },
            ]}>
            <Hash size={18} color={iconColor} />
          </View>
          <InputMd
            value={hex}
            maxLength={6}
            color={textColor}
            style={styles.input}
            placeholder={'2B0FFF'}
            onChangeText={handleChange}
            placeholderTextColor={placeholderColor}
          />
        </View>

        <View style={[styles.preview]}>
          <Svg
            fill="none"
            viewBox="0 0 183 165"
            style={{
              width: blobSize,
              height: blobSize * (165 / 183),
            }}>
            <Path
              strokeWidth={4}
              stroke={blobBorder}
              fill={hexInput || '#999'}
              d="M130.051 8.373c7.421 4.443 12.523 11.118 16.866 18.697 2.172 3.79 4.142 7.784 6.121 11.825l.299.612c1.876 3.832 3.768 7.698 5.836 11.413 2.316 4.16 4.992 8.228 7.656 12.256l.293.444c2.572 3.888 5.12 7.742 7.356 11.657 4.64 8.13 7.854 16.4 7.066 25.5-1.628 18.797-15.435 34.689-30.572 46.532-13.9 10.875-31.559 15.938-49.281 15.817-7.836-.053-14.924-2.754-22.015-6.196-2.156-1.046-4.322-2.168-6.51-3.3-4.945-2.559-10-5.175-15.29-7.113-4.682-1.715-9.777-2.731-14.901-3.555a414.908 414.908 0 0 0-5.621-.851c-3.252-.477-6.464-.949-9.6-1.549-9.84-1.883-18.346-4.947-23.265-12.874-4.878-7.862-3.976-16.788-1.334-26.35.963-3.488 2.142-7.01 3.334-10.57.442-1.321.886-2.647 1.322-3.979 1.6-4.897 3.077-9.843 3.843-14.714.775-4.931.985-10.06 1.08-15.165.025-1.335.042-2.666.059-3.992.048-3.77.095-7.498.32-11.147.61-9.862 2.507-18.85 9.007-25.751C28.686 9.048 37.523 5.87 47.28 4.277 54 3.179 61.04 2.844 68.015 2.512c3.203-.153 6.393-.305 9.53-.53l.764-.054C96.385.63 114.906-.697 130.052 8.373Z"
            />
          </Svg>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ColorInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    // flex: 1,
    fontSize: 16,
  },

  content: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  preview: {
    width: 46,
    height: 46,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  inputbar: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    paddingRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashIcon: {
    height: '100%',
    marginRight: 12,
    paddingLeft: 15,
    paddingRight: 14,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 30,
    fontSize: 16,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
});
