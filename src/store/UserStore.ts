import {db} from '../fb';
import {RootStore} from './RootStore';
import {makeAutoObservable} from 'mobx';
import auth from '@react-native-firebase/auth';
import {Collection, Hue} from '../types/profile';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {clearPersistedStore, makePersistable} from 'mobx-persist-store';
import {collection, doc, getDoc, getDocs, writeBatch} from 'firebase/firestore';

export type UserData = {
  id?: string;
  name?: string;
  photo?: string;
  email?: string;
};

export class UserStore {
  private readonly rootStore: RootStore;

  email?: string = undefined;
  name?: string = undefined;
  photo?: string = undefined;
  userId?: string = undefined;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    makePersistable(this, {
      name: 'UserStore',
      storage: rootStore.services.storage,
      properties: ['email', 'name', 'photo', 'userId'],
    });
  }

  private setUser(user: UserData) {
    this.userId = user.id;
    this.name = user.name;
    this.email = user.email;
    this.photo = user.photo;
  }

  async login(): Promise<boolean> {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);

      const user = {
        id: res.user.uid,
        email: res.user.email,
        photo: res.user.photoURL,
        name: res.user.displayName,
      } as UserData;

      this.setUser(user);
      this.updateCollection();
      return true;
    } catch (error) {
      return false;
    }
  }

  async signOut(): Promise<boolean> {
    try {
      await GoogleSignin.signOut();

      this.setUser({
        id: undefined,
        email: undefined,
        name: undefined,
        photo: undefined,
      });
      clearPersistedStore(this);
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateCollection() {
    try {
      if (this.email && this.userId) {
        const now = new Date().getTime();
        let remoteCollection: Collection = [];

        const snapshot = await getDocs(
          collection(db, 'profiles', this.email, 'colors'),
        );

        if (Boolean(snapshot?.docs?.length > 0)) {
          snapshot.docs.map(doc => {
            //  Push items that do not exist in local collection to remote collection
            const localHue = this.rootStore.collectionStore.collection?.find(
              localHue => localHue.id === doc.id,
            );
            if (!localHue) {
              remoteCollection.push(doc.data() as Hue);
            }
          });

          if (Boolean(this.rootStore.collectionStore.collection?.length > 0)) {
            // Replace remote items with local items if they exist
            const combinedCollection = [
              ...this.rootStore.collectionStore.collection,
              ...remoteCollection,
            ].sort((a: Hue, b: Hue) => {
              if (a?.date_created < b?.date_created) {
                return 1; // Newest first
              } else if (a?.date_created > b?.date_created) {
                return -1;
              }
              return 0;
            });

            const batch = writeBatch(db);
            this.rootStore.collectionStore.collection?.map(hue => {
              // @ts-ignore
              const hueRef = doc(db, 'profiles', this.email, 'colors', hue.id);
              batch.set(hueRef, hue, {
                merge: true,
              });
            });

            batch.set(doc(db, 'profiles', this.email, 'colors', this.userId), {
              lastUpdated: now,
            });
            await batch.commit();

            this.rootStore.collectionStore.setCollection(combinedCollection);
            this.rootStore.collectionStore.setTimestamp(now);
          } else {
            // if the local collection is empty, use the remote collection
            const docRef = doc(
              db,
              'profiles',
              this.email,
              'colors',
              this.userId,
            );
            const docSnap = await getDoc(docRef);
            const date = docSnap.data()?.lastUpdated;

            this.rootStore.collectionStore.setCollection(remoteCollection);
            this.rootStore.collectionStore.setTimestamp(
              isNaN(date) ? date : now,
            );
          }
        } else {
          // convert the collection object to an array and upload it to firestore
          if (Boolean(this.rootStore.collectionStore.collection?.length > 0)) {
            const batch = writeBatch(db);
            this.rootStore.collectionStore.collection?.map(hue => {
              // @ts-ignore
              const hueRef = doc(db, 'profiles', this.email, 'colors', hue.id);
              batch.set(hueRef, hue, {
                merge: true,
              });
            });
            batch.set(doc(db, 'profiles', this.email, 'colors', this.userId), {
              lastUpdated: now,
            });
            await batch.commit();

            this.rootStore.collectionStore.setTimestamp(now);
          }
        }
      }
    } catch (error) {
      // @ts-ignore
      console.log(error?.message);
    }
  }
}
