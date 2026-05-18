import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth, db } from "./firebase-init.js";

const form = document.getElementById("banner-form");
const bannerLine1Input = document.getElementById("banner-line-1-input");
const bannerLine2Input = document.getElementById("banner-line-2-input");
const statusEl = document.getElementById("banner-status");
const logoutBtn = document.getElementById("banner-logout-btn");
const saveBtn = document.getElementById("banner-save-btn");

const pageContentRef = doc(db, "siteContent", "homepage");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.toggle("is-error", isError);
}

async function loadBanner() {
  if (!bannerLine1Input || !bannerLine2Input) return;

  try {
    const snapshot = await getDoc(pageContentRef);
    const data = snapshot.exists() ? snapshot.data() : {};
    const legacyBanner = typeof data.Banner === "string" ? data.Banner : "";
    const bannerLine1 = typeof data.BannerLine1 === "string" ? data.BannerLine1 : legacyBanner;
    const bannerLine2 = typeof data.BannerLine2 === "string" ? data.BannerLine2 : "";

    bannerLine1Input.value = bannerLine1;
    bannerLine2Input.value = bannerLine2;
  } catch (error) {
    console.error(error);
    setStatus("Could not load Banner from Firestore.", true);
  }
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  loadBanner();
});

if (form && bannerLine1Input && bannerLine2Input && saveBtn) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bannerLine1 = bannerLine1Input.value.trim();
    const bannerLine2 = bannerLine2Input.value.trim();
    if (!bannerLine1 || !bannerLine2) {
      setStatus("Both Banner lines are required.", true);
      return;
    }

    saveBtn.disabled = true;
    setStatus("Saving Banner...");

    try {
      await setDoc(
        pageContentRef,
        {
          BannerLine1: bannerLine1,
          BannerLine2: bannerLine2,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      setStatus("Banner saved.");
    } catch (error) {
      console.error(error);
      setStatus("Failed to save Banner.", true);
    } finally {
      saveBtn.disabled = false;
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "login.html";
    } catch (error) {
      console.error(error);
      setStatus("Failed to log out.", true);
    }
  });
}
