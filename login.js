const demoShipments = [
  {
    phone: "9876543210",
    orderId: "ST-2048-771",
    awb: "AWB1234567",
    customer: "Ravi Kumar",
    status: "In Transit",
    location: "Hyderabad Hub"
  },
  {
    phone: "9123456780",
    orderId: "ST-2050-101",
    awb: "AWB9876543",
    customer: "Ananya Sharma",
    status: "Out for Delivery",
    location: "Vijayawada Hub"
  },
  {
    phone: "9988776655",
    orderId: "ST-3030-501",
    awb: "AWB4567891",
    customer: "Karthik Reddy",
    status: "Packed",
    location: "Chennai Hub"
  }
];

const phonePattern = /^[6-9]\d{9}$/;
const otpKey = "safetrack_demo_otp";
const sessionKey = "safetrack_session";

const trackingInput = document.getElementById("trackingInput");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const submitBtn = document.getElementById("submitBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

function normalize(value) {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, "");
}

function findShipmentByPhone(phone) {
  return demoShipments.find(item => item.phone === phone) || null;
}

function findShipmentByOrderOrAwb(value) {
  const normalized = normalize(value);
  return demoShipments.find(item =>
    normalize(item.orderId) === normalized ||
    normalize(item.awb) === normalized
  ) || null;
}

function handleSubmit() {
  const value = trackingInput.value.trim();

  if (!value) {
    alert("Please enter phone number, order ID, or AWB.");
    return;
  }

  if (phonePattern.test(value)) {
    const otp = "123456";
    localStorage.setItem(otpKey, JSON.stringify({ phone: value, otp }));
    otpSection.style.display = "block";
    verifyOtpBtn.style.display = "inline-block";
    submitBtn.textContent = "Send OTP";
    alert(`Demo OTP sent to +91 ${value}. OTP: ${otp}`);
    return;
  }

  const shipment = findShipmentByOrderOrAwb(value);

  if (!shipment) {
    alert("No shipment found for this value.");
    return;
  }

  localStorage.setItem(sessionKey, JSON.stringify(shipment));
  window.location.href = "dashboard.html";
}

function handleOtpVerify() {
  const otp = otpInput.value.trim();
  const stored = JSON.parse(localStorage.getItem(otpKey) || "{}");

  if (!stored.phone || !stored.otp) {
    alert("Please request OTP first.");
    return;
  }

  if (otp !== stored.otp) {
    alert("Invalid OTP. Use the demo OTP shown in the alert.");
    return;
  }

  const shipment = findShipmentByPhone(stored.phone);
  if (!shipment) {
    alert("No shipment found for this phone number.");
    return;
  }

  localStorage.setItem(sessionKey, JSON.stringify(shipment));
  localStorage.removeItem(otpKey);
  window.location.href = "dashboard.html";
}

submitBtn.addEventListener("click", handleSubmit);
verifyOtpBtn.addEventListener("click", handleOtpVerify);

if (localStorage.getItem(sessionKey)) {
  window.location.href = "dashboard.html";
}
