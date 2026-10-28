/**
 * ULTRA-PREMIUM AESTHETIC BIRTHDAY EXPERIENCE — MASTER JAVASCRIPT
 * Designed with love for PC & Mobile previews.
 * Flow:
 *  1) Page 1: Fireworks & Birthday Text Animation (from stuffs/happy birthday code)
 *  2) Page 2: Photo 2 Full Screen (Queen showcase with floating hearts)
 *  3) Page 3: Photo 1 Showcase (Dreamy moments)
 *  4) Page 4: Full Screen Interactive Birthday Cake (from stuffs/birthday-Cake)
 *  5) Page 5: Full Screen Glowing Flower Garden (from stuffs/Animated-Flower-main)
 *  6) Main Site: Three.js 3D Hearts, Petal Canvas, Music Player, Mascot,
 *     Milestone Counter, Balloon Pop Game, Slideshow, Galaxy Constellation,
 *     Wax Seal Letter, Grand Finale Fireworks, Personalize Settings.
 */

// ============================================================
// 1. CONFIGURATION & LOCAL STORAGE
// ============================================================
const DEFAULT_CONFIG = {
  herName: "Rumnaz Nurayeen",
  birthdayDate: "2005-04-18",
  letterText: `How does one put a universe into words when the universe itself has taken the shape of a person? I have tried, you know. I have searched for the loveliest sentences, borrowed the language of poets, and wandered through the pages of novels, hoping to find something beautiful enough to describe you. And yet, every word seems to fall a little short, every metaphor a little pale. Perhaps that is the trouble with loving someone as dearly as I love you!\n\nHappy Birthday, love! My most fav girl, my 10/10 bodmayesh meye! You are the dream my heart holds dear, the sunshine that graces my every day, the dream I scarcely dared to dream, my sweetest reverie, and the loveliest chapter in a story I never wish to end.\n\nMy love, I wish I could lend you my eyes for a little while, so you could see yourself the way I see you. Maybe then you would understand why the moon feels a little less lonely when I think of you, why the sunshine feels warmer, and why even the most ordinary moments feel special just because you cross my mind.\n\nI wish I could place the entire universe in your hands, with every star tucked between your fingers, just to show you how much you mean to me. But since I cannot, all I can do is give you my heart and whisper, “Take my hand, take my whole life too, for I can’t help falling in love with you.”\n\nYou are in my heart, and you shall be there forever. My greatest wish is that whenever you think of me, you feel as happy as I do whenever I think of you!\n\nPeace, love, blessings, and a very happi birthday, babygurl! ❤️`,
  signature: "Your love, Taosif"
};

let userConfig = { ...DEFAULT_CONFIG };

function loadConfig() {
  const saved = localStorage.getItem("birthday_v2_config");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Automatically upgrade legacy letter text to the custom personal letter
      if (!parsed.letterText || parsed.letterText.includes("poets of antiquity") || parsed.letterText.includes("gift I never knew") || parsed.letterText.includes("makes this whole world feel softer")) {
        delete parsed.letterText;
      }
      if (!parsed.signature || parsed.signature.includes("Boundless Love") || parsed.signature === "With All My Love ❤️") {
        delete parsed.signature;
      }
      userConfig = { ...DEFAULT_CONFIG, ...parsed };
    } catch (e) {
      console.warn("Config parse error", e);
    }
  }
  // Ensure default recipient is Rumnaz Nurayeen
  if (!userConfig.herName || userConfig.herName.trim() === "" || userConfig.herName === "Princess" || userConfig.herName === "Love") {
    userConfig.herName = "Rumnaz Nurayeen";
    saveConfig();
  }
  applyConfig();
}

function saveConfig() {
  localStorage.setItem("birthday_v2_config", JSON.stringify(userConfig));
  applyConfig();
}

function applyConfig() {
  const nameTargets = [
    "displayRecipientName",
    "letterNamePlaceholder",
    "modalRecipientName",
    "footerRecipientName",
    "finaleHerName",
    "cakeNameText"
  ];
  nameTargets.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = userConfig.herName;
  });

  const lb = document.getElementById("letterBodyContent");
  if (lb) lb.innerHTML = userConfig.letterText.replace(/\n/g, "<br>");
  const mb = document.getElementById("modalLetterBody");
  if (mb) mb.innerHTML = userConfig.letterText.replace(/\n/g, "<br>");

  const sg = document.getElementById("letterSignature");
  if (sg) sg.textContent = userConfig.signature;
  const ms = document.getElementById("modalLetterSignature");
  if (ms) ms.textContent = userConfig.signature;

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const ld = document.getElementById("letterCurrentDate");
  if (ld) ld.textContent = dateStr;
  const md = document.getElementById("modalLetterDate");
  if (md) md.textContent = dateStr;

  const ni = document.getElementById("inputHerName");
  if (ni) ni.value = userConfig.herName;
  const di = document.getElementById("inputBirthdayDate");
  if (di) di.value = userConfig.birthdayDate;
  const li = document.getElementById("inputLetterText");
  if (li) li.value = userConfig.letterText;
  const si = document.getElementById("inputSignature");
  if (si) si.value = userConfig.signature;
}

