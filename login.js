import {
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "./firebase-init.js";

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusEl = document.getElementById("login-status");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.toggle("is-error", isError);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "banner-admin.html";
  }
});

if (form && emailInput && passwordInput) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("Signing in...");

    try {
      await signInWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value);
      setStatus("Success. Redirecting...");
      window.location.href = "banner-admin.html";
    } catch (error) {
      console.error(error);
      setStatus("Authentication failed. Please check your email and password and try again.", true);
    }
  });
}
