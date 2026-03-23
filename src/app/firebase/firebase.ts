import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { firebaseConfig, getMissingFirebaseConfigKeys, hasCompleteFirebaseConfig } from './firebase.config';

if (!hasCompleteFirebaseConfig()) {
  console.warn(
    `Firebase configuration is incomplete. Missing keys: ${getMissingFirebaseConfigKeys().join(', ')}`
  );
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

void setPersistence(firebaseAuth, browserLocalPersistence).catch(() => undefined);