// ============================================================
// 2. WEB AUDIO SYNTH ENGINE (No external MP3 dependencies)
// ============================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
  }
  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
  playNote(freq, dur = 0.8, type = "sine", gain = 0.18) {
    this.init();
    if (!this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, this.ctx.currentTime);
      g.gain.setValueAtTime(gain, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + dur);
    } catch (e) {}
  }
  playChime() {
    this.init();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      setTimeout(() => this.playNote(f, 0.9, "sine", 0.15), i * 90)
    );
  }
  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(350, this.ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.08);
      g.gain.setValueAtTime(0.25, this.ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }
  playCelebration() {
    this.init();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      setTimeout(() => this.playNote(f, 1.2, "triangle", 0.18), i * 110)
    );
  }
  playGrandCelebration() {
    this.init();
    const melody = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1046.5, 783.99, 1046.5];
    melody.forEach((f, i) =>
      setTimeout(() => {
        this.playNote(f, 0.7, "triangle", 0.15);
        this.playNote(f * 2, 0.5, "sine", 0.07);
      }, i * 160)
    );
  }
  playWaxCrack() {
    this.init();
    this.playNote(260, 0.12, "square", 0.08);
    setTimeout(() => this.playNote(580, 0.35, "sine", 0.2), 70);
    setTimeout(() => this.playNote(880, 0.5, "sine", 0.16), 150);
  }
  playMascotChirp() {
    this.init();
    this.playNote(784, 0.15, "sine", 0.18);
    setTimeout(() => this.playNote(1046, 0.3, "sine", 0.22), 80);
    setTimeout(() => this.playNote(1318, 0.4, "sine", 0.16), 180);
  }
  playStarReveal() {
    this.init();
    this.playNote(880, 0.5, "triangle", 0.14);
    setTimeout(() => this.playNote(1108, 0.5, "sine", 0.1), 120);
  }
  toggleMusic() {
    this.init();
    this.isPlayingMusic ? this.stopMusic() : this.startMusic();
  }
  startMusic() {
    this.init();
    this.isPlayingMusic = true;
    const disc = document.getElementById("vinylDisc");
    const wave = document.getElementById("musicWaveform");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");
    if (disc) disc.classList.add("spinning");
    if (wave) wave.classList.add("playing");
    if (playIcon) playIcon.classList.add("hidden");
    if (pauseIcon) pauseIcon.classList.remove("hidden");

    // Lofi Happy Birthday Theme
    const notes = [
      { f: 261.63, d: 0.32 }, { f: 261.63, d: 0.32 }, { f: 293.66, d: 0.65 },
      { f: 261.63, d: 0.65 }, { f: 349.23, d: 0.65 }, { f: 329.63, d: 1.1 },
      { f: 261.63, d: 0.32 }, { f: 261.63, d: 0.32 }, { f: 293.66, d: 0.65 },
      { f: 261.63, d: 0.65 }, { f: 392.00, d: 0.65 }, { f: 349.23, d: 1.1 },
      { f: 261.63, d: 0.32 }, { f: 261.63, d: 0.32 }, { f: 523.25, d: 0.65 },
      { f: 440.00, d: 0.65 }, { f: 349.23, d: 0.65 }, { f: 329.63, d: 0.65 },
      { f: 293.66, d: 0.9 },
      { f: 466.16, d: 0.32 }, { f: 466.16, d: 0.32 }, { f: 440.00, d: 0.65 },
      { f: 349.23, d: 0.65 }, { f: 392.00, d: 0.65 }, { f: 349.23, d: 1.3 }
    ];
    let idx = 0;
    const next = () => {
      if (!this.isPlayingMusic) return;
      const n = notes[idx];
      this.playNote(n.f, n.d * 1.4, "triangle", 0.12);
      this.playNote(n.f * 2, n.d * 1.1, "sine", 0.06);
      idx = (idx + 1) % notes.length;
      this.musicTimer = setTimeout(next, n.d * 900);
    };
    next();
  }
  stopMusic() {
    this.isPlayingMusic = false;
    clearTimeout(this.musicTimer);
    const disc = document.getElementById("vinylDisc");
    const wave = document.getElementById("musicWaveform");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");
    if (disc) disc.classList.remove("spinning");
    if (wave) wave.classList.remove("playing");
    if (playIcon) playIcon.classList.remove("hidden");
    if (pauseIcon) pauseIcon.classList.add("hidden");
  }
}
const audio = new SoundEngine();

// ============================================================
// 3. UNIFIED NATURAL SCROLL & INTRO TIMING ENGINE
// ============================================================
let introAutoScrollTimer = null;
let hasUserInteracted = false;

function triggerInitialInteraction() {
  if (hasUserInteracted) return;
  hasUserInteracted = true;

  audio.init();
  if (!audio.isPlayingMusic) {
    audio.startMusic();
  }

  // Gracefully reveal music player bar
  const musicPlayer = document.getElementById("musicPlayer");
  if (musicPlayer) {
    musicPlayer.classList.remove("hidden");
    musicPlayer.style.opacity = "0";
    musicPlayer.style.transform = "translateY(-10px)";
    requestAnimationFrame(() => {
      musicPlayer.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      musicPlayer.style.opacity = "1";
      musicPlayer.style.transform = "translateY(0)";
    });
  }

  // Show cute mascot & personalize button
  const mascot = document.getElementById("mascot");
  if (mascot) {
    mascot.classList.remove("hidden");
    mascot.style.animation = "mascotBounceIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards";
  }
  const wandBtn = document.getElementById("openSettingsBtn");
  if (wandBtn) wandBtn.classList.remove("hidden");
}

function cancelIntroAutoScroll() {
  if (introAutoScrollTimer) {
    clearTimeout(introAutoScrollTimer);
    introAutoScrollTimer = null;
  }
}

function initIntroTiming() {
  const photo2El = document.getElementById("photo2Section");

  // If user scrolls, touches, clicks, or wheels before timer, cancel auto-scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      cancelIntroAutoScroll();
      triggerInitialInteraction();
    }
  }, { passive: true });

  window.addEventListener("wheel", () => {
    cancelIntroAutoScroll();
    triggerInitialInteraction();
  }, { passive: true });

  window.addEventListener("touchstart", () => {
    cancelIntroAutoScroll();
    triggerInitialInteraction();
  }, { passive: true });

  window.addEventListener("click", () => {
    triggerInitialInteraction();
  });

  window.addEventListener("keydown", () => {
    cancelIntroAutoScroll();
    triggerInitialInteraction();
  });

  // Keep user on Section 1: no unwanted auto-scroll interruption so both "HAPPY BIRTHDAY LOVE" and her name play peacefully!

  // Pre-load iframes for instant responsiveness
  const cakeIframe = document.getElementById("cakeIframe");
  if (cakeIframe && !cakeIframe.src.includes("birthday-cake.html")) {
    cakeIframe.src = "stuffs/birthday-Cake/birthday-Cake/project-1/birthday-cake.html?name=" + encodeURIComponent(userConfig.herName);
  }
  const flowerIframe = document.getElementById("flowerIframe");
  if (flowerIframe && !flowerIframe.src.includes("garden-main")) {
    flowerIframe.src = "stuffs/garden-main/garden-main/index.html?to=" + encodeURIComponent(userConfig.herName || "Rumnaz") + "&from=" + encodeURIComponent("Taosif");
  }

  // Listen for cake blown event from iframe
  window.addEventListener("message", e => {
    if (e.data && e.data.type === "cake-blown") {
      audio.playCelebration();
    }
  });
}

