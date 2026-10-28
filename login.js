import {
  sendOtp,
  findShipmentByPhone,
  findShipmentByOrderOrAwb
} from "./firebase.js";

const phonePattern = /^[6-9]\d{9}$/;
const sessionKey = "safetrack_session";
let confirmationResult = null;

document.getElementById("submitBtn").addEventListener("click", async () => {
  const value = document.getElementById("trackingInput").value.trim();

  if (!value) {
    alert("Please enter phone number, order ID, or AWB.");
    return;
  }

  if (phonePattern.test(value)) {
    try {
      confirmationResult = await sendOtp("+91" + value);
      document.getElementById("otpSection").style.display = "block";
      document.getElementById("verifyOtpBtn").style.display = "block";
      alert("OTP sent to your mobile number.");
    } catch (error) {
      console.error(error);
      alert("OTP sending failed. Check Firebase config and auth settings.");
    }
    return;
  }

  const shipment = await findShipmentByOrderOrAwb(value);

  if (!shipment) {
    alert("No shipment found for this value.");
    return;
  }

  localStorage.setItem(sessionKey, JSON.stringify(shipment));
  window.location.href = "dashboard.html";
});

document.getElementById("verifyOtpBtn").addEventListener("click", async () => {
  const otp = document.getElementById("otpInput").value.trim();

  if (!otp) {
    alert("Please enter the OTP.");
    return;
  }

  try {
    const result = await confirmationResult.confirm(otp);
    const phone = result.user.phoneNumber.replace("+91", "");

    const shipment = await findShipmentByPhone(phone);

    if (!shipment) {
      alert("No shipment found for this phone number.");
      return;
    }

    localStorage.setItem(sessionKey, JSON.stringify(shipment));
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert("OTP verification failed.");
  }
});

document.getElementById("allowBtn").addEventListener("click", () => {
  sessionStorage.setItem("adminAccess", "true");
  window.location.href = "register.html";
});
