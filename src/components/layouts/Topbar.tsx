import {View} from '../Themed';
import {padding} from '../../utils';
import {BdText, MdText} from '../StyledText';
import {TopbarProp} from '../../types/common';
import {Image, StyleSheet, useColorScheme} from 'react-native';
import {useAppSelector} from '../../hooks/storeHooks';

export default function Topbar({title, subtitle}: TopbarProp) {
  const colorScheme = useColorScheme();
  const subColor = colorScheme === 'dark' ? '#444' : '#e3e3e3';
  const textColor = colorScheme === 'dark' ? '#888' : '#666';

  const {userData} = useAppSelector(state => state.user);

  return (
    <View style={styles.topBar}>
      <View style={styles.heading}>
        <BdText style={styles.screenTitle}>{title}</BdText>
        {subtitle && (
          <MdText style={[styles.screenSubTitle, {color: textColor}]}>
            {subtitle}
          </MdText>
        )}
      </View>

      <View
        style={[styles.imageContainer, {borderColor: subColor}]}
        lightColor="#ddd"
        darkColor="#888">
        <Image
          style={{width: '100%', height: '100%', borderRadius: 40}}
          source={{
            uri:
              userData?.photoURL ||
              'https://images.unsplash.com/photo-1565378435245-4282cbde883e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=910&q=80',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    marginBottom: 16,
    ...padding(15, 0),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    flexDirection: 'column',
  },
  screenTitle: {
    fontSize: 27,
  },
  screenSubTitle: {
    fontSize: 16,
    marginTop: 3,
  },
  imageContainer: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderRadius: 40,
  },
});
