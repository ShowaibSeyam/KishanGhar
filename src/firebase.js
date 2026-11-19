import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaZx9niDOsw0AYNjFrivcXQZqycdUP3aI",
  authDomain: "device-streaming-b3a962c2.firebaseapp.com",
  projectId: "device-streaming-b3a962c2",
  storageBucket: "device-streaming-b3a962c2.firebasestorage.app",
  messagingSenderId: "644070740872",
  appId: "1:644070740872:web:db04df0fe2c5f3b7a9a03d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const facebookProvider = new FacebookAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
};

export default app;
