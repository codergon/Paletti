import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import {Platform} from 'react-native';
import {version} from './package.json';
import {AppProvider} from './src/AppProvider';
import NewRelic from 'newrelic-react-native-agent';

let appToken;

if (Platform.OS === 'ios') {
  appToken = 'AA55cb7c3007d87bff82de7ecc3db4e6a079e41706-NRMA';
} else {
  appToken = 'AA55cb7c3007d87bff82de7ecc3db4e6a079e41706-NRMA';
}

const agentConfiguration = {
  loggingEnabled: true,
  analyticsEventEnabled: true,
  crashReportingEnabled: true,
  networkRequestEnabled: true,
  webViewInstrumentation: true,
  interactionTracingEnabled: true,
  networkErrorRequestEnabled: true,
  logLevel: NewRelic.LogLevel.INFO,
  httpRequestBodyCaptureEnabled: true,
};

NewRelic.startAgent(appToken, agentConfiguration);
NewRelic.setJSAppVersion(version);

AppRegistry.registerComponent(appName, () => AppProvider);
