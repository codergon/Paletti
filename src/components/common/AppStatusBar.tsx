import {StatusBar} from 'react-native';
import useColorScheme from '@hooks/useColorScheme';

const AppStatusBar = ({backgroundColor = '#fff', ...props}) => {
  const scheme = useColorScheme();
  return (
    <StatusBar
      animated={true}
      barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
};

export default AppStatusBar;