// Aesthetic next button handler (icon only, smooth scroll)
window.scrollToNextSection = function(btn) {
  cancelIntroAutoScroll();
  triggerInitialInteraction();
  audio.playChime();

  const currentSection = btn ? btn.closest(".story-scene") : null;
  const allScenes = Array.from(document.querySelectorAll(".story-scene"));

  if (currentSection) {
    const currentIndex = allScenes.indexOf(currentSection);
    if (currentIndex >= 0 && currentIndex < allScenes.length - 1) {
      allScenes[currentIndex + 1].scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }

  // Fallback: find first scene whose top is below viewport
  for (let scene of allScenes) {
    const rect = scene.getBoundingClientRect();
    if (rect.top > 60) {
      scene.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }
};

window.storyNext = window.scrollToNextSection;

// Backward-compatibility goToPage helper
window.goToPage = function(pageIdx) {
  const allScenes = Array.from(document.querySelectorAll(".story-scene"));
  if (allScenes[pageIdx - 1]) {
    allScenes[pageIdx - 1].scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// ============================================================
// 4. PAGE 1: FULL CANVAS FIREWORKS ANIMATION (From stuffs folder)
// ============================================================
function initFireworksIntro() {
  const c = document.getElementById("fireworksCanvas");
  if (!c) return;
  const ctx = c.getContext("2d");

  let w = (c.width = window.innerWidth);
  let h = (c.height = window.innerHeight);
  let hw = w / 2;
  let hh = h / 2;

  let sequenceIdx = 0;
  let donePauseTick = 0;

  function getSequenceStrings(idx) {
    if (idx === 0) {
      // First animation: HAPPY BIRTHDAY LOVE (together in harmony)
      return ["HAPPY BIRTHDAY", "LOVE"];
    } else {
      // Second animation: Her name RUMNAZ NURAYEEN
      return ["RUMNAZ", "NURAYEEN"];
    }
  }

  const opts = {
    strings: getSequenceStrings(0),
    charSize: 36,
    charSpacing: 32,
    lineHeight: 50,
    fontStr: "bold 700 36px 'Playfair Display', 'Cinzel', Georgia, serif",
    cx: w / 2,
    cy: h / 2,
    fireworkPrevPoints: 12,
    fireworkBaseLineWidth: 4,
    fireworkAddedLineWidth: 5,
    fireworkSpawnTime: 50,
    fireworkBaseReachTime: 24,
    fireworkAddedReachTime: 22,
    fireworkCircleBaseSize: 22,
    fireworkCircleAddedSize: 12,
    fireworkCircleBaseTime: 24,
    fireworkCircleAddedTime: 22,
    fireworkCircleFadeBaseTime: 12,
    fireworkCircleFadeAddedTime: 6,
    fireworkBaseShards: 10,
    fireworkAddedShards: 10,
    fireworkShardPrevPoints: 4,
    fireworkShardBaseVel: 4.2,
    fireworkShardAddedVel: 2.4,
    fireworkShardBaseSize: 3,
    fireworkShardAddedSize: 2.5,
    gravity: 0.09,
    upFlow: -0.12,
    letterContemplatingWaitTime: 280,
    balloonSpawnTime: 18,
    balloonBaseInflateTime: 10,
    balloonAddedInflateTime: 10,
    balloonBaseSize: 20,
    balloonAddedSize: 18,
    balloonBaseVel: 0.45,
    balloonAddedVel: 0.45,
    balloonBaseRadian: -(Math.PI / 2 - 0.5),
    balloonAddedRadian: -1
  };

  const calc = { totalWidth: 300 };
  const Tau = Math.PI * 2;
  const TauQuarter = Tau / 4;
  let letters = [];

  // Continuous celebratory ambient fireworks system (More Fireworks, Ultra Gorgeous)
  const ambientFireworks = [];
  const ambientParticles = [];
  const celebratoryPalettes = [
    ["#ff4081", "#ff80ab", "#f50057", "#ffffff", "#ffd700"],
    ["#ffd700", "#ffecb3", "#ffe082", "#ffffff", "#ff80ab"],
    ["#e040fb", "#ea80fc", "#ff4081", "#ffffff", "#b388ff"],
    ["#ff5252", "#ff8a80", "#ffd700", "#ffffff", "#ff4081"],
    ["#ff69b4", "#ffb6c1", "#fff0f5", "#ffd700", "#ffffff"]
  ];

  function launchAmbientFirework() {
    const startX = w * (0.08 + 0.84 * Math.random());
    const targetY = h * (0.12 + 0.48 * Math.random());
    const palette = celebratoryPalettes[(Math.random() * celebratoryPalettes.length) | 0];
    ambientFireworks.push({
      x: startX,
      y: h + 15,
      targetY: targetY,
      vx: (Math.random() - 0.5) * 1.8,
      vy: -(Math.sqrt(2 * 0.16 * (h - targetY)) * (0.94 + 0.12 * Math.random())),
      palette: palette,
      trail: []
    });
  }

  function explodeAmbientFirework(fw) {
    const count = 30 + ((Math.random() * 24) | 0);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
      const speed = 2.4 + Math.random() * 4.4;
      ambientParticles.push({
        x: fw.x,
        y: fw.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.014 + Math.random() * 0.016,
        color: fw.palette[(Math.random() * fw.palette.length) | 0],
        size: 2.2 + Math.random() * 2.2,
        twinkle: Math.random() > 0.35
      });
    }
  }

  function setupSequence(idx) {
    opts.strings = getSequenceStrings(idx);

    // Responsive typography scaling ensuring words fit cohesively and beautifully
    const isMobile = w < 600;
    const isTablet = w >= 600 && w < 1024;

    const maxAllowedWidth = isMobile ? w * 0.92 : (isTablet ? Math.min(w * 0.88, 760) : Math.min(w * 0.84, 980));
    const targetFontSize = isMobile ? 38 : (isTablet ? 56 : 72);
    const minFontSize = isMobile ? 22 : 32;

    let fontSize = targetFontSize;
    while (fontSize > minFontSize) {
      ctx.font = `bold 700 ${fontSize}px 'Playfair Display', 'Cinzel', Georgia, serif`;
      let fits = true;
      for (const line of opts.strings) {
        const tracking = Math.max(2, Math.round(fontSize * 0.05));
        let lineWidth = 0;
        for (let j = 0; j < line.length; j++) {
          const ch = line[j];
          const chW = ch === " " ? Math.round(fontSize * 0.35) : Math.ceil(ctx.measureText(ch).width);
          lineWidth += chW + (j < line.length - 1 ? tracking : 0);
        }
        if (lineWidth > maxAllowedWidth) {
          fits = false;
          break;
        }
      }
      if (fits) break;
      fontSize -= 1;
    }

    opts.charSize = fontSize;
    opts.charSpacing = Math.round(fontSize * 0.72);
    opts.lineHeight = Math.round(fontSize * 1.34);
    opts.fontStr = `bold 700 ${opts.charSize}px 'Playfair Display', 'Cinzel', Georgia, serif`;
    ctx.font = opts.fontStr;

    opts.fireworkCircleBaseSize = Math.max(22, Math.floor(opts.charSize * 0.52));
    opts.fireworkCircleAddedSize = Math.max(12, Math.floor(opts.charSize * 0.3));
    opts.balloonBaseSize = Math.max(22, Math.floor(opts.charSize * 0.54));
    opts.balloonAddedSize = Math.max(14, Math.floor(opts.charSize * 0.3));

    calc.totalWidth = w * 0.85;

    buildLetters();
  }

  function updateDimensions() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    hw = w / 2;
    hh = h / 2;
    opts.cx = hw;
    opts.cy = hh;

    setupSequence(sequenceIdx);
  }

  function Letter(char, x, y, lineIdx) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.lineIdx = lineIdx;

    this.dx = 0;
    this.dy = 0;
    this.fireworkDy = this.y - hh;

    // Harmonious, unified romantic luxury palette — all letters share the same elegant styling
    this.color = "hsl(338, 92%, 62%)";
    this.lightAlphaColor = "hsla(338, 95%, light%, alp)";
    this.lightColor = "hsl(338, 95%, light%)";
    this.alphaColor = "hsla(338, 92%, 62%, alp)";

    this.reset();
  }

  Letter.prototype.drawGlyph = function(drawX, drawY) {
    ctx.save();
    ctx.font = opts.fontStr;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 1. Soft wide bloom glow aura (ethereal romantic rose halo)
    ctx.shadowColor = "rgba(255, 45, 115, 0.95)";
    ctx.shadowBlur = Math.max(22, Math.min(48, opts.charSize * 0.65));
    ctx.fillStyle = "hsl(338, 95%, 72%)";
    ctx.fillText(this.char, drawX, drawY);

    // 2. Crisp outer stroke for razor-sharp serif edges
    ctx.shadowBlur = Math.max(10, Math.min(22, opts.charSize * 0.3));
    ctx.lineWidth = Math.max(2, Math.round(opts.charSize * 0.05));
    ctx.strokeStyle = "hsl(338, 92%, 62%)";
    ctx.strokeText(this.char, drawX, drawY);

    // 3. Vibrant illuminated champagne-pink fill
    ctx.shadowBlur = Math.max(6, Math.min(14, opts.charSize * 0.2));
    ctx.fillStyle = "hsl(338, 100%, 92%)";
    ctx.fillText(this.char, drawX, drawY);

    // 4. Crisp bright white core for crystal-clear readability
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 4;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(this.char, drawX, drawY);

    ctx.restore();
  };

  Letter.prototype.reset = function() {
    this.phase = "firework";
    this.tick = 0;
    this.spawned = false;
    this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
    this.reachTime = (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) | 0;
    this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
    this.prevPoints = [[0, hh, 0]];
  };

  Letter.prototype.step = function() {
    if (this.phase === "firework") {
      if (!this.spawned) {
        ++this.tick;
        if (this.tick >= this.spawningTime) {
          this.tick = 0;
          this.spawned = true;
        }
      } else {
        ++this.tick;
        const linear = this.tick / this.reachTime;
        const armonic = Math.sin(linear * TauQuarter);
        const x = linear * this.x;
        const y = hh + armonic * this.fireworkDy;

        if (this.prevPoints.length > opts.fireworkPrevPoints) this.prevPoints.shift();
        this.prevPoints.push([x, y, linear * this.lineWidth]);

        const lwProp = 1 / (this.prevPoints.length - 1 || 1);
        for (let i = 1; i < this.prevPoints.length; ++i) {
          const pt = this.prevPoints[i];
          const pt2 = this.prevPoints[i - 1];
          ctx.strokeStyle = this.alphaColor.replace("alp", (i / this.prevPoints.length).toFixed(2));
          ctx.lineWidth = pt[2] * lwProp * i;
          ctx.beginPath();
          ctx.moveTo(pt[0], pt[1]);
          ctx.lineTo(pt2[0], pt2[1]);
          ctx.stroke();
        }

        if (this.tick >= this.reachTime) {
          this.phase = "contemplate";
          this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
          this.circleCompleteTime = (opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random()) | 0;
          this.circleCreating = true;
          this.circleFading = false;
          this.circleFadeTime = (opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random()) | 0;
          this.tick = 0;
          this.tick2 = 0;
          this.shards = [];

          const shardCount = (opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random()) | 0;
          const angle = Tau / shardCount;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          let sx = 1, sy = 0;

          for (let i = 0; i < shardCount; ++i) {
            const x1 = sx;
            sx = sx * cos - sy * sin;
            sy = sy * cos + x1 * sin;
            this.shards.push(new Shard(this.x, this.y, sx, sy, this.alphaColor));
          }
        }
      }
    } else if (this.phase === "contemplate") {
      ++this.tick;
      if (this.circleCreating) {
        ++this.tick2;
        const prop = this.tick2 / this.circleCompleteTime;
        const armonic = -Math.cos(prop * Math.PI) / 2 + 0.5;
        ctx.fillStyle = this.lightAlphaColor.replace("light", (50 + 50 * prop).toFixed(0)).replace("alp", prop.toFixed(2));
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, armonic * this.circleFinalSize), 0, Tau);
        ctx.fill();

        if (this.tick2 > this.circleCompleteTime) {
          this.tick2 = 0;
          this.circleCreating = false;
          this.circleFading = true;
        }
      } else if (this.circleFading) {
        this.drawGlyph(this.x, this.y);

        ++this.tick2;
        const prop = this.tick2 / this.circleFadeTime;
        const armonic = -Math.cos(prop * Math.PI) / 2 + 0.5;
        ctx.fillStyle = this.lightAlphaColor.replace("light", "100%").replace("alp", Math.max(0, 1 - armonic).toFixed(2));
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.circleFinalSize), 0, Tau);
        ctx.fill();

        if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
      } else {
        this.drawGlyph(this.x, this.y);
      }

      for (let i = 0; i < this.shards.length; ++i) {
        this.shards[i].step();
        if (!this.shards[i].alive) {
          this.shards.splice(i, 1);
          --i;
        }
      }

      if (this.tick > opts.letterContemplatingWaitTime) {
        this.phase = "balloon";
        this.tick = 0;
        this.spawning = true;
        this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0;
        this.inflating = false;
        this.inflateTime = (opts.balloonBaseInflateTime + opts.balloonAddedInflateTime * Math.random()) | 0;
        this.size = (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0;

        const rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random();
        const vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();
        this.vx = Math.cos(rad) * vel;
        this.vy = Math.sin(rad) * vel;
      }
    } else if (this.phase === "balloon") {
      ctx.strokeStyle = this.lightColor.replace("light", "80%");

      if (this.spawning) {
        ++this.tick;
        this.drawGlyph(this.x, this.y);
        if (this.tick >= this.spawnTime) {
          this.tick = 0;
          this.spawning = false;
          this.inflating = true;
        }
      } else if (this.inflating) {
        ++this.tick;
        const prop = this.tick / this.inflateTime;
        const x = (this.cx = this.x);
        const y = (this.cy = this.y - this.size * prop);

        ctx.fillStyle = this.alphaColor.replace("alp", prop.toFixed(2));
        ctx.beginPath();
        generateBalloonPath(x, y, this.size * prop);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, this.y);
        ctx.stroke();

        this.drawGlyph(this.x, this.y);

        if (this.tick >= this.inflateTime) {
          this.tick = 0;
          this.inflating = false;
        }
      } else {
        this.cx += this.vx;
        this.cy += (this.vy += opts.upFlow);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        generateBalloonPath(this.cx, this.cy, this.size);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.cx, this.cy);
        ctx.lineTo(this.cx, this.cy + this.size);
        ctx.stroke();

        this.drawGlyph(this.cx, this.cy + this.size + opts.charSize * 0.42);

        if (this.cy + this.size < -hh || this.cx < -hw || this.cy > hw) {
          this.phase = "done";
        }
      }
    }
  };

  function Shard(x, y, vx, vy, color) {
    const vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();
    this.vx = vx * vel;
    this.vy = vy * vel;
    this.x = x;
    this.y = y;
    this.prevPoints = [[x, y]];
    this.color = color;
    this.alive = true;
    this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
  }

  Shard.prototype.step = function() {
    this.x += this.vx;
    this.y += (this.vy += opts.gravity);

    if (this.prevPoints.length > opts.fireworkShardPrevPoints) this.prevPoints.shift();
    this.prevPoints.push([this.x, this.y]);

    const lwProp = this.size / (this.prevPoints.length || 1);
    for (let k = 0; k < this.prevPoints.length - 1; ++k) {
      const pt = this.prevPoints[k];
      const pt2 = this.prevPoints[k + 1];
      ctx.strokeStyle = this.color.replace("alp", (k / this.prevPoints.length).toFixed(2));
      ctx.lineWidth = k * lwProp;
      ctx.beginPath();
      ctx.moveTo(pt[0], pt[1]);
      ctx.lineTo(pt2[0], pt2[1]);
      ctx.stroke();
    }
    if (this.prevPoints[0][1] > hh) this.alive = false;
  };

  function generateBalloonPath(x, y, size) {
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size / 4, y - size, x, y - size);
    ctx.bezierCurveTo(x + size / 4, y - size, x + size / 2, y - size / 2, x, y);
  }

  function buildLetters() {
    letters = [];
    const totalLines = opts.strings.length;
    const blockHeight = totalLines * opts.lineHeight;
    ctx.font = opts.fontStr;
    const tracking = Math.max(2, Math.round(opts.charSize * 0.05));

    for (let i = 0; i < totalLines; ++i) {
      const str = opts.strings[i];
      const charWidths = [];
      let lineTotalWidth = 0;

      for (let j = 0; j < str.length; ++j) {
        const ch = str[j];
        const chW = ch === " " ? Math.round(opts.charSize * 0.35) : Math.ceil(ctx.measureText(ch).width);
        charWidths.push(chW);
        lineTotalWidth += chW + (j < str.length - 1 ? tracking : 0);
      }

      const startX = -lineTotalWidth / 2;
      let currX = startX;

      for (let j = 0; j < str.length; ++j) {
        const ch = str[j];
        const chW = charWidths[j];
        const posX = currX + chW / 2;
        const posY = i * opts.lineHeight + opts.lineHeight / 2 - blockHeight / 2;

        currX += chW + tracking;

        if (ch === " ") continue; // Don't create rocket or balloon for space!

        letters.push(new Letter(ch, posX, posY, i));
      }
    }
  }

  let frameCount = 0;
  let isFireworksVisible = true;

  if (window.IntersectionObserver) {
    const fwObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        isFireworksVisible = e.isIntersecting;
        if (isFireworksVisible && !fireworksAnimId) {
          anim();
        }
      });
    }, { threshold: 0.05 });
    fwObserver.observe(c);
  }

  function anim() {
    if (!isFireworksVisible) {
      fireworksAnimId = null;
      return;
    }
    fireworksAnimId = requestAnimationFrame(anim);
    frameCount++;

    // Soft clearing via destination-out so the pinkish background gradient shines through
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";

    // Launch celebratory ambient fireworks periodically (more fireworks!)
    if (frameCount % 30 === 0 || (frameCount < 120 && frameCount % 20 === 0)) {
      launchAmbientFirework();
    }

    // Update & draw ambient rocket trails
    for (let i = ambientFireworks.length - 1; i >= 0; i--) {
      const fw = ambientFireworks[i];
      fw.x += fw.vx;
      fw.y += fw.vy;
      fw.vy += 0.16; // gravity
      fw.trail.push({ x: fw.x, y: fw.y });
      if (fw.trail.length > 8) fw.trail.shift();

      ctx.beginPath();
      for (let t = 0; t < fw.trail.length; t++) {
        const pt = fw.trail[t];
        const a = (t + 1) / fw.trail.length;
        ctx.strokeStyle = `rgba(255, 215, 0, ${a * 0.8})`;
        ctx.lineWidth = 2.2 * a;
        if (t === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      if (fw.vy >= -0.5 || fw.y <= fw.targetY) {
        explodeAmbientFirework(fw);
        ambientFireworks.splice(i, 1);
      }
    }

    // Update & draw ambient burst particles
    for (let i = ambientParticles.length - 1; i >= 0; i--) {
      const p = ambientParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        ambientParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.twinkle ? (p.alpha * (0.6 + 0.4 * Math.random())) : p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw letter fireworks
    ctx.translate(hw, hh);

    let done = true;
    for (let l = 0; l < letters.length; ++l) {
      letters[l].step();
      if (letters[l].phase !== "done") done = false;
    }

    ctx.translate(-hw, -hh);

    if (done) {
      donePauseTick++;
      if (donePauseTick >= 35) {
        donePauseTick = 0;
        sequenceIdx = (sequenceIdx + 1) % 2;
        setupSequence(sequenceIdx);
      }
    } else {
      donePauseTick = 0;
    }
  }

  c.addEventListener("pointerdown", e => {
    const rect = c.getBoundingClientRect();
    explodeAmbientFirework({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      palette: celebratoryPalettes[(Math.random() * celebratoryPalettes.length) | 0]
    });
  });

  updateDimensions();
  anim();

  window.addEventListener("resize", () => {
    updateDimensions();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      updateDimensions();
    }).catch(() => {});
  }
}

// ============================================================
// 5. LIVE SUNSHINE MILESTONE COUNTER
// ============================================================
function updateMilestoneCounter() {
  const birth = new Date(userConfig.birthdayDate + "T00:00:00");
  const now = new Date();
  const diff = Math.max(0, now - birth);
  const totalSec = Math.floor(diff / 1000);
  const totalMin = Math.floor(totalSec / 60);
  const totalHr = Math.floor(totalMin / 60);
  const totalDays = Math.floor(totalHr / 24);
  const years = Math.floor(totalDays / 365.25);
  const remDays = Math.floor(totalDays % 365.25);

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setVal("countYears", years);
  setVal("countDays", remDays);
  setVal("countHours", String(totalHr % 24).padStart(2, "0"));
  setVal("countMinutes", String(totalMin % 60).padStart(2, "0"));
  setVal("countSeconds", String(totalSec % 60).padStart(2, "0"));
}
setInterval(updateMilestoneCounter, 1000);

// ============================================================
// 6. SCROLL REVEAL ANIMATIONS
// ============================================================
function initScrollReveal() {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal-section, .reveal-tl").forEach(el => io.observe(el));
}

// ============================================================
// 7. THREE.JS 3D HEARTS BACKGROUND
// ============================================================
let scene, camera, renderer, heartsMeshGroup, starParticles;
let mouseX = 0, mouseY = 0;

function initThreeBackground() {
  const canvas = document.getElementById("webgl-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffe6eb, 0.9));
  const pl = new THREE.PointLight(0xff6b8b, 1.6, 100);
  pl.position.set(10, 10, 20);
  scene.add(pl);

  heartsMeshGroup = new THREE.Group();
  scene.add(heartsMeshGroup);

  const hs = new THREE.Shape();
  hs.moveTo(0.25, 0.25);
  hs.bezierCurveTo(0.25, 0.25, 0.2, 0, 0, 0);
  hs.bezierCurveTo(-0.3, 0, -0.3, 0.35, -0.3, 0.35);
  hs.bezierCurveTo(-0.3, 0.55, -0.1, 0.77, 0.25, 0.95);
  hs.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35);
  hs.bezierCurveTo(0.8, 0.35, 0.8, 0, 0.5, 0);
  hs.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25);

  const hg = new THREE.ExtrudeGeometry(hs, {
    depth: 0.15,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05
  });
  hg.center();

  const cols = [0xff6b8b, 0xff9eaa, 0xffb3c6, 0xffc2d1, 0xd8b4fe];
  const cnt = innerWidth < 768 ? 20 : 40;
  for (let i = 0; i < cnt; i++) {
    const m = new THREE.MeshPhongMaterial({
      color: cols[i % cols.length],
      shininess: 90,
      specular: 0xffffff,
      transparent: true,
      opacity: 0.65 + Math.random() * 0.3
    });
    const mesh = new THREE.Mesh(hg, m);
    const sc = 0.5 + Math.random() * 1.1;
    mesh.scale.set(sc, sc, sc);
    mesh.position.set(
      (Math.random() - 0.5) * 55,
      (Math.random() - 0.5) * 42,
      (Math.random() - 0.5) * 28
    );
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.userData = {
      speedY: 0.012 + Math.random() * 0.025,
      speedRotY: (Math.random() - 0.5) * 0.018,
      wobble: 0.018 + Math.random() * 0.018,
      ix: mesh.position.x
    };
    heartsMeshGroup.add(mesh);
  }

  // Star particles
  const pg = new THREE.BufferGeometry();
  const pc = 180, pa = new Float32Array(pc * 3);
  for (let i = 0; i < pc * 3; i += 3) {
    pa[i] = (Math.random() - 0.5) * 65;
    pa[i + 1] = (Math.random() - 0.5) * 55;
    pa[i + 2] = (Math.random() - 0.5) * 32;
  }
  pg.setAttribute("position", new THREE.BufferAttribute(pa, 3));
  const pm = new THREE.PointsMaterial({
    size: 0.28,
    color: 0xf6d365,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending
  });
  starParticles = new THREE.Points(pg, pm);
  scene.add(starParticles);

  window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
  document.addEventListener("mousemove", e => {
    mouseX = (e.clientX / innerWidth - 0.5) * 2;
    mouseY = (e.clientY / innerHeight - 0.5) * 2;
  });

  let clock = 0;
  function animateThree() {
    requestAnimationFrame(animateThree);
    clock += 0.012;
    if (heartsMeshGroup) {
      heartsMeshGroup.children.forEach(m => {
        m.position.y += m.userData.speedY;
        m.position.x = m.userData.ix + Math.sin(clock * m.userData.wobble * 60) * 1.4;
        m.rotation.y += m.userData.speedRotY;
        if (m.position.y > 26) {
          m.position.y = -26;
          m.position.x = (Math.random() - 0.5) * 55;
          m.userData.ix = m.position.x;
        }
      });
    }
    if (starParticles) {
      starParticles.rotation.y += 0.0007;
      starParticles.rotation.x += 0.0003;
    }
    camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 2.5 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animateThree();
}

// ============================================================
// 8. ROSE PETAL CANVAS PHYSICS
// ============================================================
function initPetalCanvas() {
  const canvas = document.getElementById("petal-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let petals = [];
  const PETAL_COLORS = ["#FF85A1", "#FFB3C6", "#FFC2D1", "#FFD6E0", "#ff9eaa"];

  class Petal {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = Math.random() * innerWidth;
      this.y = init ? Math.random() * -200 : -20;
      this.size = 9 + Math.random() * 16;
      this.speedY = 0.6 + Math.random() * 1.1;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      this.opacity = 0.4 + Math.random() * 0.5;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.015 + Math.random() * 0.015;
      this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    }
    update() {
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.8;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;
      if (this.y > innerHeight + 30 || this.x < -30 || this.x > innerWidth + 30) this.reset();
    }
    draw(c) {
      c.save();
      c.globalAlpha = this.opacity;
      c.translate(this.x, this.y);
      c.rotate(this.rotation);
      c.fillStyle = this.color;
      c.beginPath();
      c.ellipse(0, 0, this.size * 0.4, this.size, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  }

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const count = innerWidth < 768 ? 20 : 35;
  for (let i = 0; i < count; i++) petals.push(new Petal());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.update();
      p.draw(ctx);
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ============================================================
// 9. SPARKLE CURSOR / TOUCH TRAIL
// ============================================================
function initSparkleTrail() {
  const canvas = document.getElementById("sparkle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let sparkles = [];

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Sparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 2;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2 - 0.4;
      this.color = ["#FF9EAA", "#FFD700", "#FFFFFF", "#c084fc"][Math.floor(Math.random() * 4)];
      this.alpha = 1;
      this.decay = Math.random() * 0.035 + 0.02;
      this.rot = Math.random() * Math.PI;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.rot += 0.08;
    }
    draw(c) {
      c.save();
      c.globalAlpha = Math.max(this.alpha, 0);
      c.translate(this.x, this.y);
      c.rotate(this.rot);
      c.fillStyle = this.color;
      c.beginPath();
      c.moveTo(0, -this.size);
      c.quadraticCurveTo(0, 0, this.size, 0);
      c.quadraticCurveTo(0, 0, 0, this.size);
      c.quadraticCurveTo(0, 0, -this.size, 0);
      c.quadraticCurveTo(0, 0, 0, -this.size);
      c.fill();
      c.restore();
    }
  }

  function add(x, y, n = 2) {
    for (let i = 0; i < n; i++) sparkles.push(new Sparkle(x, y));
  }
  window.addEventListener("mousemove", e => add(e.clientX, e.clientY, 2));
  window.addEventListener("touchmove", e => {
    if (e.touches[0]) add(e.touches[0].clientX, e.touches[0].clientY, 2);
  }, { passive: true });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = sparkles.length - 1; i >= 0; i--) {
      sparkles[i].update();
      sparkles[i].draw(ctx);
      if (sparkles[i].alpha <= 0) sparkles.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// ============================================================
// 10. SCENE 2: BALLOONS POP CEREMONY
// ============================================================
function initFourBalloons() {
  const cards = document.querySelectorAll(".balloon-pop-card");
  const banner = document.getElementById("balloonPoppedBanner");
  let poppedCount = 0;

  cards.forEach(card => {
    const visual = card.querySelector(".balloon-pop-visual");
    const word = card.querySelector(".balloon-revealed-word");

    card.addEventListener("click", () => {
      if (card.classList.contains("popped")) return;
      card.classList.add("popped");
      poppedCount++;

      audio.playPop();

      if (visual) visual.style.display = "none";
      if (word) {
        word.classList.remove("hidden");
        word.style.animation = "fadeInUp 0.5s ease-out forwards";
      }

      const rect = card.getBoundingClientRect();
      if (window.confetti) {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: {
            x: (rect.left + rect.width / 2) / innerWidth,
            y: (rect.top + rect.height / 2) / innerHeight
          },
          colors: ["#FF6B8B", "#FFD700", "#FFB6C1", "#60a5fa"]
        });
      }

      if (poppedCount === cards.length && banner) {
        setTimeout(() => {
          banner.classList.remove("hidden");
          banner.style.animation = "fadeInUp 0.8s ease-out forwards";
          audio.playCelebration();
          if (window.confetti) {
            confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
          }
        }, 400);
      }
    });
  });
}

// ============================================================
// 11. SCENE 3: PHOTO MEMORIES SLIDESHOW
// ============================================================
function initPhotoSlideshow() {
  const slides = document.querySelectorAll(".photo-slide");
  const dots = document.querySelectorAll(".slide-dot");
  const prevBtn = document.getElementById("slidePrevBtn");
  const nextBtn = document.getElementById("slideNextBtn");
  const track = document.getElementById("slideTrack");
  if (!slides.length) return;

  let current = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function goTo(idx) {
    slides[current].classList.remove("active");
    if (dots[current]) dots[current].classList.remove("active");
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => goTo(i)));

  if (track) {
    track.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
      }
    });
  }

  // Auto-advance
  setInterval(() => {
    if (currentPage === 6) goTo(current + 1);
  }, 6000);
}

