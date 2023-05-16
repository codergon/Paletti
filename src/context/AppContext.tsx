import ntc from '../lib/ntc';
import {nanoid} from 'nanoid';
import chroma from 'chroma-js';
import {Collection, Hue, PaletteType, SubPaletteType} from '../types/palette';
import Loader from '../components/common/Loader';
import {Camera} from 'react-native-vision-camera';
import React, {createContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidColor} from './utils';
import Sound from 'react-native-sound';
import {Alert} from 'react-native';
import {hapticFeedback} from '../utils/hapticFeedback';

import * as CloudStore from 'react-native-cloud-store';
import {useSettings} from './SettingsContext';

Sound.setCategory('Playback');

type CameraAccessStatus = 'loading' | 'authorized' | 'declined';

type ContextType = {
  order: 'asc' | 'desc';
  search: string;
  loading: boolean;
  isEmptyPreview: boolean;
  togglePinnedStatus: (palette?: SubPaletteType) => void;
  toggleOrder: () => void;
  pinnedPalettes: Collection;
  filteredPalettes: Collection;
  setSearch: (search: string) => void;
  collection: Collection;
  cameraAccess: CameraAccessStatus;
  previewColors: Hue[];
  clearPreview: () => void;
  updatePreview: (
    color: string,
    action?: string,
    shouldPlaySound?: boolean,
  ) => void;
  addArrayToPreview: (colors: string[]) => void;
  setCameraAccess: (status: CameraAccessStatus) => void;

  savePreview: (name?: string) => void;
  createPalette: () => void;
  renamePalette: (palette?: SubPaletteType) => void;
  addPaletteColor: (
    color: string,
    paletteId: string,
  ) => Promise<'success' | 'Not a valid color'>;

  deletePalette: (palette?: SubPaletteType) => void;
  updatePaletteColor: (
    id: string,
    colorId: string,
    color: string,
    name: string,
  ) => void;
  removePaletteColor: (id: string, colorId: string) => void;
};

export const AppContext = createContext<ContextType>({
  search: '',
  order: 'asc',
  loading: true,
  collection: [],
  isEmptyPreview: true,
  togglePinnedStatus: () => {},
  pinnedPalettes: [],
  toggleOrder: () => {},
  setSearch: () => {},
  cameraAccess: 'loading',
  setCameraAccess: () => {},
  previewColors: [],
  filteredPalettes: [],
  clearPreview: () => {},
  updatePreview: () => {},
  addArrayToPreview: () => {},

  savePreview: () => {},
  createPalette: () => {},
  addPaletteColor: () => Promise.resolve('success'),
  renamePalette: () => {},

  deletePalette: () => {},
  updatePaletteColor: () => {},
  removePaletteColor: () => {},
});

