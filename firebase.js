import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "నీ Firebase apiKey",
  authDomain: "నీ Firebase authDomain",
  projectId: "నీ Firebase projectId",
  storageBucket: "నీ Firebase storageBucket",
  messagingSenderId: "నీ messagingSenderId",
  appId: "నీ appId"
};

initializeApp(firebaseConfig);
console.log("Firebase Connected Successfully");
