const lampGrid = document.getElementById("lampGrid");
const lampProgress = document.getElementById("lampProgress");
const lightAllButton = document.getElementById("lightAllButton");
const resetLampsButton = document.getElementById("resetLampsButton");
const localSongAudio = document.getElementById("ramAayengeAudio");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackSubmit = document.getElementById("feedbackSubmit");
const formStatus = document.getElementById("formStatus");
const thankYouOverlay = document.getElementById("thankYouOverlay");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const LAMP_COUNT = 12;
const SONG_START_SECONDS = 0;
const FEEDBACK_ENDPOINT = "https://formsubmit.co/ajax/bhumiharmohitsharma841222@gmail.com";
let autoPlayAttempted = false;

function renderLamps() {
  const lamps = Array.from({ length: LAMP_COUNT }, (_, index) => {
    const style = index % 3 === 1 ? "brass" : "clay";
    const number = String(index + 1).padStart(2, "0");
    return `
      <button class="lamp-button" type="button" aria-pressed="false" aria-label="Light diya ${number}" data-lamp-index="${index}">
        <span class="lamp-flame" aria-hidden="true"></span>
        <img class="lamp-art" src="assets/diya-${style}.webp" alt="" draggable="false" />
        <span class="lamp-label">TAP TO LIGHT</span>
      </button>`;
  }).join("");
  lampGrid.innerHTML = lamps;
  lampGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".lamp-button");
    if (!button) return;
    setLampState(button, !button.classList.contains("is-lit"));
  });
  updateLampProgress();
}

function setLampState(button, lit) {
  button.classList.toggle("is-lit", lit);
  button.setAttribute("aria-pressed", String(lit));
  const number = String(Number(button.dataset.lampIndex) + 1).padStart(2, "0");
  button.setAttribute("aria-label", `${lit ? "Extinguish" : "Light"} diya ${number}`);
  button.querySelector(".lamp-label").textContent = lit ? "LIT WITH LOVE" : "TAP TO LIGHT";
  updateLampProgress();
}

function updateLampProgress() {
  const litCount = lampGrid.querySelectorAll(".lamp-button.is-lit").length;
  lampProgress.textContent = `${litCount} of ${LAMP_COUNT} diyas lit`;
  lampProgress.classList.toggle("all-lit", litCount === LAMP_COUNT);
}

lightAllButton.addEventListener("click", () => {
  lampGrid.querySelectorAll(".lamp-button").forEach((button, index) => {
    window.setTimeout(() => setLampState(button, true), index * 75);
  });
});

resetLampsButton.addEventListener("click", () => {
  lampGrid.querySelectorAll(".lamp-button").forEach((button) => setLampState(button, false));
});

renderLamps();

const prasadDetails = {
  modak: {
    title: "Modak",
    image: "assets/prasad-modak.webp",
    alt: "Traditional modak sweets arranged on a brass plate",
    wish: "May your home be filled with sweet beginnings, warm laughter and many happy moments this Diwali."
  },
  laddoo: {
    title: "Motichoor laddoo",
    image: "assets/prasad-laddoo.webp",
    alt: "Golden motichoor laddoos arranged for Diwali prasad",
    wish: "May joy and laughter roll into your home, and may every day ahead feel a little more festive."
  },
  katli: {
    title: "Kaju katli",
    image: "assets/prasad-kajukatli.webp",
    alt: "Diamond-shaped kaju katli sweets with a silver-leaf sheen",
    wish: "May your days ahead be as sweet as this festive moment, and your heart stay full of gratitude."
  },
  panchamrit: {
    title: "Panchamrit",
    image: "assets/prasad-panchamrit.webp",
    alt: "A brass bowl of panchamrit offered with devotion",
    wish: "May peace, good health and divine blessings flow through your home this Diwali."
  }
};

const prasadModal = document.getElementById("prasadModal");
const prasadModalImage = document.getElementById("prasadModalImage");
const prasadModalTitle = document.getElementById("prasadModalTitle");
const prasadModalWish = document.getElementById("prasadModalWish");
let lastPrasadTrigger = null;