interface AppProviderProps {
  children: React.ReactElement | React.ReactElement[];
}
export default function AppProvider({children}: AppProviderProps) {
  const {settings, setSettings} = useSettings();

  const [search, setSearch] = useState('');
  const [cameraAccess, setCameraAccess] =
    useState<CameraAccessStatus>('loading');
  const [loading, setLoading] = useState(true);
  const [sound, setsound] = useState<Sound | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [collection, setCollection] = useState<Collection>([]);
  const [previewColors, setPreviewColors] = useState<Hue[]>([]);

  //
  // CAMERA ACCESS
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

  // iCloud Synchronization
  const synciCloud = async (status = false) => {
    if (settings.sync === 'off' || status) return;
    await CloudStore.kvSync();
  };

  const syncReset = async () => {
    if (settings.sync === 'off') return;
    await CloudStore.kvSync();
    const collectionRes = await CloudStore.kvGetItem('collection');
    if (collectionRes) {
      setCollection(JSON.parse(collectionRes));
    }
  };

  useEffect(() => {
    const ev = CloudStore.onICloudKVStoreRemoteChange(async u => {
      if (u?.changedKeys?.includes('collection')) {
        await syncReset();
      }
    });
    return () => {
      ev.remove();
    };
  }, []);

  useEffect(() => {
    if (settings.sync === 'on') {
      syncReset();
    }
  }, [settings.sync]);

  //
  // SETUP COLLECTION
  const fetchCollection = async () => {
    try {
      const settingsRes = await AsyncStorage.getItem('settings');
      if (settingsRes) {
        const appSettings = JSON.parse(settingsRes);
        if (appSettings.sync === 'on') await synciCloud(true);
        setSettings(appSettings);
      }

      const collectionRes = await CloudStore.kvGetItem('collection');
      if (collectionRes) {
        setCollection(JSON.parse(collectionRes));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
    fetchCameraAccess();
    const pop = new Sound('Pop.mp3', Sound.MAIN_BUNDLE);
    if (pop) setsound(pop);
  }, []);

  //
  // SOUND
  const playSound = () => {
    if (sound && settings.sound === 'on') {
      sound.play();
    }
  };

  //
  // COLLECTION
  const updateCollection = async (newPalette: PaletteType) => {
    const newCollection = [newPalette, ...collection];
    setCollection(prev => {
      return [newPalette, ...prev];
    });

    await CloudStore.kvSetItem('collection', JSON.stringify(newCollection));
  };

  const replaceCollection = async (newCollection: Collection) => {
    setCollection(newCollection);

    await CloudStore.kvSetItem('collection', JSON.stringify(newCollection));
  };

  //
  // PREVIEW FUNCTIONS

  const isEmptyPreview = useMemo(() => {
    return previewColors.length === 0;
  }, [previewColors]);

  const previewExists = (color: string) => {
    return previewColors.some(item => item.color === color);
  };
  const updatePreview = (
    color: string,
    action?: string,
    shouldPlaySound = true,
  ) => {
    try {
      if (action === 'add') {
        if (color.length !== 7 && color.length !== 4) {
          return 'Hex code must contain at 3 or 6 letters';
        }

        if (!chroma.valid(color)) {
          return 'Not a valid hex code';
        }

        if (previewExists(color)) {
          return 'Color already in collection';
        }

        const present = new Date().getTime();
        const newColor: Hue = {
          color,
          id: nanoid(),
          createdAt: present,
          name: ntc.name(color),
          displayName: ntc.name(color),
        };
        setPreviewColors(prev => [...prev, newColor]);
        if (shouldPlaySound) playSound();
      } else if (!!color) {
        const newPreviewColors = previewColors.filter(
          item => item.id !== color,
        );
        setPreviewColors(newPreviewColors);
      }

      return 'success';
    } catch (e: any) {
      return 'Could not add color';
    }
  };
  const addArrayToPreview = (colors: string[]) => {
    const present = new Date().getTime();
    const newColors = colors.map(color => {
      return {
        color,
        id: nanoid(),
        createdAt: present,
        name: ntc.name(color),
        displayName: ntc.name(color),
      };
    });
    setPreviewColors(newColors);
  };

  const savePreview = async (name?: string) => {
    if (previewColors?.length === 0) return;

    const present = new Date().getTime();
    const newPalette: PaletteType = {
      id: nanoid(),
      pinned: false,
      createdAt: present,
      lastUpdated: present,
      colors: previewColors,
      name: name || 'New Palette',
    };
    await updateCollection(newPalette);
    clearPreview();
    hapticFeedback('rigid');
  };
  const clearPreview = () => setPreviewColors([]);

  //
  // PALETTE FUNCTIONS
  const colorExists = (id: string, color: string) => {
    return collection
      .find(palette => palette.id === id)
      ?.colors.some(item => item.color === color);
  };
  const createPalette = () => {
    Alert.prompt(
      'Enter a name for your palette',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: async newName => {
            if (newName?.trim()) {
              const present = new Date().getTime();
              const newPalette: PaletteType = {
                colors: [],
                id: nanoid(),
                pinned: false,
                name: newName.trim(),
                createdAt: present,
                lastUpdated: present,
              };
              await updateCollection(newPalette);
            }
          },
        },
      ],
      undefined,
      'New Palette',
    );
    hapticFeedback('rigid');
  };
  const deletePalette = (palette?: SubPaletteType) => {
    Alert.alert(
      'Are you sure you want to delete this palette ' +
        '"' +
        palette?.name +
        '"',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async _ => {
            const newCollection = collection?.filter(
              item => item.id !== palette?.id,
            );
            await replaceCollection(newCollection);
          },
        },
      ],
    );
    hapticFeedback('impactMedium');
  };
  const addPaletteColor = async (color: string, paletteId: string) => {
    if (!isValidColor(color)) {
      return 'Not a valid color';
    }

    const present = new Date().getTime();
    const newColor: Hue = {
      color,
      id: nanoid(),
      createdAt: present,
      name: ntc.name(color),
      displayName: ntc.name(color),
    };

    const newCollection = collection.map(palette => {
      if (palette.id === paletteId) {
        return {
          ...palette,
          lastUpdated: present,
          colors: [newColor, ...palette.colors],
        };
      }
      return palette;
    });

    await replaceCollection(newCollection);
    playSound();
    return 'success';
  };
  const updatePaletteColor = async (
    id: string,
    colorId: string,
    color: string,
    name: string,
  ) => {
    const newCollection = collection.map(palette => {
      if (palette.id === id) {
        const newColors = palette.colors.map(item => {
          if (item.id === colorId) {
            return {...item, color, name};
          }
          return item;
        });
        return {
          ...palette,
          colors: newColors,
          lastUpdated: new Date().getTime(),
        };
      }
      return palette;
    });
    await replaceCollection(newCollection);
  };
  const removePaletteColor = async (id: string, colorId: string) => {
    const newCollection = collection.map(palette => {
      if (palette.id === id) {
        const newColors = palette.colors.filter(item => item.id !== colorId);
        return {
          ...palette,
          colors: newColors,
          lastUpdated: new Date().getTime(),
        };
      }
      return palette;
    });
    await replaceCollection(newCollection);
  };
  const renamePalette = (palette?: SubPaletteType) => {
    Alert.prompt(
      'Rename palette',
      'Enter a new name',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Rename',
          onPress: async newName => {
            if (!newName?.trim() || newName.trim() === palette?.name) return;

            const newCollection = collection?.map(item => {
              if (item.id === palette?.id) {
                return {
                  ...item,
                  name: newName.trim() ?? palette?.name ?? 'New Palette',
                  lastUpdated: new Date().getTime(),
                };
              }
              return item;
            });
            await replaceCollection(newCollection);
          },
        },
      ],
      undefined,
      palette?.name,
    );
  };
  const togglePinnedStatus = async (palette?: SubPaletteType) => {
    if (
      collection?.filter(item => !!item?.pinned).length === 1 &&
      !palette?.pinned
    ) {
      Alert.alert(
        'You cannot pin more than one palette',
        'Do you want to replace the currently pinned palette?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Replace',
            style: 'default',
            onPress: async _ => {
              const newCollection = collection?.map(item => {
                if (item.id === palette?.id) {
                  return {
                    ...item,
                    pinned: true,
                  };
                }
                return {
                  ...item,
                  pinned: false,
                };
              });
              await replaceCollection(newCollection);
            },
          },
        ],
      );
      return;
    } else {
      const newCollection = collection?.map(item => {
        if (item.id === palette?.id) {
          return {
            ...item,
            pinned: !item?.pinned,
          };
        }
        return item;
      });
      await replaceCollection(newCollection);
    }
  };

  //
  // FILTERED PALETTES
  const toggleOrder = () => setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));

  const filteredPalettes = useMemo(() => {
    return collection
      .filter(
        palette =>
          palette.name.toLowerCase().includes(search.toLowerCase()) &&
          !palette?.pinned,
      )
      .sort((a, b) => {
        return (
          settings?.sorting === 'name'
            ? a.name.toLowerCase() > b.name.toLowerCase()
            : a.lastUpdated > b.lastUpdated
        )
          ? order === 'asc'
            ? 1
            : -1
          : order === 'asc'
          ? -1
          : 1;
      });
  }, [collection, search, order, settings?.sorting]);

  const pinnedPalettes = useMemo(() => {
    return collection
      .filter(
        palette =>
          palette.name.toLowerCase().includes(search.toLowerCase()) &&
          palette?.pinned,
      )
      .sort((a, b) => {
        return (
          settings?.sorting === 'name'
            ? a.name.toLowerCase() > b.name.toLowerCase()
            : a.lastUpdated > b.lastUpdated
        )
          ? order === 'asc'
            ? 1
            : -1
          : order === 'asc'
          ? -1
          : 1;
      });
  }, [collection, search, order, settings?.sorting]);

  return (
    <AppContext.Provider
      value={{
        order,
        search,
        loading,
        setSearch,
        collection,
        savePreview,
        toggleOrder,
        cameraAccess,
        clearPreview,
        previewColors,
        updatePreview,
        isEmptyPreview,
        pinnedPalettes,
        filteredPalettes,
        addArrayToPreview,
        togglePinnedStatus,

        createPalette,
        deletePalette,
        addPaletteColor,
        renamePalette,
        updatePaletteColor,
        removePaletteColor,

        setCameraAccess: updateCameraAccess,
      }}>
      {cameraAccess === 'loading' ? <Loader /> : children}
    </AppContext.Provider>
  );
}

export function useStore() {
  return React.useContext(AppContext);
}
