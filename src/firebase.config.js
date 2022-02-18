import { initializeApp } from "firebase/app";
import { getFirestore }  from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA19tlID31Rb3lhVYSFfZHpLQ0glWpgTM",
  authDomain: "house-marketplace-app-ddb8f.firebaseapp.com",
  projectId: "house-marketplace-app-ddb8f",
  storageBucket: "house-marketplace-app-ddb8f.appspot.com",
  messagingSenderId: "995456288915",
  appId: "1:995456288915:web:d44d236d7ce1ad6528a566"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()