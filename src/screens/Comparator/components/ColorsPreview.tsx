import {Plus} from 'phosphor-react-native';
import {MdText} from '../../../components/StyledText';
import {TouchableOpacity, View} from '../../../components/Themed';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from '../comparator.styles';
import PreviewColor from './menu-buttons/PreviewColor';
import {Hue} from '../../../types/palette';

interface ColorsPreviewProps {
  comparedColors?: Hue[];
  addCurrentColor?: () => void;
  deleteColor: (id: string) => void;
}

const ColorsPreview = ({
  deleteColor,
  addCurrentColor,
  comparedColors = [],
}: ColorsPreviewProps) => {
  const isDark = useColorScheme() === 'dark';
  const previewBorder = isDark ? '#888' : '#bbb';
  const emptyStateColor = isDark ? '#999' : '#777';

  return (
    <View style={[styles.previewContainer]}>
      <View
        style={[
          styles.preview,
          {
            borderWidth: 1.2,
            borderColor: previewBorder,
          },
        ]}>
        {comparedColors?.length > 0 ? (
          comparedColors.map(preview => {
            return (
              <PreviewColor
                key={preview?.id}
                preview={preview}
                deleteColor={deleteColor}
              />
            );
          })
        ) : (
          <View style={[styles.emptyState]}>
            <MdText
              style={{
                fontSize: 13,
                letterSpacing: 0.3,
                color: emptyStateColor,
              }}>
              Choose your first color
            </MdText>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={addCurrentColor}
        style={[
          styles.saveBtn,
          {
            borderColor: previewBorder,
          },
        ]}>
        <Plus size={20} color={previewBorder} weight="bold" />
      </TouchableOpacity>
    </View>
  );
};

export default ColorsPreview;
