// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Count-up animation for metrics
const counters = document.querySelectorAll(".metric-num");

function animateCounter(el) {
  const target = Number(el.getAttribute("data-count")) || 0;
  const duration = 900; // ms
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toString();
  }

  requestAnimationFrame(tick);
}

// Start animation when visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((c) => observer.observe(c));
