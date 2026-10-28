import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyC-ShX8LvwzMBa2oletgHKVxr-CCzRkZyQ",
  authDomain: "safetrack-cb1f2.firebaseapp.com",
  projectId: "safetrack-cb1f2",
  storageBucket: "safetrack-cb1f2.appspot.com",
  messagingSenderId: "997169135811",
  appId: "1:997169135811:web:c29664c4c928b30ed72276",
  measurementId: "G-9WXSE5JFLL"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function initRecaptcha() {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "normal",
      callback: () => console.log("reCAPTCHA solved"),
      "expired-callback": () => console.log("reCAPTCHA expired")
    });
  }
  return window.recaptchaVerifier;
}

export function sendOtp(phoneNumber) {
  const verifier = initRecaptcha();
  return signInWithPhoneNumber(auth, phoneNumber, verifier);
}

export async function registerShipment(data) {
  return addDoc(collection(db, "shipments"), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export async function findShipmentByPhone(phone) {
  const q = query(collection(db, "shipments"), where("phone", "==", phone));
  const snapshot = await getDocs(q);
  return snapshot.empty ? null : snapshot.docs[0].data();
}

export async function findShipmentByOrderOrAwb(value) {
  const normalized = value.trim().toUpperCase();

  const q1 = query(collection(db, "shipments"), where("orderId", "==", normalized));
  const q2 = query(collection(db, "shipments"), where("awb", "==", normalized));

  const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

  if (!snap1.empty) return snap1.docs[0].data();
  if (!snap2.empty) return snap2.docs[0].data();
  return null;
}

export const demoShipments = [
  { phone: "9876543210", orderId: "ST-2048-771", awb: "AWB1234567", customer: "Ravi Kumar", status: "In Transit", location: "Hyderabad Hub" },
  { phone: "9123456780", orderId: "ST-2050-101", awb: "AWB9876543", customer: "Ananya Sharma", status: "Out for Delivery", location: "Vijayawada Hub" },
  { phone: "9988776655", orderId: "ST-3030-501", awb: "AWB4567891", customer: "Karthik Reddy", status: "Packed", location: "Chennai Hub" }
];
