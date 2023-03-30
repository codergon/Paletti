import ntc from '../lib/ntc';
import {nanoid} from 'nanoid';
import chroma from 'chroma-js';
import {RootStore} from './RootStore';
import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import {Collection, Hue, StatusMsg} from '../types/profile';
import {doc, writeBatch} from 'firebase/firestore';
import {db} from '../fb';

export class CollectionStore {
  private readonly rootStore: RootStore;

  imgUri: string = '';
  activeId: string = '';
  lastUpdated: number = 0;
  collection: Collection = [];
  collectionLength: number = 0;
  statusMsg: StatusMsg = undefined;
  colorModalScreen: string = 'explore';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    makePersistable(this, {
      name: 'CollectionStore',
      storage: rootStore.services.storage,
      properties: ['collection', 'lastUpdated'],
    });
  }

  setCollection(collectionArr: Collection) {
    this.collection = [...collectionArr];
    this.collectionLength = collectionArr.length;
  }

  setTimestamp(date: number) {
    this.lastUpdated = date;
  }
  setImgUri(uri: string) {
    this.imgUri = uri;
  }
  setStatusMsg(status: StatusMsg) {
    this.statusMsg = {
      message: status?.message || '',
      type: status?.type || 'success',
    };
  }

  setModalScreen(screen: string) {
    this.colorModalScreen = screen;
  }

  setActiveId(activeId: string) {
    this.activeId = activeId;
  }

  deleteColor(id: string) {
    const newCollection = this.collection.filter(col => {
      if (col.id !== id) {
        return true;
      }
    });
    this.setCollection(newCollection);
  }

  async addColor(color: string) {
    // Check if color is valid
    if (
      color[0] !== '#' ||
      typeof color !== 'string' ||
      (color.length !== 4 && color.length !== 7)
    ) {
      return;
    }

    // Check if color already exists in collection
    const colorExists = this?.collection?.find(col => {
      if (col.color === color) {
        return true;
      }
    });

    if (colorExists) {
      return;
    }

    // Add color to collection
    const hueId = nanoid();
    const now = new Date().getTime();
    const newColor = {
      color,
      id: hueId,
      date_created: now,
      name: ntc.name(color),
      display_name: ntc.name(color),
      user_id: this.rootStore.userStore?.userId || '',
      shades: chroma.scale([color, '#ffffff']).colors(5).slice(0, 4),
    };

    const newCollection = [newColor, ...this.collection];

    this.setCollection(newCollection);
    this.setTimestamp(now);

    // Update collection in firestore
    // try {
    //   if (this.rootStore.userStore?.userId && this.rootStore.userStore?.email) {
    //     await this.updateColorRemote(
    //       this.rootStore.userStore?.email,
    //       this.rootStore.userStore?.userId,
    //       now,
    //       hueId,
    //       newColor,
    //     );
    //   }
    //   return newColor;
    // } catch (error) {
    //   return newColor;
    // }

    return newColor;
  }

  async updateColorRemote(
    email: string,
    userId: string,
    time: number,
    hueId: string,
    hue: Hue,
  ) {
    const batch = writeBatch(db);
    batch.set(doc(db, 'profiles', email, 'colors', hueId), hue);
    batch.set(doc(db, 'profiles', email, 'colors', userId), {
      lastUpdated: time,
    });
    batch.set(doc(db, 'colors', hueId), hue);
    await batch.commit();
  }
}
