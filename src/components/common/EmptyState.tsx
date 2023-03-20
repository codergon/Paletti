import {MdText} from '../StyledText';
import {StyleSheet, View} from 'react-native';
import {ViewProps} from '../Themed';
import {padding} from '../../helpers/styles';

interface EmptyStateProps extends ViewProps {
  text?: string;
  isDark?: boolean;
  nextline?: string;
  justifyContent?: 'center' | 'flex-start' | 'flex-end';
}

export default function EmptyState({
  text,
  children,
  nextline,
  justifyContent,
}: EmptyStateProps) {
  return (
    <View
      style={{
        ...styles.container,
        ...padding(justifyContent ? 0 : '20%', 0, justifyContent ? '22%' : 0),
        justifyContent: justifyContent || 'flex-start',
      }}>
      <View style={styles.content}>
        {children}

        <MdText style={styles.text}>{text}</MdText>
        {nextline && <MdText style={[styles.text__sub]}>{nextline}</MdText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    marginBottom: 20,
    alignItems: 'center',
  },
  vector: {
    marginBottom: 16,
  },
  text: {
    width: '100%',
    fontSize: 22,
    color: '#000',
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  text__sub: {
    marginTop: 8,
    fontSize: 16,
    color: '#a3a3a3',
    textAlign: 'center',
  },
});
