import Vectors from '../Vectors';
import {MdText} from '../StyledText';
import {StyleSheet} from 'react-native';
import {View, ViewProps} from '../Themed';
import {padding} from '../../utils';

interface EmptyStateProps extends ViewProps {
  message?: string;
  isDark?: boolean;
  nextline?: string;
  vectorSize?: number;
  illustration?: keyof typeof Vectors;
  justifyContent?: 'center' | 'flex-start' | 'flex-end';
}

export default function EmptyState({
  isDark,
  message,
  children,
  nextline,
  vectorSize,
  illustration,
  justifyContent,
}: EmptyStateProps) {
  return (
    <View
      style={{
        ...styles.container,
        ...padding(justifyContent ? 0 : '20%', 0, justifyContent ? '10%' : 0),
        justifyContent: justifyContent || 'flex-start',
      }}>
      <View style={styles.content}>
        <View style={styles.vector}>
          {illustration &&
            Vectors[illustration]({size: vectorSize || 150, isDark})}
        </View>

        <MdText style={styles.message}>{message}</MdText>
        {nextline && (
          <MdText style={{...styles.message, marginTop: 2}}>{nextline}</MdText>
        )}
      </View>

      {children}
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
  message: {
    fontSize: 15,
    color: '#8E8E93',
  },
});
