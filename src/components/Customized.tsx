import {SafeAreaViewProps} from 'react-native-safe-area-context';
import {
  SafeAreaView as DefaultSafeArea,
  ScrollView,
  ThemeProps,
} from './Themed';

export function SafeAreaView(props: SafeAreaViewProps & ThemeProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;

  return (
    <DefaultSafeArea
      style={[{paddingTop: 0}, style]}
      lightColor={lightColor}
      darkColor={darkColor}
      {...otherProps}>
      <ScrollView
        bounces={false}
        darkColor={darkColor}
        lightColor={lightColor}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}>
        {props.children}
      </ScrollView>
    </DefaultSafeArea>
  );
}