import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    customerName: document.getElementById("customerName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    orderId: document.getElementById("orderId").value.trim().toUpperCase(),
    awb: document.getElementById("awb").value.trim().toUpperCase(),
    status: "Registered",
    location: "Pending assignment",
    createdAt: new Date().toISOString()
  };

  if (!payload.customerName || !payload.phone || !payload.email || !payload.orderId || !payload.awb) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    await addDoc(collection(db, "shipments"), payload);
    alert("Shipment registered successfully.");
    window.location.href = "login.html";
  } catch (error) {
    console.error(error);
    localStorage.setItem("safeTrackPendingShipment", JSON.stringify(payload));
    alert("Firebase write failed, but registration was saved locally. Please verify your Firebase config.");
    window.location.href = "login.html";
  }
});
