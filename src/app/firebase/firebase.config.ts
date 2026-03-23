import type { FirebaseOptions } from 'firebase/app';

const appEnv = typeof window !== 'undefined' ? window.__APP_ENV__ ?? {} : {};

const readEnv = (key: string): string => appEnv[key]?.trim() ?? '';

export const ADMIN_EMAIL = 'admin@learninglabs.com';

export const firebaseConfig: FirebaseOptions & { measurementId?: string } = {
  apiKey: readEnv('NG_APP_FIREBASE_API_KEY'),
  authDomain: readEnv('NG_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: readEnv('NG_APP_FIREBASE_PROJECT_ID'),
  storageBucket: readEnv('NG_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: readEnv('NG_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: readEnv('NG_APP_FIREBASE_APP_ID'),
  measurementId: readEnv('NG_APP_FIREBASE_MEASUREMENT_ID')
};

const REQUIRED_CONFIG_KEYS = [
  ['apiKey', firebaseConfig.apiKey],
  ['authDomain', firebaseConfig.authDomain],
  ['projectId', firebaseConfig.projectId],
  ['storageBucket', firebaseConfig.storageBucket],
  ['messagingSenderId', firebaseConfig.messagingSenderId],
  ['appId', firebaseConfig.appId]
] as const;

export function hasCompleteFirebaseConfig(): boolean {
  return REQUIRED_CONFIG_KEYS.every(([, value]) => Boolean(value));
}

export function getMissingFirebaseConfigKeys(): string[] {
  return REQUIRED_CONFIG_KEYS.filter(([, value]) => !value).map(([key]) => key);
}
