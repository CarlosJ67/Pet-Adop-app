// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-da9a4.firebaseapp.com",
  projectId: "pet-adopt-da9a4",
  storageBucket: "pet-adopt-da9a4.appspot.com",
  messagingSenderId: "262396458897",
  appId: "1:262396458897:web:ee4c1118e64d612048cc30",
  measurementId: "G-EW936080D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app,'(default)')
// const analytics = getAnalytics(app);