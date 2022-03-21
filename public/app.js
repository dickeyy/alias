import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";

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