// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { UserType } from "../type/user";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export const login = () =>
  signInWithPopup(auth, provider).catch((error) => console.log(error));

export const logout = () => signOut(auth).catch((error) => console.log(error));

export const onUserStateChange = (callback: (user: UserType | null) => void) =>
  onAuthStateChanged(auth, async (user: User | null) => {
    const updateUser = user ? await admimUser(user) : null;
    callback(updateUser);
  });

const admimUser = async (user: User) => {
  const dbRef = ref(database);
  return get(child(dbRef, `admins`)).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = user.uid.includes(admins);
      return { ...user, isAdmin };
    }
    return { ...user, isAdmin: false };
  });
};
