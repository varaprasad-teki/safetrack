import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyC-ShX8LvwzMBa2oletgHKVxr-CCzRkZyQ",
  authDomain: "safetrack-cb1f2.firebaseapp.com",
  projectId: "safetrack-cb1f2",
  storageBucket: "safetrack-cb1f2.firebasestorage.app",
  messagingSenderId: "997169135811",
  appId: "1:997169135811:web:c29664c4c928b30ed72276",
  measurementId: "G-9WXSE5JFLL"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const demoShipments = [
  { phone: "9876543210", orderId: "ST-2048-771", awb: "AWB1234567", customer: "Ravi Kumar", status: "In Transit", location: "Hyderabad Hub" },
  { phone: "9123456780", orderId: "ST-2050-101", awb: "AWB9876543", customer: "Ananya Sharma", status: "Out for Delivery", location: "Vijayawada Hub" },
  { phone: "9988776655", orderId: "ST-3030-501", awb: "AWB4567891", customer: "Karthik Reddy", status: "Packed", location: "Chennai Hub" }
];
