// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "gorevyonetimsistemi.firebaseapp.com",
  projectId: "gorevyonetimsistemi",
  storageBucket: "gorevyonetimsistemi.appspot.com",
  messagingSenderId: "79760445394",
  appId: "1:79760445394:web:24044bbda60017e430420b",
  measurementId: "G-L6NRY8J095"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);