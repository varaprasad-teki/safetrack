import {
initializeApp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-ShX8LvwzMBa2oletgHKVxr-CCzRkZyQ",
  authDomain: "safetrack-cb1f2.firebaseapp.com",
  projectId: "safetrack-cb1f2",
  storageBucket: "safetrack-cb1f2.firebasestorage.app",
  messagingSenderId: "997169135811",
  appId: "1:997169135811:web:c29664c4c928b30ed72276",
  measurementId: "G-9WXSE5JFLL"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

document
.getElementById("loginBtn")
.addEventListener("click", () => {

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

signInWithEmailAndPassword(
auth,
email,
password
)

.then(() => {

alert("Login Successful ✅");

window.location.href =
"index.html";

})

.catch((error) => {

alert(error.message);

});

});
