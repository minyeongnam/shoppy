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
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import { UserType } from "../type/user";
import { CartItemType, Product, ResponseProduct } from "../type/product";
import { v4 as uuidV4 } from "uuid";

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

const adminUser = async (user: User): Promise<UserType> => {
  const dbRef = ref(database);
  return get(child(dbRef, `admins`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = user.uid.includes(admins);
        return { ...user, isAdmin };
      }
      return { ...user, isAdmin: false };
    })
    .catch((error) => error);
};

export const onUserStateChange = (callback: (user: UserType | null) => void) =>
  onAuthStateChanged(auth, async (user: User | null) => {
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });

export const addNewProduct = async (product: Product, url: string) => {
  const productId = uuidV4();
  return set(ref(database, `products/${productId}`), {
    ...product,
    productId,
    price: parseInt(product.price),
    url,
    options: product.options.split(", "),
  });
};

export const getProducts = async (): Promise<ResponseProduct[]> => {
  const dbRef = ref(database);
  return get(child(dbRef, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()) || []; // 배열안에 value들만 가져오기 위해 Object.values 사용
      }
    })
    .catch((error) => error);
};

export const getCart = async (
  userId: string | null
): Promise<CartItemType[]> => {
  if (!userId) {
    return [];
  }
  const dbRef = ref(database);
  return get(child(dbRef, `carts/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()) || [];
      }
    })
    .catch((error) => error);
};

export const addOrUpdateToCart = async (
  userId: string,
  product: CartItemType
) => {
  const dbRef = ref(database);
  return set(child(dbRef, `carts/${userId}/${product.productId}`), product);
};

export const removeFromCart = async (userId: string, productId: string) => {
  const dbRef = ref(database);
  return remove(child(dbRef, `carts/${userId}/${productId}`));
};
