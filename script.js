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

const projectTabs = [...document.querySelectorAll("[data-project-tab]")];
const projectCards = [...document.querySelectorAll("[data-project-group]")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setProjectTab(group) {
  projectTabs.forEach((tab) => {
    const isActive = tab.dataset.projectTab === group;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  let visibleIndex = 0;
  projectCards.forEach((card) => {
    const shouldShow = card.dataset.projectGroup === group;
    card.hidden = !shouldShow;
    card.classList.remove("tab-enter");

    if (!shouldShow) return;

    card.classList.add("visible");
    card.style.animationDelay = `${Math.min(visibleIndex * 75, 180)}ms`;
    visibleIndex += 1;

    if (!reduceMotion) {
      void card.offsetWidth;
      card.classList.add("tab-enter");
    }
  });
}

projectTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    setProjectTab(tab.dataset.projectTab);
  });

  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + projectTabs.length) % projectTabs.length;
    projectTabs[nextIndex].focus();
    setProjectTab(projectTabs[nextIndex].dataset.projectTab);
  });
});

const heroVisual = document.querySelector("[data-parallax]");
if (heroVisual && !reduceMotion) {
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
