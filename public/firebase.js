import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, Timestamp, addDoc, collection, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBuu9rb_cq9hGVCXqfQY5NHgoleUn0vYPY",
  authDomain: "alias-game-ebb27.firebaseapp.com",
  projectId: "alias-game-ebb27",
  storageBucket: "alias-game-ebb27.appspot.com",
  messagingSenderId: "354148836659",
  appId: "1:354148836659:web:8b99883253c209ca344a46",
  measurementId: "G-JNZS841BCG"
};

// Initialize Firebase Stuff
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// // Page name Stuff
// const filePath = window.location.pathname;
// const fileExtension = filePath.split("/").pop();
// const pageName = fileExtension.split('.')[0]