function openPrasadModal(key, trigger) {
  const item = prasadDetails[key];
  if (!item) return;
  lastPrasadTrigger = trigger;
  prasadModalImage.src = item.image;
  prasadModalImage.alt = item.alt;
  prasadModalTitle.textContent = item.title;
  prasadModalWish.textContent = item.wish;
  prasadModal.hidden = false;
  prasadModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.getElementById("closePrasadButton").focus();
}

function closePrasadModal() {
  if (prasadModal.hidden) return;
  prasadModal.hidden = true;
  prasadModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastPrasadTrigger) lastPrasadTrigger.focus();
}

document.querySelectorAll(".prasad-trigger").forEach((button) => {
  button.addEventListener("click", () => openPrasadModal(button.dataset.prasad, button));
});
document.getElementById("closePrasadButton").addEventListener("click", closePrasadModal);
document.getElementById("prasadBackdrop").addEventListener("click", closePrasadModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePrasadModal();
});

// Attempt background playback from 0:00. If autoplay is blocked, retry invisibly on the first user gesture.
let songPlayPending = false;
function removeSongGestureListeners() {
  document.removeEventListener("pointerdown", tryStartSong);
  document.removeEventListener("touchstart", tryStartSong);
  document.removeEventListener("click", tryStartSong);
  document.removeEventListener("keydown", tryStartSong);
}

function tryStartSong() {
  if (songPlayPending || !localSongAudio.paused || localSongAudio.error) {
    if (!localSongAudio.paused) removeSongGestureListeners();
    return;
  }
  songPlayPending = true;
  try { localSongAudio.currentTime = 0; } catch (_) {}
  const attempt = localSongAudio.play();
  if (attempt && typeof attempt.then === "function") {
    attempt.then(() => {
      songPlayPending = false;
      removeSongGestureListeners();
    }).catch(() => {
      songPlayPending = false;
    });
  } else {
    songPlayPending = false;
    removeSongGestureListeners();
  }
}

localSongAudio.addEventListener("loadedmetadata", tryStartSong);
document.addEventListener("pointerdown", tryStartSong, { passive: true });
document.addEventListener("touchstart", tryStartSong, { passive: true });
document.addEventListener("click", tryStartSong);
document.addEventListener("keydown", tryStartSong);
if (localSongAudio.readyState >= 1) tryStartSong();

if (prefersReducedMotion) {
  document.getElementById("fireworksVideo").pause();
}

// Send the visitor's name and one-message feedback to the owner's email.
feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const visitorName = document.getElementById("feedbackName").value.trim();
  const message = document.getElementById("feedbackMessage").value.trim();
  if (!visitorName || !message) return;

  feedbackSubmit.disabled = true;
  feedbackSubmit.innerHTML = "Sending… <span aria-hidden=\"true\">✦</span>";
  formStatus.textContent = "";

  try {
    const feedbackPayload = {
      name: visitorName,
      visitor_name: visitorName,
      message,
      _subject: "New Diwali website feedback for Mohit",
      _template: "table",
      _honey: document.querySelector('[name="_honey"]').value
    };

    const response = await fetch(FEEDBACK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(feedbackPayload)
    });
    const result = await response.json();
    if (!response.ok || result.success === false || result.success === "false") {
      throw new Error(result.message || "Feedback could not be sent right now.");
    }

    feedbackForm.reset();
    thankYouOverlay.classList.add("show");
    thankYouOverlay.setAttribute("aria-hidden", "false");
    window.setTimeout(() => {
      thankYouOverlay.classList.remove("show");
      thankYouOverlay.setAttribute("aria-hidden", "true");
    }, 2000);
  } catch (error) {
    formStatus.textContent = "We couldn’t send your feedback. Please check your connection and try again.";
    console.error("Feedback form error:", error);
  } finally {
    feedbackSubmit.disabled = false;
    feedbackSubmit.innerHTML = 'Send feedback <span aria-hidden="true">↗</span>';
  }
});