// ============================================================
// 12. SCENE 4: GALAXY CONSTELLATION (Reasons I Love You)
// ============================================================
function initGalaxy() {
  const canvas = document.getElementById("galaxyCanvas");
  const starsLayer = document.getElementById("galaxyStarsLayer");
  const display = document.getElementById("galaxyReasonDisplay");
  const reasonText = document.getElementById("galaxyReasonText");
  const reasonIcon = document.getElementById("galaxyReasonIcon");
  const compModal = document.getElementById("constellationComplete");
  if (!starsLayer) return;

  const REASONS = [
    { icon: "✨", text: "Your smile — it genuinely makes my whole day brighter." },
    { icon: "💖", text: "The sweetest heart. You're truly my favorite person in the world." },
    { icon: "🌸", text: "The way you laugh without even trying. Honestly my favorite sound." },
    { icon: "🌟", text: "Effortlessly stunning, always. You don't even have to try." },
    { icon: "👑", text: "How you make even the quietest moments feel so special." },
    { icon: "💫", text: "Just you being you. I wouldn't trade you for the world." }
  ];

  // Draw background star points
  if (canvas) {
    const ctx = canvas.getContext("2d");
    function drawField() {
      canvas.width = canvas.parentElement.clientWidth || 360;
      canvas.height = canvas.parentElement.clientHeight || 280;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 1.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    drawField();
    window.addEventListener("resize", drawField);
  }

  let foundCount = 0;
  starsLayer.innerHTML = "";

  const starPositions = [
    { top: "18%", left: "18%" },
    { top: "16%", left: "78%" },
    { top: "35%", left: "48%" },
    { top: "52%", left: "20%" },
    { top: "50%", left: "76%" },
    { top: "32%", left: "85%" }
  ];

  REASONS.forEach((reason, i) => {
    const starBtn = document.createElement("button");
    starBtn.className = "galaxy-star-node";
    starBtn.style.top = starPositions[i].top;
    starBtn.style.left = starPositions[i].left;
    starBtn.setAttribute("aria-label", `Star ${i + 1}`);
    starBtn.innerHTML = `<span>★</span>`;

    starBtn.addEventListener("click", () => {
      audio.playStarReveal();
      if (!starBtn.classList.contains("found")) {
        starBtn.classList.add("found");
        foundCount++;
      }

      if (reasonIcon) reasonIcon.textContent = reason.icon;
      if (reasonText) reasonText.textContent = reason.text;
      if (display) {
        display.classList.add("active");
        display.style.animation = "captionRise 0.5s ease-out forwards";
      }

      if (window.confetti) {
        confetti({
          particleCount: 15,
          spread: 40,
          origin: { y: 0.65 },
          colors: ["#F6D365", "#FFD700", "#FFF"]
        });
      }

      if (foundCount === REASONS.length && compModal) {
        setTimeout(() => {
          compModal.classList.remove("hidden");
          audio.playCelebration();
        }, 600);
      }
    });

    starsLayer.appendChild(starBtn);
  });
}

// ============================================================
// 13. SCENE 5: 3D WAX SEAL LOVE LETTER
// ============================================================
function initLoveLetter() {
  const waxSeal = document.getElementById("waxSeal");
  const flap = document.getElementById("envelopeFlap");
  const paper = document.getElementById("letterPaper");
  const promptText = document.getElementById("letterPromptText");
  const modal = document.getElementById("fullscreenLetterModal");
  const openBigBtn = document.getElementById("openBigLetterBtn");
  const closeBtn = document.getElementById("closeLetterModalBtn");
  const doneBtn = document.getElementById("doneLetterBtn");
  const backdrop = document.getElementById("letterModalBackdrop");

  let isOpened = false;

  function openEnvelope() {
    if (isOpened) return;
    isOpened = true;

    audio.playWaxCrack();

    if (waxSeal) waxSeal.classList.add("cracked");
    if (flap) flap.classList.add("open");
    if (paper) paper.classList.add("pulled");
    if (promptText) promptText.textContent = "💖 Sealed with love 💖";

    if (window.confetti) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FF4D6D", "#FFD700", "#FFF"]
      });
    }

    // Auto open modal after smooth unfold
    setTimeout(() => {
      if (modal) modal.classList.remove("hidden");
    }, 1200);
  }

  if (waxSeal) waxSeal.addEventListener("click", openEnvelope);
  if (paper) paper.addEventListener("click", () => {
    if (modal) modal.classList.remove("hidden");
  });
  if (openBigBtn) openBigBtn.addEventListener("click", () => {
    openEnvelope();
    if (modal) modal.classList.remove("hidden");
  });

  const closeModal = () => {
    if (modal) modal.classList.add("hidden");
  };
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (doneBtn) doneBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
}

