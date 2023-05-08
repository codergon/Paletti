import ntc from '../lib/ntc';
import {nanoid} from 'nanoid';
import chroma from 'chroma-js';
import {useAuth} from './AuthContext';
import {Collection, Hue} from '../types/profile';
import Loader from '../components/common/Loader';
import {Camera} from 'react-native-vision-camera';
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CameraAccessStatus = 'loading' | 'authorized' | 'declined';

type ContextType = {
  loading: boolean;
  collection: Collection;
  activeColor: Hue | null;
  newlyCreated: Hue | null;
  refreshCollection: () => void;
  cameraAccess: CameraAccessStatus;
  addNewColor: (color: string) => any;
  deleteColor: (colorId: string) => void;
  setActiveColor: (colorId?: string) => any;
  updateNewColor: (hue: Hue | null) => void;
  isColorInCollection: (color: string) => boolean;
  setCameraAccess: (status: CameraAccessStatus) => void;
  updateColorDisplayName: (colorId: string, name: string) => void;
};

export const AppContext = createContext<ContextType>({
  loading: true,
  collection: [],
  activeColor: null,
  newlyCreated: null,
  addNewColor: () => {},
  deleteColor: () => {},
  cameraAccess: 'loading',
  setActiveColor: () => {},
  updateNewColor: () => {},
  setCameraAccess: () => {},
  refreshCollection: () => {},
  isColorInCollection: () => false,
  updateColorDisplayName: () => {},
});

interface AppProviderProps {
  children: React.ReactElement | React.ReactElement[];
}
export default function AppProvider({children}: AppProviderProps) {
  const {user} = useAuth();

  const [lastUpdated, setLastUpdated] = useState(0);

  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<Collection>([]);
  const [activeColor, setActiveColor] = useState<Hue | null>(null);
  const [newlyCreated, setNewlyCreated] = useState<Hue | null>(null);

  const [cameraAccess, setCameraAccess] =
    useState<CameraAccessStatus>('loading');

  const updateCollection = (newColorObj: Hue) => {
    const newCollection = [newColorObj, ...collection];
    setCollection(prev => {
      return [newColorObj, ...prev];
    });
    AsyncStorage.setItem('collection', JSON.stringify(newCollection));
  };

  const refreshCollection = async () => {
    setCollection(prev => {
      return [...prev];
    });
  };

  const updateActiveColor = (colorId?: string) => {
    refreshCollection();
    if (colorId) {
      const color = collection.find(item => item.id === colorId);
      setActiveColor(color || null);
      return !!color;
    } else {
      setActiveColor(null);
      return false;
    }
  };

  const deleteColor = (colorId: string) => {
    const newCollection = collection.filter(item => item.id !== colorId);
    setCollection(newCollection);
    AsyncStorage.setItem('collection', JSON.stringify(newCollection));
    refreshCollection();
  };

  const updateColorDisplayName = (colorId: string, name: string) => {
    const newCollection = collection.map(item => {
      if (item.id === colorId) {
        const newObj = {...item, display_name: name};
        setActiveColor(newObj);
        return newObj;
      } else {
        return item;
      }
    });

    setCollection(newCollection);
    AsyncStorage.setItem('collection', JSON.stringify(newCollection));
  };

  const updateNewColor = (color: Hue | null) => {
    setNewlyCreated(color);
  };

  const isColorInCollection = (color: string) => {
    return collection.some(item => item.color === color);
  };

  const addNewColor = (new_Color: string) => {
    const newColor = new_Color.toUpperCase();

    try {
      updateNewColor(null);
      if (newColor.length !== 7 && newColor.length !== 4) {
        return 'Hex code must contain at 3 or 6 letters';
      }

      if (!chroma.valid(newColor)) {
        return 'Not a valid hex code';
      }

      if (isColorInCollection(newColor)) {
        return 'Color already in collection';
      }

      // Add color to collection
      const hueId = nanoid();
      const now = new Date().getTime();
      const name = ntc.name(newColor);
      const newColorObj = {
        id: hueId,
        name: name,
        color: newColor,
        date_created: now,
        display_name: name,
        user_id: user?.id || '',
        shades: chroma.scale([newColor, '#ffffff']).colors(5).slice(0, 4),
      };

      updateCollection(newColorObj);
      updateNewColor(newColorObj);

      return 'success';
    } catch (e: any) {
      return 'Could not add color';
    }
  };

  const fetchCollection = async () => {
    const collectionRes = await AsyncStorage.getItem('collection');
    if (collectionRes) setCollection(JSON.parse(collectionRes));
    setLoading(false);
  };

  const fetchCameraAccess = async () => {
    const result = await Camera.getCameraPermissionStatus();
    if (result === 'authorized') {
      setCameraAccess('authorized');
    } else {
      setCameraAccess('declined');
    }
  };

  const updateCameraAccess = (status: CameraAccessStatus) => {
    if (status === 'authorized') {
      setCameraAccess('authorized');
    } else {
      setCameraAccess('declined');
    }
  };

  useEffect(() => {
    fetchCollection();
    fetchCameraAccess();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        collection,
        deleteColor,
        activeColor,
        addNewColor,
        cameraAccess,
        newlyCreated,
        updateNewColor,
        refreshCollection,
        isColorInCollection,
        updateColorDisplayName,
        setActiveColor: updateActiveColor,
        setCameraAccess: updateCameraAccess,
      }}>
      {cameraAccess === 'loading' ? <Loader /> : children}
    </AppContext.Provider>
  );
}

export function useStore() {
  return React.useContext(AppContext);
}
