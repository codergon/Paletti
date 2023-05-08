import Splash from './screens/Splash';
import Navigation from './navigation';
import 'react-native-get-random-values';
import {useStore} from './context/AppContext';
import useColorScheme from './hooks/useColorScheme';

export default function App() {
  const {cameraAccess} = useStore();
  const colorScheme = useColorScheme();

  return (
    <>
      {cameraAccess === 'authorized' ? (
        <Navigation colorScheme={colorScheme} />
      ) : (
        <Splash />
      )}
    </>
  );
}