// ============================================================
// 14. SCENE 6: GRAND FINALE FIREWORKS
// ============================================================
function initGrandFinale() {
  const btn = document.getElementById("finaleFireworksBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    audio.playGrandCelebration();

    if (!window.confetti) return;

    const duration = 6000;
    const end = Date.now() + duration;
    const ri = (a, b) => Math.random() * (b - a) + a;

    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({
        particleCount: 70,
        angle: ri(55, 125),
        spread: ri(50, 70),
        origin: { x: ri(0.15, 0.85), y: ri(0.1, 0.4) },
        colors: ["#FF6B8B", "#FFD700", "#c084fc", "#60a5fa", "#fff", "#FF4D6D"],
        startVelocity: 45,
        ticks: 80,
        zIndex: 9999
      });
    }, 180);

    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 120,
            spread: 360,
            origin: { x: ri(0.2, 0.8), y: ri(0.2, 0.6) },
            startVelocity: 50,
            ticks: 90,
            zIndex: 9999,
            colors: ["#FFD700", "#FF6B8B", "#c084fc", "#fff"]
          });
        }, i * 220);
      }
    }, 2500);
  });
}

// ============================================================
// 15. CUTE CHIBI MASCOT
// ============================================================
function initMascot() {
  const mascot = document.getElementById("mascot");
  const speech = document.getElementById("mascotSpeech");
  if (!mascot || !speech) return;

  const QUOTES = [
    "A most radiant birthday to thee, my fairest lady! Tap upon me! 💖",
    "Thou dost eclipse the morning sun in sheer, effortless splendour! ✨",
    "May gentle Providence bestow upon thee every quiet desire of thy soul! 🌸",
    "Never has a mortal soul been more profoundly, wholly cherished! 💕",
    "Partake freely in sweet confections; today, the world bows to thee! 🎂",
    "Thy humble admirer, thy devoted captive, now and forevermore! 👑"
  ];
  let quoteIdx = 0;

  mascot.addEventListener("click", () => {
    audio.playMascotChirp();
    quoteIdx = (quoteIdx + 1) % QUOTES.length;
    speech.textContent = QUOTES[quoteIdx];

    if (window.confetti) {
      confetti({
        particleCount: 16,
        spread: 45,
        origin: { x: 0.1, y: 0.9 },
        colors: ["#FF6B8B", "#FFD700", "#FFF"]
      });
    }
  });
}

