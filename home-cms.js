import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "./firebase-init.js";

const promoLine1El = document.getElementById("promo-line-1");
const promoLine2El = document.getElementById("promo-line-2");

const pageContentRef = doc(db, "siteContent", "homepage");
const defaultBannerLine1 = "Special Offer: Get 5% OFF your NEW sprinkler installation when booked by June 1st!";
const defaultBannerLine2 = "Contact us for your free estimate!";

async function loadBannerLines() {
  try {
    const snapshot = await getDoc(pageContentRef);
    const data = snapshot.exists() ? snapshot.data() : {};
    const legacyBanner = typeof data.Banner === "string" ? data.Banner : "";
    const bannerLine1 = typeof data.BannerLine1 === "string" ? data.BannerLine1 : (legacyBanner || defaultBannerLine1);
    const bannerLine2 = typeof data.BannerLine2 === "string" ? data.BannerLine2 : defaultBannerLine2;

    if (promoLine1El) promoLine1El.textContent = bannerLine1;
    if (promoLine2El) promoLine2El.textContent = bannerLine2;
  } catch (error) {
    if (promoLine1El) promoLine1El.textContent = defaultBannerLine1;
    if (promoLine2El) promoLine2El.textContent = defaultBannerLine2;
    console.error(error);
  }
}

loadBannerLines();
