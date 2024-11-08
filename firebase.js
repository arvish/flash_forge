// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdZX2nZZk4D_BHiHY02kjjWIYZg4I_040",
  authDomain: "fire-forge-e2885.firebaseapp.com",
  projectId: "fire-forge-e2885",
  storageBucket: "fire-forge-e2885.appspot.com",
  messagingSenderId: "275952846802",
  appId: "1:275952846802:web:e1bc31fe107900a7e2ea0b",
  measurementId: "G-T2DSPDHB7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};