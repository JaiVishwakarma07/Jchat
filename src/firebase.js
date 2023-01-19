
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCzC7qkN9a3q6xHu7Y9WmlkpE6NxT9f7t4",
    authDomain: "jchat-56ef3.firebaseapp.com",
    projectId: "jchat-56ef3",
    storageBucket: "jchat-56ef3.appspot.com",
    messagingSenderId: "93004145476",
    appId: "1:93004145476:web:007549e34d42343483ed11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();