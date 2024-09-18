import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDaPKis5H6OkmC9cER8A748Y9rGHsRm55E",
    authDomain: "restaurantapp-fc499.firebaseapp.com",
    databaseURL: "https://restaurantapp-fc499-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-fc499",
    storageBucket: "restaurantapp-fc499.appspot.com",
    messagingSenderId: "1072467710674",
    appId: "1:1072467710674:web:c0f20c103547e8636bd30b"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };