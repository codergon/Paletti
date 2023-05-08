import {useStore} from './AppContext';
import {StatusMsg} from '../types/profile';
import {hapticFeedback} from '../utils/hapticFeedback';
import RNShare, {ShareOptions} from 'react-native-share';
import {createContext, useContext, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

type ContextType = {
  imgUri: string;
  statusMsg: StatusMsg;
  savePalette: () => Promise<void>;
  sharePalette: () => Promise<void>;
  setImgUri: (newImgUri: string) => void;
};

export const SheetContext = createContext<ContextType>({
  imgUri: '',
  statusMsg: null,
  setImgUri: () => {},
  savePalette: () => Promise.resolve(),
  sharePalette: () => Promise.resolve(),
});

interface SheetProviderProps {
  children: React.ReactElement | React.ReactElement[];
}
export default function SheetProvider({children}: SheetProviderProps) {
  const {collection, refreshCollection} = useStore();

  const [imgUri, setImgUri] = useState('');
  const [statusMsg, setStatusMsg] = useState<StatusMsg>(null);

  const updateImgUri = (newImgUri: string) => {
    setImgUri(newImgUri);
  };

  const updateStatusMsg = (data: StatusMsg) => {
    setStatusMsg(data);

    setTimeout(() => {
      setStatusMsg(null);
    }, 3000);
  };

  const sharePalette = async () => {
    if (Boolean(collection?.length === 0)) {
      updateStatusMsg({
        type: 'error',
        message: 'You have no colors in your collection!',
      });
      return;
    }
    if (!imgUri) {
      updateStatusMsg({
        type: 'error',
        message: 'Something went wrong!',
      });
      return;
    }

    try {
      const shareOptions: ShareOptions = {
        url: imgUri,
        type: 'image/png',
        filename: 'Paletti Collection',
        title: 'My Paletti Color Collection ✨ - Check it out!',
        subject: 'My Paletti Color Collection ✨ - Check it out!',
        // message: 'My Paletti Color Collection ✨ - Check it out!',
      };

      await RNShare.open(shareOptions);
      updateStatusMsg({
        type: 'success',
        message: 'Collection shared successfully!',
      });
    } catch (err: any) {
      updateStatusMsg({
        type: 'error',
        message:
          err?.message === 'User did not share'
            ? 'You cancelled the share!'
            : err?.message || 'An error occurred!',
      });
    } finally {
      hapticFeedback('rigid');
      refreshCollection();
    }
  };

  const savePalette = async () => {
    if (Boolean(collection?.length === 0)) {
      updateStatusMsg({
        type: 'error',
        message: 'You have no colors in your collection!',
      });
      return;
    }
    if (!imgUri) {
      updateStatusMsg({
        type: 'error',
        message: 'Something went wrong!',
      });
      return;
    }

    try {
      // await CameraRoll.saveToCameraRoll(imgUri, {

      await CameraRoll.save(imgUri, {
        type: 'photo',
        album: 'Paletti',
      });
      updateStatusMsg({
        type: 'success',
        message: 'Saved to your gallery!',
      });
    } catch (err) {
      updateStatusMsg({
        type: 'error',
        message: 'Something went wrong!',
      });
    } finally {
      hapticFeedback('notificationSuccess');
      refreshCollection();
    }
  };

  return (
    <SheetContext.Provider
      value={{
        imgUri,
        statusMsg,
        savePalette,
        sharePalette,
        setImgUri: updateImgUri,
      }}>
      {children}
    </SheetContext.Provider>
  );
}

export function useSheet() {
  return useContext(SheetContext);
}
