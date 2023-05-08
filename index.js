import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {AppProvider} from './src/AppProvider';

AppRegistry.registerComponent(appName, () => AppProvider);
