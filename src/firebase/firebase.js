// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASgGvHJX0XYPxBQKfSPw7ORETZKOxa8tg",
  authDomain: "seorinsite.firebaseapp.com",
  projectId: "seorinsite",
  storageBucket: "seorinsite.firebasestorage.app",
  messagingSenderId: "688317087947",
  appId: "1:688317087947:web:11bedf64782a38a9899b4e",
  measurementId: "G-1JM7WJE558"
};
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Firebase Auth
const auth = getAuth(app);

export { db, auth };
