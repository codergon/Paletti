import {StyleSheet} from 'react-native';
import {padding} from '@helpers/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  bottomBar: {
    width: '100%',
    overflow: 'hidden',
    ...padding(20, 20, 46),
    flexDirection: 'column',
  },
  savebtn: {
    height: 48,
    width: '100%',
    marginTop: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#595959',
  },
  savebtnText: {
    fontSize: 16,
  },

  imageContainer: {
    paddingTop: 0,
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  cursor: {
    width: 10,
    height: 10,
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cursorInner: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});

export default styles;
