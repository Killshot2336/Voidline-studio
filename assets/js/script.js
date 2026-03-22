const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

const headerLinks = document.querySelectorAll(".nav-links a");

headerLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (cursorGlow) {
      cursorGlow.style.width = "380px";
      cursorGlow.style.height = "380px";
    }
  });

  link.addEventListener("mouseleave", () => {
    if (cursorGlow) {
      cursorGlow.style.width = "320px";
      cursorGlow.style.height = "320px";
    }
  });
});
