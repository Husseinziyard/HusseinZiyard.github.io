// Mobile menu
const burger = document.querySelector(".hamburger");
const mobile = document.querySelector(".mobile-menu");

function closeMobile() {
  burger.setAttribute("aria-expanded", "false");
  mobile.style.display = "none";
  mobile.setAttribute("aria-hidden", "true");
}

burger?.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!open));
  mobile.style.display = open ? "none" : "flex";
  mobile.setAttribute("aria-hidden", String(open));
});

mobile?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobile));
window.addEventListener("resize", () => { if (window.innerWidth > 940) closeMobile(); });

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// Count-up metrics
function animateCount(el) {
  const target = Number(el.dataset.count || "0");
  const start = 0;
  const duration = 900;
  const t0 = performance.now();

  function tick(now) {
    const p = Math.min(1, (now - t0) / duration);
    const val = Math.floor(start + (target - start) * (p * (2 - p))); // easeOutQuad
    el.textContent = String(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const metricEls = document.querySelectorAll(".metric-num");
let metricsDone = false;
const metricsObserver = new IntersectionObserver((entries) => {
  if (!metricsDone && entries.some(e => e.isIntersecting)) {
    metricsDone = true;
    metricEls.forEach(animateCount);
  }
}, { threshold: 0.4 });

metricEls.forEach(el => metricsObserver.observe(el));

// Tilt effect (simple)
const tilt = document.querySelector("[data-tilt]");
tilt?.addEventListener("mousemove", (e) => {
  const r = tilt.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  tilt.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
});
tilt?.addEventListener("mouseleave", () => {
  tilt.style.transform = "rotateX(0deg) rotateY(0deg)";
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Copy CV line
const copyBtn = document.getElementById("copyLine");
const copyStatus = document.getElementById("copyStatus");
copyBtn?.addEventListener("click", async () => {
  const text = "BSc Applied Data Science & Communication (Reading) • KDU • Python, SQL, Power BI • Machine Learning & Analytics";
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Copied!";
    setTimeout(() => copyStatus.textContent = "", 1200);
  } catch {
    copyStatus.textContent = "Copy failed (browser permission).";
  }
});

// Project modals
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

const modalData = {
  m1: {
    title: "Road Accident Risk Analytics",
    body: "Goal: identify patterns linked to road-rule adherence and predict severity. Outputs: ML pipeline + insights for stakeholders (risk factors, charts, recommendations). Replace with your dataset + results later."
  },
  m2: {
    title: "Online Retail Market Basket Mining",
    body: "Goal: association rule mining on transaction baskets. Outputs: rules ranked by lift, bundle recommendations, and report-style insights for cross-sell."
  },
  m3: {
    title: "Restaurant Review Sentiment Model",
    body: "Goal: sentiment prediction from text reviews. Outputs: preprocessing, NN model, evaluation metrics, and improvement plan (better embeddings / tuning)."
  },
  m4: {
    title: "Sales Dashboard + KPI Story",
    body: "Goal: executive dashboard with KPIs and trend diagnostics. Outputs: visuals, drilldowns, and an insight narrative for decision-makers."
  }
};

document.querySelectorAll(".open-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.modal;
    const data = modalData[key];
    modalContent.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.body}</p>
      <p class="muted"><strong>Next:</strong> we’ll replace placeholders with your real project description, tech stack, screenshots, and GitHub links.</p>
    `;
    modalBackdrop.style.display = "grid";
    modalBackdrop.setAttribute("aria-hidden", "false");
  });
});

function closeModal(){
  modalBackdrop.style.display = "none";
  modalBackdrop.setAttribute("aria-hidden", "true");
}
modalClose?.addEventListener("click", closeModal);
modalBackdrop?.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
