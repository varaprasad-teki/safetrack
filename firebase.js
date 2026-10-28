// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-ShX8LvwzMBa2oletgHKVxr-CCzRkZyQ",
  authDomain: "safetrack-cb1f2.firebaseapp.com",
  projectId: "safetrack-cb1f2",
  storageBucket: "safetrack-cb1f2.firebasestorage.app",
  messagingSenderId: "997169135811",
  appId: "1:997169135811:web:c29664c4c928b30ed72276",
  measurementId: "G-9WXSE5JFLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
