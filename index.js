/**
 * @format
 */

import 'react-native-gesture-handler';
import App from './src/App';
import {Platform} from 'react-native';
import {version} from './package.json';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import NewRelic from 'newrelic-react-native-agent';

let appToken;

if (Platform.OS === 'ios') {
  appToken = 'AA55cb7c3007d87bff82de7ecc3db4e6a079e41706-NRMA';
} else {
  appToken = 'AA55cb7c3007d87bff82de7ecc3db4e6a079e41706-NRMA';
}

const agentConfiguration = {
  analyticsEventEnabled: true,
  crashReportingEnabled: true,
  interactionTracingEnabled: true,
  networkRequestEnabled: true,
  networkErrorRequestEnabled: true,
  httpRequestBodyCaptureEnabled: true,
  loggingEnabled: true,
  logLevel: NewRelic.LogLevel.INFO,
  webViewInstrumentation: true,
};

NewRelic.startAgent(appToken, agentConfiguration);
NewRelic.setJSAppVersion(version);
AppRegistry.registerComponent(appName, () => App);
