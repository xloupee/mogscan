const profiles = [
  {
    name: "clavicular",
    handle: "hunter-eye adjacent",
    score: 96.2,
    elite: 20,
    total: 23,
    traits: [
      "Canthal tilt: +4° positive",
      "Scleral show: minimal",
      "Iris rarity: green/hazel hybrid",
      "Eye spacing: ~1 eye-width",
      "Upper eyelid exposure: low-medium",
      "Gonial angle: ~120-123°",
      "Mandible sharpness: high",
      "Chin projection: balanced",
      "Neck-jaw contrast: clean",
      "Facial thirds: near 1:1:1",
      "Midface length: optimal",
      "Bridge: straight",
      "Tip projection: controlled",
      "Nose-mouth distance: ideal",
      "Lip fullness: natural medium",
      "Cupid's bow: present",
      "Philtrum length: short-medium",
      "Skin clarity: clear",
      "Skin reflectivity: healthy matte glow",
      "Facial fat distribution: even",
      "Hair density: high",
      "Curl pattern: loose curls",
      "Hairline: strong",
    ],
  },
  {
    name: "ASU Frat Leader",
    handle: "charisma multiplier active",
    score: 92.8,
    elite: 18,
    total: 22,
    traits: [
      "Canthal tilt: +3° positive",
      "Scleral show: low",
      "Eye expression stat: high warmth",
      "Eye spacing: balanced",
      "Gonial angle: ~122-125°",
      "Mandible visibility: medium-high",
      "Chin projection: solid",
      "Neck-jaw contrast: high",
      "Facial thirds: slight lower-third dominance",
      "Midface ratio: balanced",
      "Bridge: straight-athletic",
      "Tip: compact",
      "Nose harmony stat: high",
      "Lip fullness: natural medium",
      "Smile width: high",
      "Philtrum length: balanced",
      "Skin clarity: clear",
      "Facial leanness: athletic",
      "Color tone: even",
      "Hair density: high",
      "Volume: controlled chaos",
      "Hairline stability: strong",
    ],
  },
  {
    name: "Androgen",
    handle: "hunter-eye buff",
    score: 98.4,
    elite: 21,
    total: 24,
    traits: [
      "Canthal tilt: +5° positive",
      "Scleral show: minimal",
      "Eye depth: deep-set",
      "Eye symmetry: high",
      "Gonial angle: ~120°",
      "Jawline sharpness: high",
      "Chin projection: strong",
      "Cheekbone prominence: high",
      "Facial thirds: very balanced",
      "Midface length: compact",
      "Bridge: straight",
      "Tip definition: refined",
      "Nose harmony: high",
      "Lip fullness: medium-full",
      "Cupid's bow: defined",
      "Philtrum: balanced",
      "Skin clarity: clear",
      "Facial leanness: high",
      "Tone uniformity: even",
      "Hair density: high",
      "Texture: thick + wavy",
      "Hairline: strong",
    ],
  },
  {
    name: "marlon",
    handle: "hunter-eye hybrid",
    score: 89.7,
    elite: 16,
    total: 20,
    traits: [
      "Canthal tilt: +3-4° positive",
      "Scleral show: low",
      "Eye contact aura: strong",
      "Gonial angle: ~123°",
      "Jawline visibility: high",
      "Chin projection: balanced",
      "Cheekbone structure: subtle but defined",
      "Facial thirds: slight lower-third dominance",
      "Midface ratio: balanced",
      "Bridge: straight",
      "Tip: compact",
      "Nose harmony: high",
      "Lip fullness: medium",
      "Smile readiness stat: high",
      "Philtrum length: balanced",
      "Skin clarity: clear",
      "Tone uniformity: even",
      "Facial fat distribution: lean",
      "Hair density: high",
      "Hairline stability: strong",
    ],
  },
  {
    name: "Orangie",
    handle: "angles help",
    score: 75.5,
    elite: 10,
    total: 16,
    traits: [
      "Canthal tilt: positive, not extreme",
      "Under-eye area: slightly tired",
      "Jawline: defined but not razor sharp",
      "Cheekbones: present, not model-tier projection",
      "Overall proportions: balanced",
      "No highly rare standout trait",
      "Hair is carrying major visual weight",
      "Without volume, score drops a tier",
    ],
  },
  {
    name: "Ethanprosper",
    handle: "semi masculine",
    score: 70.1,
    elite: 9,
    total: 15,
    traits: [
      "Eyes: good shape with neutral tilt",
      "Jaw: strong",
      "Chin projection: solid",
      "Not hyper-angular, but semi masculine",
      "Proportions: slightly below-average harmony",
      "Not perfect-ratio, mid genetics",
      "Longer textured cut would boost",
    ],
  },
  {
    name: "Neutral Baseline",
    handle: "generic harmony",
    score: 63.9,
    elite: 7,
    total: 14,
    traits: [
      "Canthal tilt: neutral",
      "Eye area: slightly softer",
      "Jawline: moderate",
      "Cheekbones: average",
      "Facial harmony: balanced but generic",
      "Nothing highly distinctive",
      "Hair density: good",
      "Current style: safe, not enhancing much",
    ],
  },
];

