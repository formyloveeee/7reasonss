/* SEVEN LITTLE REASONS — interactions and card content
   Edit the seven objects below to make the notes sound like you. */

const reasons = [
  {
    kicker: "THE WAY YOU MAKE ME FEEL",
    title: "You make distance feel softer",
    symbol: "♡",
    copy: "You make the distance feel a little less difficult, sirr jii. Even when you're not right next to me, you still feel like my favourite part of every day. Your little texts, your voice, and all our silly little moments mean more to me than you know. I just wish I could be there for all the small things, share my everyday with you, and make the sweetest memories by your side. Until then, I'll keep loving you in all the little ways I can, because no matter how many miles are between us, my heart will always feel closest to you. My favourite person, my comfort, my home."
  },
  {
    kicker: "THE COMFORT OF YOU",
    title: "You're my little peace",
    symbol: "☾",
    copy: "You are my peace, my favourite person, and the sweetest part of my life.  There's something about you that makes even my ordinary days feel special. Talking to you, sharing the tiniest things with you, and knowing that I have you in my life means more to me than I can explain. With you, love feels soft, safe, and real. I don't need every day to be perfect; I just want you in my little moments, my happy days, and all the days in between. If home could ever be a person, sirr jii, I think my heart would choose you every single time. "
  },
  {
    kicker: "THE SMILE YOU LEAVE BEHIND",
    title: "You make me smile without trying",
    symbol: "☺",
    copy: " I don't think you realise how much happiness you bring into my life.  It's the little things about you, your silly talks, your sweet words, and just the thought of you that make my day better. Sometimes, I catch myself smiling at my phone because of something you said, and honestly, I wouldn't trade that feeling for anything. You have this cute little way of making my heart happy without doing anything special. And if you ever wonder what makes me smile the most, sirr jii, it's you, in all your little ways, just being you. "
  },
  {
    kicker: "OUR VERY OWN LITTLE WORLD",
    title: "I love youu ",
    symbol: "✧",
    copy: "I love you, sirr jii, more than I could ever put into words. I love the little things about you, the way you make me smile, the way you make ordinary moments feel special, and how my heart feels so full just because I have you. I love sharing my little world with you, telling you the smallest things, and dreaming about all the memories we still have to make together. I may not always find the perfect words to show you how much you mean to me, but please know that my love for you is real, soft, and full of all the little forever promises my heart holds for you. You're my favourite person, my sweetest feeling, and the one I want to keep choosing, every single day. I love you so, so much. "
  },
  {
    kicker: "THE PERSON I LOOK FOR",
    title: "You're my favourite hello",
    symbol: "∞",
    copy: "the person I never get tired of talking to.  No matter how many times we talk, I still get happy seeing your name on my screen. I love how the smallest conversations with you become my favourite part of the day, how I always have something to tell you, and how even the simplest “hii” from you can make me smile. If I could choose someone to talk to every day, share every little thing with, and make a million sweet memories with, it would always be you, sirr jii. And no matter how many hellos we share, I hope I never have to say goodbye to us. "
  },
  {
    kicker: "MILES DON'T ERASE MEANING",
    title: "You make the waiting worth it",
    symbol: "✉",
    copy: "sirr jii. Even on the days when I wish you were here with me, just knowing that I have you makes everything feel a little better. I look forward to your texts, your calls, and all those little moments that bring us closer, even from miles away. I know we can't be together every time we want to, but every little moment with you means so much to me. And one day, I hope all these days of missing each other turn into the sweetest memories, with you right beside me. Until then, I'll keep looking forward to you, loving you, and dreaming of all the little things I want to do with you. Because, my love, you are worth every bit of waiting. ."
  },
  {
    kicker: "THE REASON BEHIND ALL THE REASONS",
    title: "Because it's you",
    symbol: "♥",
    copy: "Because it's your little texts that make me smile, your voice that makes my day better, and your presence that means so much to me. It's you I want to share my silly little stories with, you I want to tell about my day, and you I want beside me in all the little moments of life. I don't love you because everything is always perfect; I love you because there's something about you that my heart keeps choosing, again and again. And if I had to choose all over again, in a thousand different ways, in a thousand different lives, I think my heart would still find its way to you. Just because it's you, and no one else feels quite like you do. "
  }
];

const $ = (selector) => document.querySelector(selector);
const cover = $("#cover");
const prologue = $("#prologue");
const reasonsScene = $("#reasonsScene");
const finale = $("#finale");
const reasonCard = $("#reasonCard");
let currentReason = 0;
let soundEnabled = false;
let audioContext = null;
let ambientNodes = [];
let lastFocused = null;