// ============================================================
// 16. PERSONALIZATION MODAL
// ============================================================
function initSettingsModal() {
  const openBtn = document.getElementById("openSettingsBtn");
  const closeBtn = document.getElementById("closeSettingsBtn");
  const saveBtn = document.getElementById("saveSettingsBtn");
  const resetBtn = document.getElementById("resetDefaultsBtn");
  const modal = document.getElementById("settingsModal");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      applyConfig();
      if (modal) modal.classList.remove("hidden");
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }
  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const n = document.getElementById("inputHerName").value.trim();
      const d = document.getElementById("inputBirthdayDate").value;
      const l = document.getElementById("inputLetterText").value.trim();
      const s = document.getElementById("inputSignature").value.trim();

      if (n) userConfig.herName = n;
      if (d) userConfig.birthdayDate = d;
      if (l) userConfig.letterText = l;
      if (s) userConfig.signature = s;

      saveConfig();
      updateMilestoneCounter();

      if (modal) modal.classList.add("hidden");
      audio.playCelebration();
      if (window.confetti) {
        confetti({
          particleCount: 60,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#FF6B8B", "#FFD700", "#c084fc"]
        });
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all settings to defaults?")) {
        localStorage.removeItem("birthday_v2_config");
        userConfig = { ...DEFAULT_CONFIG };
        applyConfig();
        updateMilestoneCounter();
        if (modal) modal.classList.add("hidden");
        location.reload();
      }
    });
  }
}

