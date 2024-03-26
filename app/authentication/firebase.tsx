// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDytDUve7n89ZaQl43M3M2EftiRlgPlLB0",
    authDomain: "fake-tweet-detector.firebaseapp.com",
    projectId: "fake-tweet-detector",
    storageBucket: "fake-tweet-detector.appspot.com",
    messagingSenderId: "105213967203",
    appId: "1:105213967203:web:bb9dfe437ee21524f7b156",
    measurementId: "G-RNLK6T7VDS"
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db }
