const progress = document.querySelector(".scroll-progress");
const navLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];

function updateProgress() {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${amount}%`;
}

function updateActiveLink() {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", () => {
  updateProgress();
  updateActiveLink();
}, { passive: true });

updateProgress();
updateActiveLink();

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  revealObserver.observe(item);
});

const heroVisual = document.querySelector("[data-parallax]");
if (heroVisual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const floaters = [...heroVisual.querySelectorAll("[data-float]")];
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  heroVisual.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function animateFloaters() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    floaters.forEach((item, index) => {
      const depth = Number(item.dataset.float || 1);
      const rotate = index % 2 === 0 ? -1 : 1;
      item.style.translate = `${currentX * depth * 9}px ${currentY * depth * 8}px`;
      item.style.rotate = `${rotate * currentX * 0.6}deg`;
    });

    requestAnimationFrame(animateFloaters);
  }

  animateFloaters();
}