// ============================================================
// 17. STORY NEXT NAVIGATION HELPER
// ============================================================
window.storyNext = function() {
  const scenes = document.querySelectorAll(".story-scene");
  for (let scene of scenes) {
    const rect = scene.getBoundingClientRect();
    if (rect.top > 60) {
      scene.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }
};

function initStoryProgress() {
  const segments = document.querySelectorAll(".story-bar-segment");
  const scenes = document.querySelectorAll(".story-scene");
  if (!segments.length || !scenes.length) return;

  function onScroll() {
    const scrollMid = window.scrollY + window.innerHeight * 0.45;
    let activeIdx = 0;
    scenes.forEach((scene, idx) => {
      const top = scene.offsetTop;
      if (scrollMid >= top) {
        activeIdx = idx;
      }
    });

    segments.forEach((seg, idx) => {
      if (idx < activeIdx) {
        seg.className = "story-bar-segment passed";
      } else if (idx === activeIdx) {
        seg.className = "story-bar-segment active";
      } else {
        seg.className = "story-bar-segment";
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  segments.forEach((seg, idx) => {
    seg.addEventListener("click", () => {
      if (scenes[idx]) {
        scenes[idx].scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ============================================================
// 18. INITIALIZE EVERYTHING ON DOM READY
// ============================================================
window.addEventListener("DOMContentLoaded", () => {
  loadConfig();
  initIntroTiming();
  initFireworksIntro();
  initScrollReveal();
  initPetalCanvas();
  initSparkleTrail();
  initThreeBackground();
  initFourBalloons();
  initPhotoSlideshow();
  initGalaxy();
  initLoveLetter();
  initGrandFinale();
  initMascot();
  initSettingsModal();

  // Floating music button toggle
  const musicBtn = document.getElementById("toggleMusicBtn");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => audio.toggleMusic());
  }

  // Ensure natural window scrolling
  document.body.style.overflow = "auto";
});
