import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { getAuth, Auth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  Firestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import {
  connectStorageEmulator,
  getStorage,
  FirebaseStorage,
} from "firebase/storage";

const isEmulatorEnabled = () =>
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true";

// Khởi tạo Firebase App ngay khi module load
const firebaseApp: FirebaseApp = (() => {
  try {
    // Kiểm tra xem đã có app nào được khởi tạo chưa
    if (getApps().length > 0) {
      return getApps()[0];
    }

    return initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    });
  } catch (error) {
    console.error("Firebase initialization error:", error);
    throw error;
  }
})();

// Khởi tạo các services một lần duy nhất
let auth: Auth | null = null;
let firestore: Firestore | null = null;
let storage: FirebaseStorage | null = null;

export const useAuth = () => {
  if (!auth) {
    auth = getAuth(firebaseApp);
    if (isEmulatorEnabled()) {
      connectAuthEmulator(auth, "http://localhost:9099", {
        disableWarnings: true,
      });
    }
  }
  return auth;
};

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore(firebaseApp);
    if (isEmulatorEnabled()) {
      connectFirestoreEmulator(firestore, "localhost", 8080);
    }
  }
  return firestore;
};

export const useStorage = () => {
  if (!storage) {
    storage = getStorage(firebaseApp);
    if (isEmulatorEnabled()) {
      connectStorageEmulator(storage, "localhost", 9199);
    }
  }
  return storage;
};
