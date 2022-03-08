// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import {collection, getDocs} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyCovqgg0toFmxR8Y_M0Ate4sBEnm5irs",
  authDomain: "my-project-4a991.firebaseapp.com",
  projectId: "my-project-4a991",
  storageBucket: "my-project-4a991.appspot.com",
  messagingSenderId: "501906771180",
  appId: "1:501906771180:web:1dc3e944cb91a8a23329c9",
  measurementId: "G-GZJ97VPJN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestoreDb = getFirestore(app);