function showScene(scene) {
  [cover, prologue, reasonsScene, finale].forEach((item) => {
    item.hidden = item !== scene;
  });
  scene.classList.remove("scene");
  void scene.offsetWidth;
  scene.classList.add("scene");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function beginStory() {
  lastFocused = document.activeElement;
  showScene(prologue);
  $("#startReasons").focus({ preventScroll: true });
}

function beginReasons() {
  currentReason = 0;
  renderReason(false);
  showScene(reasonsScene);
  $("#nextReason").focus({ preventScroll: true });
}

function renderReason(animate = true) {
  const reason = reasons[currentReason];
  $("#progressLabel").textContent = `${String(currentReason + 1).padStart(2, "0")} / 07`;
  $("#cardNumber").textContent = `NO. ${String(currentReason + 1).padStart(2, "0")}`;
  $("#reasonKicker").textContent = reason.kicker;
  $("#reasonTitle").textContent = reason.title;
  $("#reasonCopy").textContent = reason.copy;
  $("#reasonIllustration .scrap-symbol").textContent = reason.symbol;
  $("#progressFill").style.width = `${((currentReason + 1) / reasons.length) * 100}%`;
  $("#mobileProgress").style.width = `${((currentReason + 1) / reasons.length) * 100}%`;

  const nextButton = $("#nextReason");
  nextButton.querySelector("span").textContent =
    currentReason === reasons.length - 1 ? "One last little thing" : "Next little reason";
  nextButton.querySelector("b").textContent =
    currentReason === reasons.length - 1 ? "♡" : "→";

  if (animate) {
    reasonCard.classList.remove("card-change");
    void reasonCard.offsetWidth;
    reasonCard.classList.add("card-change");
  }
}

function nextReason() {
  if (currentReason < reasons.length - 1) {
    currentReason += 1;
    renderReason(true);
  } else {
    showScene(finale);
    $("#replay").focus({ preventScroll: true });
  }
}

function replayStory() {
  burstHearts();
  currentReason = 0;
  renderReason(false);
  showScene(cover);
  $("#openLetter").focus({ preventScroll: true });
}

function burstHearts() {
  const layer = $("#celebrationLayer");
  layer.innerHTML = "";
  const symbols = ["♡", "✧", "♥", "✦", "·"];
  for (let i = 0; i < 26; i++) {
    const particle = document.createElement("span");
    particle.className = "confetti";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.fontSize = `${12 + Math.random() * 18}px`;
    particle.style.animationDelay = `${Math.random() * 1.2}s`;
    particle.style.animationDuration = `${3 + Math.random() * 2}s`;
    layer.appendChild(particle);
    window.setTimeout(() => particle.remove(), 5500);
  }
}

/* Optional gentle ambient tone. Nothing plays unless the visitor taps sound. */
function toggleSound() {
  soundEnabled = !soundEnabled;
  const button = $("#soundToggle");
  if (soundEnabled) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) throw new Error("Audio unavailable");
      audioContext = audioContext || new AudioCtx();
      if (audioContext.state === "suspended") audioContext.resume();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 174.61;
      gain.gain.value = 0.012;
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      ambientNodes = [oscillator, gain];
      button.querySelector(".sound-label").textContent = "sound on";
      button.setAttribute("aria-pressed", "true");
    } catch (error) {
      soundEnabled = false;
      button.querySelector(".sound-label").textContent = "no audio";
      button.setAttribute("aria-pressed", "false");
    }
  } else {
    if (ambientNodes[0]) {
      try { ambientNodes[0].stop(); } catch (error) {}
      ambientNodes.forEach((node) => { try { node.disconnect(); } catch (error) {} });
    }
    ambientNodes = [];
    button.querySelector(".sound-label").textContent = "sound off";
    button.setAttribute("aria-pressed", "false");
  }
}

function createStars() {
  const field = $("#starField");
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 72; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = Math.random() > 0.82 ? "✧" : (Math.random() > 0.5 ? "·" : "✦");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.fontSize = `${5 + Math.random() * 11}px`;
    star.style.setProperty("--duration", `${2 + Math.random() * 4}s`);
    star.style.animationDelay = `${Math.random() * 4}s`;
    fragment.appendChild(star);
  }
  field.appendChild(fragment);
}

$("#openLetter").addEventListener("click", beginStory);
$("#startReasons").addEventListener("click", beginReasons);
$("#nextReason").addEventListener("click", nextReason);
$("#replay").addEventListener("click", replayStory);
$("#soundToggle").addEventListener("click", toggleSound);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cover.hidden) return;
  if (event.key === "ArrowRight" && !reasonsScene.hidden) nextReason();
});

createStars();