const multipliers = {
  daily: 1,
  weekly: 0.97,
  monthly: 1.03,
};

const leaderboard = document.getElementById("leaderboard");
const template = document.getElementById("row-template");
const tabButtons = [...document.querySelectorAll(".tabs button")];

function initials(name) {
  const words = name.split(/\s+/).filter(Boolean);
  return words.length === 1
    ? words[0].slice(0, 2).toUpperCase()
    : (words[0][0] + words[1][0]).toUpperCase();
}

function tier(score) {
  if (score >= 95) return "S+";
  if (score >= 88) return "S";
  if (score >= 78) return "A";
  if (score >= 68) return "B";
  return "C";
}

function formatScore(value) {
  return `+${value.toFixed(2)} MOG (${tier(value)}-tier)`;
}

function closeExpandedRows() {
  leaderboard.querySelectorAll(".entry.open").forEach((entry) => {
    entry.classList.remove("open");
    const row = entry.querySelector(".row");
    if (row) row.setAttribute("aria-expanded", "false");
  });
}

function buildEntry(profile, index) {
  const row = template.content.firstElementChild.cloneNode(true);
  const entry = document.createElement("div");
  const rank = index + 1;
  const losses = Math.max(profile.total - profile.elite, 0);

  row.setAttribute("role", "button");
  row.setAttribute("tabindex", "0");
  row.setAttribute("aria-expanded", "false");

  row.querySelector(".rank").textContent = rank === 1 ? "🏆" : String(rank);
  row.querySelector(".avatar").textContent = initials(profile.name);
  row.querySelector(".name").textContent = profile.name;
  row.querySelector(".handle").textContent = profile.handle;
  row.querySelector(".pos").textContent = String(profile.elite);
  row.querySelector(".neg").textContent = String(losses);
  row.querySelector(".score").textContent = formatScore(profile.adjusted);

  const detailPanel = document.createElement("section");
  detailPanel.className = "detail-panel";
  profile.traits.forEach((trait) => {
    const chip = document.createElement("div");
    chip.className = "detail-chip";
    chip.textContent = trait;
    detailPanel.appendChild(chip);
  });

  const toggle = () => {
    const willOpen = !entry.classList.contains("open");
    closeExpandedRows();
    if (willOpen) {
      entry.classList.add("open");
      row.setAttribute("aria-expanded", "true");
    }
  };

  row.addEventListener("click", toggle);
  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  });

  row.style.animationDelay = `${index * 45}ms`;

  entry.className = "entry";
  entry.append(row, detailPanel);
  return entry;
}

function render(period) {
  const factor = multipliers[period] || 1;

  const ranked = profiles
    .map((profile) => ({
      ...profile,
      adjusted: profile.score * factor,
    }))
    .sort((a, b) => b.adjusted - a.adjusted);

  leaderboard.innerHTML = "";
  ranked.forEach((profile, index) => {
    leaderboard.appendChild(buildEntry(profile, index));
  });
}

function selectTab(period) {
  tabButtons.forEach((btn) => {
    const active = btn.dataset.period === period;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
  });

  render(period);
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => selectTab(btn.dataset.period));
});

selectTab("daily");
