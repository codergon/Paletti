import {SafeAreaView, StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AppStatusBar = ({backgroundColor = '#fff', ...props}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{height: insets.top, backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
};

export default AppStatusBar;
